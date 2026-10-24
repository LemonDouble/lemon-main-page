import type { Dictionary } from "@/lib/i18n";

export type SceneKey = "intro" | "homelab" | "smarthome" | "mlai" | "web" | "hardware" | "game" | "contact";

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
            "/image/story/scene-01-intro-1-generic-v2.webp",
            "/image/story/scene-01-intro-2-generic-v2.webp",
            "/image/story/scene-01-intro-3-generic-v2.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.15, frame: 0 },
            { progress: 0.4, frame: 1 },
            { progress: 0.6, frame: 1 },
            { progress: 0.85, frame: 2 },
            { progress: 1, frame: 2 },
        ],
        exit: "dissolve",
        focusX: 0.68,
        camera: [
            { progress: 0, zoom: 1, focusX: 0.68 },
            { progress: 1, zoom: 1.06, focusX: 0.68 },
        ],
        projects: [],
        magicLinePath: "M -8 73.8 C 28.8 55.8, 54.4 86.4, 86.4 64.8 S 128 27, 168 39.6",
    },
    {
        key: "homelab",
        frames: [
            "/image/story/scene-02-homelab-1-generic-v2.webp",
            "/image/story/scene-02-homelab-2-generic-v2.webp",
            "/image/story/scene-02-homelab-3-generic-v2.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.15, frame: 0 },
            { progress: 0.4, frame: 1 },
            { progress: 0.6, frame: 1 },
            { progress: 0.85, frame: 2 },
            { progress: 1, frame: 2 },
        ],
        exit: "dissolve",
        focusX: 0.54,
        camera: [
            { progress: 0, zoom: 1, focusX: 0.54 },
            { progress: 1, zoom: 1.06, focusX: 0.54 },
        ],
        projects: [
            { id: "lemon-k8s-cluster", name: "lemon-k8s-cluster" },
            { id: "misskey", name: "Misskey" },
        ],
    },
    {
        key: "smarthome",
        frames: [
            "/image/story/scene-03-smarthome-1-generic-v2.webp",
            "/image/story/scene-03-smarthome-2-generic-v2.webp",
            "/image/story/scene-03-smarthome-3-generic-v2.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.15, frame: 0 },
            { progress: 0.4, frame: 1 },
            { progress: 0.6, frame: 1 },
            { progress: 0.85, frame: 2 },
            { progress: 1, frame: 2 },
        ],
        exit: "dissolve",
        focusX: 0.57,
        camera: [
            { progress: 0, zoom: 1, focusX: 0.57 },
            { progress: 1, zoom: 1.06, focusX: 0.57 },
        ],
        projects: [
            { id: "kepco-powerplanner-ha-addon", name: "kepco-powerplanner", githubUrl: "https://github.com/LemonDouble/kepco_powerplanner_ha_addon" },
            { id: "hass-kakao-map-changer", name: "kakao-map-changer", githubUrl: "https://github.com/Lemon-HACS/hass-kakao-map-changer" },
            { id: "lemon-tts", name: "lemon-tts", githubUrl: "https://github.com/Lemon-HACS/lemon_tts" },
        ],
    },
    {
        key: "mlai",
        frames: [
            "/image/story/scene-04-mlai-1-generic-v2.webp",
            "/image/story/scene-04-mlai-2-generic-v2.webp",
            "/image/story/scene-04-mlai-3-generic-v2.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.15, frame: 0 },
            { progress: 0.4, frame: 1 },
            { progress: 0.6, frame: 1 },
            { progress: 0.85, frame: 2 },
            { progress: 1, frame: 2 },
        ],
        exit: "dissolve",
        focusX: 0.65,
        camera: [
            { progress: 0, zoom: 1, focusX: 0.65 },
            { progress: 1, zoom: 1.06, focusX: 0.65 },
        ],
        projects: [
            { id: "hayakoe", name: "hayakoe", githubUrl: "https://github.com/LemonDouble/hayakoe" },
            { id: "lemon-manga-translator", name: "lemon-manga-translator", githubUrl: "https://github.com/LemonDouble/lemon-manga-translator" },
            { id: "claude-dashboard", name: "claude-dashboard" },
        ],
    },
    {
        key: "web",
        frames: [
            "/image/story/scene-05-web-1-generic-v2.webp",
            "/image/story/scene-05-web-2-generic-v2.webp",
            "/image/story/scene-05-web-3-generic-v2.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.15, frame: 0 },
            { progress: 0.4, frame: 1 },
            { progress: 0.6, frame: 1 },
            { progress: 0.85, frame: 2 },
            { progress: 1, frame: 2 },
        ],
        exit: "dissolve",
        focusX: 0.62,
        camera: [
            { progress: 0, zoom: 1, focusX: 0.62 },
            { progress: 1, zoom: 1.06, focusX: 0.62 },
        ],
        projects: [],
    },
    {
        key: "hardware",
        frames: [
            "/image/story/scene-06-hardware-1-generic-v2.webp",
            "/image/story/scene-06-hardware-2-generic-v2.webp",
            "/image/story/scene-06-hardware-3-generic-v2.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.15, frame: 0 },
            { progress: 0.4, frame: 1 },
            { progress: 0.6, frame: 1 },
            { progress: 0.85, frame: 2 },
            { progress: 1, frame: 2 },
        ],
        exit: "dissolve",
        focusX: 0.54,
        camera: [
            { progress: 0, zoom: 1, focusX: 0.54 },
            { progress: 1, zoom: 1.06, focusX: 0.54 },
        ],
        projects: [
            { id: "geardrak", name: "GEARDRAK" },
            { id: "supernova", name: "Supernova" },
        ],
    },
    {
        key: "game",
        frames: [
            "/image/story/scene-07-game-1-generic-v2.webp",
            "/image/story/scene-07-game-2-generic-v2.webp",
            "/image/story/scene-07-game-3-generic-v2.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.15, frame: 0 },
            { progress: 0.4, frame: 1 },
            { progress: 0.6, frame: 1 },
            { progress: 0.85, frame: 2 },
            { progress: 1, frame: 2 },
        ],
        exit: "dissolve",
        focusX: 0.62,
        camera: [
            { progress: 0, zoom: 1, focusX: 0.62 },
            { progress: 1, zoom: 1.06, focusX: 0.62 },
        ],
        projects: [],
    },
    {
        key: "contact",
        frames: [
            "/image/story/scene-08-contact-1-generic-v2.webp",
            "/image/story/scene-08-contact-2-generic-v2.webp",
        ],
        frameTiming: [
            { progress: 0, frame: 0 },
            { progress: 0.3, frame: 0 },
            { progress: 0.7, frame: 1 },
            { progress: 1, frame: 1 },
        ],
        focusX: 0.6,
        projects: [],
    },
];
