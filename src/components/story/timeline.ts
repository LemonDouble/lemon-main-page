import { STORY_SCENES, type Scene } from "@/components/story/scenes";

export const SCENE_COUNT = STORY_SCENES.length;
// 장면마다 스크롤 500px을 쓰고, 컷별 시간은 frameTiming으로 조절한다.
export const CUTS_PER_SCENE = 5;
export const SCROLL_PX_PER_CUT = 100;
export const SCROLL_PX_PER_SCENE = CUTS_PER_SCENE * SCROLL_PX_PER_CUT;
// 장면 구간의 앞부분(마지막 컷까지)은 컷을 넘기며 마법의 선을 그리고, 마지막 한 칸은 다음 장면으로 넘어가는 데 쓴다.
const DRAWING_SHARE = (CUTS_PER_SCENE - 1) / CUTS_PER_SCENE;

export interface Timeline {
    activeIndex: number;
    transition: number;
    // 마법의 선이 그려진 정도(0~1). 스톱모션 컷도 이 값에 맞춰 넘어간다.
    lineProgress: number;
    colorLevel: number;
}

export interface SceneState {
    imageOpacity: number;
    textOpacity: number;
    lineProgress: number;
}

export function clamp01(value: number): number {
    return Math.min(1, Math.max(0, value));
}

export function getFramePosition(scene: Scene, progress: number): number {
    if (!scene.frameTiming?.length) return progress * (scene.frames.length - 1);
    const nextIndex = scene.frameTiming.findIndex(keyframe => keyframe.progress >= progress);
    if (nextIndex < 0) return scene.frameTiming[scene.frameTiming.length - 1].frame;
    const to = scene.frameTiming[nextIndex];
    const from = scene.frameTiming[Math.max(0, nextIndex - 1)];
    const amount = to.progress === from.progress ? 1 : clamp01((progress - from.progress) / (to.progress - from.progress));
    return from.frame + (to.frame - from.frame) * amount;
}

export function getTimeline(position: number, reducedMotion: boolean): Timeline {
    const activeIndex = Math.min(Math.floor(position), SCENE_COUNT - 1);
    const progressInScene = position - activeIndex;
    const isLastScene = activeIndex === SCENE_COUNT - 1;
    const transition = reducedMotion || isLastScene ? 0 : clamp01((progressInScene - DRAWING_SHARE) / (1 - DRAWING_SHARE));
    const lineProgress = reducedMotion ? 1 : clamp01(progressInScene / DRAWING_SHARE);
    return {
        activeIndex,
        transition,
        lineProgress,
        // 무채색으로 시작해서, 마지막 장면의 선을 다 그렸을 때 완전한 컬러가 된다.
        colorLevel: (activeIndex + lineProgress) / SCENE_COUNT,
    };
}

export function getSceneState(index: number, timeline: Timeline): SceneState {
    const { activeIndex, transition, lineProgress } = timeline;
    if (index === activeIndex) {
        return { imageOpacity: 1 - transition, textOpacity: clamp01(1 - transition * 2), lineProgress };
    }
    if (index === activeIndex + 1) {
        return { imageOpacity: transition, textOpacity: clamp01(transition * 2 - 1), lineProgress: 0 };
    }
    return { imageOpacity: 0, textOpacity: 0, lineProgress: index < activeIndex ? 1 : 0 };
}

export type ScrollDirection = 1 | -1;

// 컷마다 그 컷이 온전히 보이기 시작하는 위치다.
const CUT_POSITIONS = STORY_SCENES.flatMap((scene, sceneIndex) =>
    scene.frames.map((_, frame) => {
        const progress = scene.frameTiming?.find(keyframe => keyframe.frame === frame)?.progress ?? frame / Math.max(1, scene.frames.length - 1);
        return sceneIndex + progress * DRAWING_SHARE;
    }),
);
// 스크롤 위치는 정수 px로 맞춰지므로 1px 차이는 같은 위치로 본다.
const CUT_POSITION_TOLERANCE = 1 / SCROLL_PX_PER_SCENE;

// 스크롤이 멈췄을 때 맞출 위치다. 조금이라도 스크롤했다면 그 방향의 다음 컷으로 넘긴다.
export function getRestingPosition(position: number, direction: ScrollDirection): number {
    const resting = direction > 0
        ? CUT_POSITIONS.find(cutPosition => cutPosition >= position - CUT_POSITION_TOLERANCE)
        : [...CUT_POSITIONS].reverse().find(cutPosition => cutPosition <= position + CUT_POSITION_TOLERANCE);
    return resting ?? position;
}
