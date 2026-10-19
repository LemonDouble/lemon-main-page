import type { Dictionary } from "@/lib/i18n";

export type SceneKey = "intro" | "voice" | "homelab" | "iot" | "hardware" | "agents" | "contact";

export interface StoryProject {
    id: keyof Dictionary["story"]["projects"];
    name: string;
    githubUrl?: string;
}

export interface Scene {
    key: SceneKey;
    // 스톱모션 컷 목록이다. 장면을 스크롤하는 동안 차례로 넘어가며, 컷이 하나면 정지 화면이다.
    frames: string[];
    frameTiming?: { progress: number; frame: number }[];
    // 다음 장면으로 넘어가는 방식이다. 마지막 컷이 다음 장면 첫 컷과 이어지도록 그렸다면 crossfade를 쓴다.
    exit?: "dissolve" | "crossfade";
    // 화면 비율이 그림과 다를 때 잘라내는 기준점(0=왼쪽, 1=오른쪽). 인물이 잘리지 않게 맞춘다.
    focusX: number;
    portraitHeight?: number;
    camera?: { progress: number; zoom: number; focusX: number; focusY?: number; rotation?: number; portraitHeight?: number }[];
    ambientSparkles?: boolean;
    // 장면을 이어 주는 물체의 위치를 컷마다 적는다(그림 기준 0~1). 이 영역은 무채색 처리를 받지 않는다.
    accents?: { x: number; y: number }[];
    // id는 메시지 파일의 story.projects 키다. 블로그 데이터에도 있는 프로젝트는 블로그 slug와 같게 맞춰 상세 페이지 Highlights에 쓴다.
    projects: StoryProject[];
    // 160x90 좌표계의 곡선이며, 비율을 유지한 채 무대를 덮도록 확대된다.
    magicLinePath?: string;
}

export const STORY_SCENES: Scene[] = [
    {
        key: "intro",
        frames: [
            "/image/story/scene-01-intro-1-style-v1.webp",
            "/image/story/scene-01-intro-2-style-v1.webp",
            "/image/story/scene-01-intro-3-style-v1.webp",
            "/image/story/scene-01-intro-4-style-v1.webp",
            "/image/story/scene-01-intro-5-style-v1.webp",
        ],
        exit: "crossfade",
        focusX: 0.6,
        camera: [
            { progress: 0, zoom: 1, focusX: 0.6, focusY: 0.2 },
            { progress: 1, zoom: 1.06, focusX: 0.6, focusY: 0.12 },
        ],
        accents: [
            { x: 0.491, y: 0.389 },
            { x: 0.42, y: 0.377 },
            { x: 0.405, y: 0.374 },
            { x: 0.416, y: 0.36 },
            { x: 0.425, y: 0.366 },
        ],
        projects: [],
        magicLinePath: "M -8 73.8 C 28.8 55.8, 54.4 86.4, 86.4 64.8 S 128 27, 168 39.6",
    },
    {
        key: "voice",
        frames: [
            "/image/story/scene-01-intro-5-style-v1.webp",
            "/image/story/scene-02-voice-2-orbit-v1.webp",
            "/image/story/scene-02-voice-3-orbit-v1.webp",
            "/image/story/scene-02-voice-4-orbit-v1.webp",
            "/image/story/scene-02-voice-5-headphones-v1.webp",
        ],
        exit: "crossfade",
        focusX: 0.66,
        camera: [
            { progress: 0, zoom: 1.06, focusX: 0.6, focusY: 0.12, rotation: 0 },
            { progress: 0.25, zoom: 1.02, focusX: 0.64, focusY: 0.08, rotation: 12 },
            { progress: 0.5, zoom: 1, focusX: 0.72, focusY: 0.14, rotation: 22 },
            { progress: 0.75, zoom: 1.03, focusX: 0.66, focusY: 0.2, rotation: 8 },
            { progress: 1, zoom: 1.04, focusX: 0.66, focusY: 0.2, rotation: 0 },
        ],
        accents: [
            { x: 0.425, y: 0.366 },
            { x: 0.374, y: 0.308 },
            { x: 0.653, y: 0.333 },
            { x: 0.624, y: 0.609 },
            { x: 0.624, y: 0.609 },
        ],
        projects: [
            { id: "hayakoe", name: "hayakoe", githubUrl: "https://github.com/LemonDouble/hayakoe" },
            { id: "lemon-tts", name: "lemon-tts", githubUrl: "https://github.com/Lemon-HACS/lemon_tts" },
        ],
    },
    {
        key: "homelab",
        frames: [
            "/image/story/scene-02-voice-5-headphones-v1.webp",
            "/image/story/scene-03-homelab-2-home-flow-v1.webp",
            "/image/story/scene-03-homelab-3-home-flow-v1.webp",
            "/image/story/scene-03-homelab-4-home-flow-v1.webp",
            "/image/story/scene-03-homelab-5-home-flow-v1.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.32, frame: 1 },
            { progress: 0.48, frame: 2 },
            { progress: 0.72, frame: 3 },
            { progress: 1, frame: 4 },
        ],
        exit: "crossfade",
        focusX: 0.66,
        camera: [
            { progress: 0, zoom: 1.04, focusX: 0.66, focusY: 0.2 },
            { progress: 0.32, zoom: 1.16, focusX: 0.5, focusY: 0.3 },
            { progress: 0.48, zoom: 1.16, focusX: 0.5, focusY: 0.3 },
            { progress: 0.72, zoom: 1.12, focusX: 0.73, focusY: 0.2 },
            { progress: 1, zoom: 1.06, focusX: 0.66, focusY: 0.2 },
        ],
        ambientSparkles: false,
        accents: [
            { x: 0.624, y: 0.609 },
            { x: 0.368, y: 0.44 },
            { x: 0.362, y: 0.44 },
            { x: 0.436, y: 0.312 },
            { x: 0.508, y: 0.28 },
        ],
        projects: [
            { id: "lemon-k8s-cluster", name: "lemon-k8s-cluster" },
            { id: "misskey", name: "Misskey" },
            { id: "misskey-geeknews-webhooks", name: "misskey-geeknews-webhooks" },
        ],
    },
    {
        key: "iot",
        frames: [
            "/image/story/scene-03-homelab-5-home-flow-v1.webp",
            "/image/story/scene-04-iot-2-home-flow-v1.webp",
            "/image/story/scene-04-iot-3-home-flow-v1.webp",
            "/image/story/scene-04-iot-4-home-flow-v1.webp",
            "/image/story/scene-04-iot-5-home-flow-v1.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.2, frame: 1 },
            { progress: 0.55, frame: 1 },
            { progress: 0.75, frame: 2 },
            { progress: 0.88, frame: 3 },
            { progress: 1, frame: 4 },
        ],
        exit: "crossfade",
        focusX: 0.55,
        camera: [
            { progress: 0, zoom: 1.06, focusX: 0.66, focusY: 0.2 },
            { progress: 0.55, zoom: 1.06, focusX: 0.66, focusY: 0.2 },
            { progress: 0.75, zoom: 1.06, focusX: 0.7, focusY: 0.2 },
            { progress: 0.88, zoom: 1.06, focusX: 0.6, focusY: 0.2 },
            { progress: 1, zoom: 1.06, focusX: 0.55, focusY: 0.2 },
        ],
        ambientSparkles: false,
        accents: [
            { x: 0.508, y: 0.28 },
            { x: 0.508, y: 0.28 },
            { x: 0.165, y: 0.14 },
            { x: 0.501, y: 0.562 },
            { x: 0.43, y: 0.284 },
        ],
        projects: [
            { id: "kepco-powerplanner-ha-addon", name: "kepco-powerplanner", githubUrl: "https://github.com/LemonDouble/kepco_powerplanner_ha_addon" },
            { id: "hass-kakao-map-changer", name: "kakao-map-changer", githubUrl: "https://github.com/Lemon-HACS/hass-kakao-map-changer" },
            { id: "shiroko", name: "shiroko" },
        ],
    },
    {
        key: "hardware",
        frames: [
            "/image/story/scene-04-iot-5-home-flow-v1.webp",
            "/image/story/scene-05-hardware-2-craft-v2.webp",
            "/image/story/scene-05-hardware-3-craft-v1.webp",
            "/image/story/scene-05-hardware-4-craft-v2.webp",
            "/image/story/scene-05-hardware-5-craft-v1.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.18, frame: 1 },
            { progress: 0.4, frame: 2 },
            { progress: 0.7, frame: 2 },
            { progress: 0.85, frame: 3 },
            { progress: 1, frame: 4 },
        ],
        exit: "crossfade",
        focusX: 0.63,
        camera: [
            { progress: 0, zoom: 1.06, focusX: 0.55, focusY: 0.2 },
            { progress: 0.18, zoom: 1.12, focusX: 0.66, focusY: 0.85 },
            { progress: 0.4, zoom: 1.18, focusX: 0.68, focusY: 0.9 },
            { progress: 0.7, zoom: 1.18, focusX: 0.68, focusY: 0.9 },
            { progress: 0.85, zoom: 1.12, focusX: 0.59, focusY: 0.5 },
            { progress: 1, zoom: 1.08, focusX: 0.63, focusY: 0.12 },
        ],
        ambientSparkles: false,
        accents: [
            { x: 0.43, y: 0.284 },
            { x: 0.524, y: 0.506 },
            { x: 0.6, y: 0.385 },
            { x: 0.546, y: 0.459 },
            { x: 0.49, y: 0.348 },
        ],
        projects: [
            { id: "geardrak", name: "GEARDRAK" },
            { id: "supernova", name: "Supernova" },
        ],
    },
    {
        key: "agents",
        frames: [
            "/image/story/scene-05-hardware-5-craft-v1.webp",
            "/image/story/scene-06-agents-2-pair-v1.webp",
            "/image/story/scene-06-agents-3-pair-v1.webp",
            "/image/story/scene-06-agents-4-pair-v1.webp",
            "/image/story/scene-06-agents-5-pair-v3.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.2, frame: 1 },
            { progress: 0.45, frame: 2 },
            { progress: 0.72, frame: 3 },
            { progress: 1, frame: 4 },
        ],
        exit: "crossfade",
        focusX: 0.62,
        portraitHeight: 0.56,
        camera: [
            { progress: 0, zoom: 1.08, focusX: 0.63, focusY: 0.12, portraitHeight: 1 },
            { progress: 0.2, zoom: 1.06, focusX: 0.57, focusY: 0.3 },
            { progress: 0.45, zoom: 1.04, focusX: 0.56, focusY: 0.4 },
            { progress: 0.72, zoom: 1.02, focusX: 0.56, focusY: 0.35 },
            { progress: 1, zoom: 1, focusX: 0.62, focusY: 0.2 },
        ],
        ambientSparkles: false,
        accents: [
            { x: 0.49, y: 0.348 },
            { x: 0.413, y: 0.315 },
            { x: 0.49, y: 0.455 },
            { x: 0.49, y: 0.415 },
            { x: 0.49, y: 0.47 },
        ],
        projects: [
            { id: "claude-dashboard", name: "claude-dashboard" },
            { id: "lemon-design-system", name: "lemon-design-system", githubUrl: "https://github.com/LemonDouble/lemon-design-system" },
        ],
    },
    {
        key: "contact",
        frames: ["/image/story/scene-07-contact-style-v1.webp"],
        focusX: 0.62,
        portraitHeight: 0.56,
        ambientSparkles: false,
        accents: [{ x: 0.479, y: 0.322 }],
        projects: [],
    },
];

export const HIGHLIGHT_PROJECT_SLUGS: string[] = STORY_SCENES.flatMap(scene => scene.projects.map(project => project.id));
