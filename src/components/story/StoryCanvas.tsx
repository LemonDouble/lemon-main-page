"use client";

import { useEffect, useRef } from "react";
import { STORY_SCENES, type Scene } from "@/components/story/scenes";
import { getFramePosition, getTimeline } from "@/components/story/timeline";

const CELL_SIZE = 14;
const DISSOLVE_BAND = 0.2;
const GLYPHS = " .:-=+*#%@";
const BACKGROUND_COLOR = "#12100E";
const BURNING_CELL_COLOR = "rgba(18, 16, 14, 0.7)";
const GLYPH_COLOR = "240, 185, 11";
// 프레임이 그림보다 가로로 길면 위아래를 잘라야 한다. 얼굴과 모자를 지키려고 아래를 더 많이 자른다.
const CROP_ANCHOR_Y = 0.2;
const SPARKLE_COUNT = 36;
const SPARKLE_LIFETIME_MS = 1600;
const SPARKLE_MIN_LUMINANCE = 0.55;
// 색을 유지하는 원의 반지름(그림 너비 기준)이다.
const ACCENT_RADIUS = 0.06;
const POSITION_EASING_MS = 90;

interface Grid {
    columns: number;
    rows: number;
    // 칸마다 다음 장면으로 바뀌는 시점(0~1). 왼쪽 칸일수록 먼저 바뀐다.
    switchPoints: Float32Array;
}

interface Sparkle {
    cell: number;
    bornAt: number;
}

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface CameraPosition {
    zoom: number;
    focusX: number;
    focusY: number;
    rotation: number;
    heightRatio: number;
}

function smoothstep(value: number): number {
    return value * value * (3 - 2 * value);
}

function lerp(from: number, to: number, amount: number): number {
    return from + (to - from) * amount;
}

function coverRect(image: HTMLImageElement, width: number, height: number, focusX: number, zoom = 1, focusY = CROP_ANCHOR_Y, rotation = 0): Rect {
    const radians = rotation * Math.PI / 180;
    const rotatedWidth = width * Math.abs(Math.cos(radians)) + height * Math.abs(Math.sin(radians));
    const rotatedHeight = width * Math.abs(Math.sin(radians)) + height * Math.abs(Math.cos(radians));
    const scale = Math.max(rotatedWidth / image.naturalWidth, rotatedHeight / image.naturalHeight) * zoom;
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    return {
        x: (width - rotatedWidth) / 2 + (rotatedWidth - drawWidth) * focusX,
        y: (height - rotatedHeight) / 2 + (rotatedHeight - drawHeight) * focusY,
        width: drawWidth,
        height: drawHeight,
    };
}

function createGrid(width: number, height: number): Grid {
    const columns = Math.ceil(width / CELL_SIZE);
    const rows = Math.ceil(height / CELL_SIZE);
    const switchPoints = new Float32Array(columns * rows);
    for (let cell = 0; cell < switchPoints.length; cell++) {
        const column = cell % columns;
        const ordered = 0.65 * Math.random() + 0.35 * (column / columns);
        switchPoints[cell] = DISSOLVE_BAND + (1 - 2 * DISSOLVE_BAND) * ordered;
    }
    return { columns, rows, switchPoints };
}

function measureLuminance(image: HTMLImageElement, grid: Grid, focusX: number): Float32Array {
    const sampler = document.createElement("canvas");
    sampler.width = grid.columns;
    sampler.height = grid.rows;
    const context = sampler.getContext("2d", { willReadFrequently: true });
    const luminance = new Float32Array(grid.columns * grid.rows);
    if (!context) return luminance;

    const rect = coverRect(image, grid.columns, grid.rows, focusX);
    context.drawImage(image, rect.x, rect.y, rect.width, rect.height);
    const pixels = context.getImageData(0, 0, grid.columns, grid.rows).data;
    for (let cell = 0; cell < luminance.length; cell++) {
        const offset = cell * 4;
        luminance[cell] = (0.2126 * pixels[offset] + 0.7152 * pixels[offset + 1] + 0.0722 * pixels[offset + 2]) / 255;
    }
    return luminance;
}

function glyphFor(luminance: number): string {
    return GLYPHS[Math.min(GLYPHS.length - 1, Math.floor(luminance * GLYPHS.length))];
}

export function StoryCanvas({ position, reducedMotion, label }: { position: number; reducedMotion: boolean; label: string }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const accentCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const stateRef = useRef({ position, reducedMotion });

    useEffect(() => {
        stateRef.current = { position, reducedMotion };
    }, [position, reducedMotion]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const accentCanvas = accentCanvasRef.current;
        const context = canvas?.getContext("2d");
        const accentContext = accentCanvas?.getContext("2d");
        if (!canvas || !accentCanvas || !context || !accentContext) return;

        const sceneFrames = STORY_SCENES.map(scene =>
            scene.frames.map(source => {
                const image = new Image();
                image.src = source;
                return image;
            }),
        );
        // 이미지 원본을 읽는 작업은 모바일에서 무겁기 때문에, 필요한 컷만 처음 쓸 때 측정한다.
        const luminanceCache = new Map<HTMLImageElement, Float32Array>();
        let grid = createGrid(1, 1);
        let width = 0;
        let height = 0;
        let sparkles: Sparkle[] = [];
        let appliedFilter = "";
        let frame = 0;
        let displayedPosition = stateRef.current.position;
        let lastFrameAt = performance.now();

        function isReady(image: HTMLImageElement | undefined): image is HTMLImageElement {
            return Boolean(image?.complete && image.naturalWidth > 0);
        }

        function luminanceOf(sceneIndex: number, frameIndex: number): Float32Array | null {
            const image = sceneFrames[sceneIndex]?.[frameIndex];
            if (!isReady(image)) return null;
            let luminance = luminanceCache.get(image);
            if (!luminance) {
                luminance = measureLuminance(image, grid, STORY_SCENES[sceneIndex].focusX);
                luminanceCache.set(image, luminance);
            }
            return luminance;
        }

        function resize() {
            const parent = canvas!.parentElement;
            if (!parent) return;
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            width = parent.clientWidth;
            height = parent.clientHeight;
            for (const [target, targetContext] of [[canvas!, context!], [accentCanvas!, accentContext!]] as const) {
                target.width = Math.round(width * pixelRatio);
                target.height = Math.round(height * pixelRatio);
                targetContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }
            grid = createGrid(width, height);
            sparkles = [];
            luminanceCache.clear();
            // 캔버스 크기를 바꾸면 내용이 지워지므로, 다음 프레임을 기다리지 않고 바로 다시 그려 깜빡임을 막는다.
            draw(performance.now());
        }

        function sceneCamera(sceneIndex: number, progress: number): CameraPosition {
            const scene = STORY_SCENES[sceneIndex];
            const isPortrait = width < height;
            const portraitHeight = scene.portraitHeight ?? 1;
            const restingCamera = { zoom: 1, focusX: scene.focusX, focusY: CROP_ANCHOR_Y, rotation: 0, heightRatio: isPortrait ? portraitHeight : 1 };
            if (!scene.camera?.length || stateRef.current.reducedMotion) return restingCamera;
            const lastKeyframe = scene.camera[scene.camera.length - 1];
            const nextIndex = scene.camera.findIndex(keyframe => keyframe.progress >= progress);
            const to = nextIndex < 0 ? lastKeyframe : scene.camera[nextIndex];
            const from = nextIndex < 0 ? lastKeyframe : scene.camera[Math.max(0, nextIndex - 1)];
            const amount = smoothstep(to.progress === from.progress ? 1 : Math.min(1, Math.max(0, (progress - from.progress) / (to.progress - from.progress))));
            const motionScale = Math.min(1, width / Math.max(1, height));
            const rotationScale = motionScale * motionScale;
            return {
                zoom: lerp(1, lerp(from.zoom, to.zoom, amount), motionScale),
                focusX: lerp(from.focusX, to.focusX, amount),
                focusY: lerp(CROP_ANCHOR_Y, lerp(from.focusY ?? CROP_ANCHOR_Y, to.focusY ?? CROP_ANCHOR_Y, amount), motionScale),
                rotation: lerp(from.rotation ?? 0, to.rotation ?? 0, amount) * rotationScale,
                heightRatio: isPortrait ? lerp(from.portraitHeight ?? portraitHeight, to.portraitHeight ?? portraitHeight, amount) : 1,
            };
        }

        function frameRect(sceneIndex: number, camera: CameraPosition): Rect | null {
            const image = sceneFrames[sceneIndex][0];
            return isReady(image) ? coverRect(image, width, height * camera.heightRatio, camera.focusX, camera.zoom, camera.focusY, camera.rotation) : null;
        }

        function drawFrame(target: CanvasRenderingContext2D, sceneIndex: number, frameIndex: number, camera: CameraPosition, alpha = 1) {
            const image = sceneFrames[sceneIndex]?.[frameIndex];
            if (!isReady(image) || alpha <= 0) return;
            const rect = coverRect(image, width, height * camera.heightRatio, camera.focusX, camera.zoom, camera.focusY, camera.rotation);
            target.save();
            target.globalAlpha = alpha;
            target.translate(width / 2, height / 2);
            target.rotate(camera.rotation * Math.PI / 180);
            target.drawImage(image, rect.x - width / 2, rect.y - height / 2, rect.width, rect.height);
            target.restore();
        }

        // 스톱모션 컷 사이를 스크롤 위치에 맞춰 서서히 겹친다.
        function drawFrameSequence(target: CanvasRenderingContext2D, sceneIndex: number, progress: number) {
            const framePosition = getFramePosition(STORY_SCENES[sceneIndex], progress);
            const lastFrame = sceneFrames[sceneIndex].length - 1;
            const baseFrame = Math.min(Math.floor(framePosition), lastFrame);
            const camera = sceneCamera(sceneIndex, progress);
            drawFrame(target, sceneIndex, baseFrame, camera);
            if (baseFrame < lastFrame) drawFrame(target, sceneIndex, baseFrame + 1, camera, smoothstep(framePosition - baseFrame));
        }

        function drawCrossfadeExit(target: CanvasRenderingContext2D, activeIndex: number, progress: number, transition: number) {
            drawFrameSequence(target, activeIndex, progress);
            if (transition > 0) drawFrame(target, activeIndex + 1, 0, sceneCamera(activeIndex + 1, 0), smoothstep(transition));
        }

        function drawGlyph(cell: number, character: string, alpha: number) {
            const x = (cell % grid.columns) * CELL_SIZE;
            const y = Math.floor(cell / grid.columns) * CELL_SIZE;
            context!.fillStyle = `rgba(${GLYPH_COLOR}, ${alpha})`;
            context!.fillText(character, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        }

        function drawDissolve(activeIndex: number, activeFrame: number, transition: number) {
            const nextIndex = activeIndex + 1;
            const switchedCells = new Path2D();
            const burningCells: number[] = [];

            for (let cell = 0; cell < grid.switchPoints.length; cell++) {
                const distance = transition - grid.switchPoints[cell];
                if (distance > DISSOLVE_BAND / 2) {
                    switchedCells.rect((cell % grid.columns) * CELL_SIZE, Math.floor(cell / grid.columns) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                } else if (distance > -DISSOLVE_BAND / 2) {
                    burningCells.push(cell);
                }
            }

            context!.save();
            context!.clip(switchedCells);
            drawFrame(context!, nextIndex, 0, sceneCamera(nextIndex, 0));
            context!.restore();

            const currentLuminance = luminanceOf(activeIndex, activeFrame);
            const nextLuminance = luminanceOf(nextIndex, 0);
            context!.fillStyle = BURNING_CELL_COLOR;
            for (const cell of burningCells) {
                context!.fillRect((cell % grid.columns) * CELL_SIZE, Math.floor(cell / grid.columns) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
            for (const cell of burningCells) {
                const distance = transition - grid.switchPoints[cell];
                const luminance = (distance > 0 ? nextLuminance : currentLuminance)?.[cell] ?? 0.5;
                const alpha = 0.35 + 0.65 * (1 - Math.abs(distance) / (DISSOLVE_BAND / 2));
                drawGlyph(cell, glyphFor(Math.max(luminance, 0.45)), alpha);
            }
        }

        function drawSparkles(activeIndex: number, activeFrame: number, now: number) {
            const luminance = luminanceOf(activeIndex, activeFrame);
            if (!luminance) return;
            sparkles = sparkles.filter(sparkle => now - sparkle.bornAt < SPARKLE_LIFETIME_MS);
            for (let attempt = 0; sparkles.length < SPARKLE_COUNT && attempt < 12; attempt++) {
                const cell = Math.floor(Math.random() * luminance.length);
                if (luminance[cell] > SPARKLE_MIN_LUMINANCE) sparkles.push({ cell, bornAt: now - Math.random() * SPARKLE_LIFETIME_MS });
            }
            for (const sparkle of sparkles) {
                const life = (now - sparkle.bornAt) / SPARKLE_LIFETIME_MS;
                drawGlyph(sparkle.cell, glyphFor(luminance[sparkle.cell]), 0.55 * Math.sin(Math.PI * life));
            }
        }

        // 무채색 화면 위에서 장면을 이어 주는 물체만 원래 색으로 보이게 한다.
        function accentAt(scene: Scene, framePosition: number) {
            if (!scene.accents) return null;
            const lastFrame = scene.accents.length - 1;
            const baseFrame = Math.min(Math.floor(framePosition), lastFrame);
            const from = scene.accents[baseFrame];
            const to = scene.accents[Math.min(baseFrame + 1, lastFrame)];
            const amount = smoothstep(framePosition - baseFrame);
            return { x: lerp(from.x, to.x, amount), y: lerp(from.y, to.y, amount) };
        }

        function projectAccent(rect: Rect, point: { x: number; y: number }, rotation: number) {
            const radians = rotation * Math.PI / 180;
            const x = rect.x + point.x * rect.width - width / 2;
            const y = rect.y + point.y * rect.height - height / 2;
            return {
                x: width / 2 + x * Math.cos(radians) - y * Math.sin(radians),
                y: height / 2 + x * Math.sin(radians) + y * Math.cos(radians),
            };
        }

        function drawAccent(activeIndex: number, progress: number, transition: number) {
            accentContext!.clearRect(0, 0, width, height);
            const framePosition = getFramePosition(STORY_SCENES[activeIndex], progress);
            const current = accentAt(STORY_SCENES[activeIndex], framePosition);
            const nextScene: Scene | undefined = STORY_SCENES[activeIndex + 1];
            const next = transition > 0 && nextScene ? accentAt(nextScene, 0) : null;
            const camera = sceneCamera(activeIndex, progress);
            const rect = frameRect(activeIndex, camera);
            if (!current || !rect) return;

            const nextCamera = next ? sceneCamera(activeIndex + 1, 0) : null;
            const nextRect = nextCamera ? frameRect(activeIndex + 1, nextCamera) : null;
            const amount = next ? smoothstep(transition) : 0;
            const currentPosition = projectAccent(rect, current, camera.rotation);
            const nextPosition = next && nextRect && nextCamera ? projectAccent(nextRect, next, nextCamera.rotation) : currentPosition;
            const centerX = lerp(currentPosition.x, nextPosition.x, amount);
            const centerY = lerp(currentPosition.y, nextPosition.y, amount);
            const radius = ACCENT_RADIUS * lerp(rect.width, nextRect?.width ?? rect.width, amount);

            drawCrossfadeExit(accentContext!, activeIndex, progress, transition);
            const mask = accentContext!.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            mask.addColorStop(0, "rgba(0, 0, 0, 1)");
            mask.addColorStop(0.6, "rgba(0, 0, 0, 1)");
            mask.addColorStop(1, "rgba(0, 0, 0, 0)");
            accentContext!.globalCompositeOperation = "destination-in";
            accentContext!.fillStyle = mask;
            accentContext!.fillRect(0, 0, width, height);
            accentContext!.globalCompositeOperation = "source-over";
        }

        function drawPortraitFade(activeIndex: number, progress: number, transition: number) {
            const current = sceneCamera(activeIndex, progress);
            const next = transition > 0 ? sceneCamera(activeIndex + 1, 0) : current;
            const imageHeight = height * lerp(current.heightRatio, next.heightRatio, smoothstep(transition));
            if (imageHeight >= height) return;

            const fadeStart = imageHeight * 0.82;
            for (const target of [context!, accentContext!]) {
                target.save();
                const fade = target.createLinearGradient(0, fadeStart, 0, imageHeight);
                fade.addColorStop(0, "rgba(18, 16, 14, 0)");
                fade.addColorStop(1, BACKGROUND_COLOR);
                if (target === accentContext) target.globalCompositeOperation = "destination-out";
                target.fillStyle = fade;
                target.fillRect(0, fadeStart, width, height - fadeStart);
                target.restore();
            }
        }

        function draw(now: number) {
            const { position, reducedMotion } = stateRef.current;
            displayedPosition = reducedMotion
                ? position
                : lerp(displayedPosition, position, 1 - Math.exp(-(now - lastFrameAt) / POSITION_EASING_MS));
            lastFrameAt = now;
            const timeline = getTimeline(displayedPosition, reducedMotion);
            const activeScene = STORY_SCENES[timeline.activeIndex];

            const filter = `grayscale(${(1 - timeline.colorLevel).toFixed(3)})`;
            if (filter !== appliedFilter) {
                canvas!.style.filter = filter;
                appliedFilter = filter;
            }

            const framePosition = getFramePosition(activeScene, timeline.lineProgress);
            const activeFrame = Math.round(framePosition);

            context!.fillStyle = BACKGROUND_COLOR;
            context!.fillRect(0, 0, width, height);
            context!.font = `bold ${CELL_SIZE + 2}px ui-monospace, monospace`;
            context!.textAlign = "center";
            context!.textBaseline = "middle";

            const isCrossfadeExit = activeScene.exit === "crossfade";
            if (isCrossfadeExit) {
                drawCrossfadeExit(context!, timeline.activeIndex, timeline.lineProgress, timeline.transition);
            } else {
                drawFrameSequence(context!, timeline.activeIndex, timeline.lineProgress);
                if (timeline.transition > 0) drawDissolve(timeline.activeIndex, activeFrame, timeline.transition);
            }
            if (timeline.transition === 0 && !reducedMotion && activeScene.ambientSparkles !== false) drawSparkles(timeline.activeIndex, activeFrame, now);

            if (isCrossfadeExit || timeline.transition === 0) {
                drawAccent(timeline.activeIndex, timeline.lineProgress, timeline.transition);
            } else {
                accentContext!.clearRect(0, 0, width, height);
            }
            drawPortraitFade(timeline.activeIndex, timeline.lineProgress, timeline.transition);
        }

        function render(now: number) {
            frame = requestAnimationFrame(render);
            draw(now);
        }

        const resizeObserver = new ResizeObserver(resize);
        if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
        resize();
        frame = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className="story-canvas" role="img" aria-label={label} />
            <canvas ref={accentCanvasRef} className="story-canvas" aria-hidden="true" />
        </>
    );
}
