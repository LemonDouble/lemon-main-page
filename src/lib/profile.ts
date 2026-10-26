import { BrainCircuit, Cpu, Gamepad2, House, KeyRound, Server, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

export type FieldKey = keyof Dictionary["fields"];
type ProjectId = keyof Dictionary["projects"];
type TechCategory = keyof Dictionary["techStack"]["categories"];
type ContributionId = keyof Dictionary["openSource"]["contributions"];

export interface Field {
    key: FieldKey;
    icon: LucideIcon;
    projects: { id: ProjectId; name: string; url?: string }[];
}

export const FIELDS: Field[] = [
    {
        key: "homelab",
        icon: Server,
        projects: [
            { id: "lemon-k8s-cluster", name: "lemon-k8s-cluster" },
            { id: "misskey", name: "Misskey" },
        ],
    },
    {
        key: "smarthome",
        icon: House,
        projects: [
            { id: "kepco-powerplanner-ha-addon", name: "kepco-powerplanner", url: "https://github.com/LemonDouble/kepco_powerplanner_ha_addon" },
            { id: "hass-kakao-map-changer", name: "kakao-map-changer", url: "https://github.com/Lemon-HACS/hass-kakao-map-changer" },
            { id: "lemon-tts", name: "lemon-tts", url: "https://github.com/Lemon-HACS/lemon_tts" },
        ],
    },
    {
        key: "mlai",
        icon: BrainCircuit,
        projects: [
            { id: "hayakoe", name: "hayakoe", url: "https://github.com/LemonDouble/hayakoe" },
            { id: "lemon-manga-translator", name: "lemon-manga-translator", url: "https://github.com/LemonDouble/lemon-manga-translator" },
            { id: "claude-dashboard", name: "claude-dashboard" },
        ],
    },
    {
        key: "web",
        icon: KeyRound,
        projects: [],
    },
    {
        key: "hardware",
        icon: Cpu,
        projects: [
            { id: "geardrak", name: "GEARDRAK" },
            { id: "supernova", name: "Supernova" },
        ],
    },
    {
        key: "game",
        icon: Gamepad2,
        projects: [],
    },
];

// GitHub 프로필 README의 기술 스택 중 '자주 써요'만 옮겼다.
export const TECH_STACK: { category: TechCategory; items: string[] }[] = [
    { category: "language", items: ["TypeScript", "Python", "Go"] },
    { category: "backend", items: ["FastAPI", "Gin"] },
    { category: "frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS"] },
    { category: "infra", items: ["Kubernetes", "Docker", "ArgoCD", "Helm", "Terraform", "Traefik", "Cloudflare", "Lambda"] },
    { category: "database", items: ["MySQL", "Redis", "PostgreSQL", "DynamoDB", "OpenSearch"] },
    { category: "mlai", items: ["PyTorch", "ONNX"] },
    { category: "iot", items: ["Home Assistant", "ESP32/8266"] },
    { category: "tools", items: ["Claude Code", "Codex"] },
];

export const OPEN_SOURCE: { id: ContributionId; repository: string; pullRequest: number; year: number }[] = [
    { id: "rustfs", repository: "rustfs/rustfs", pullRequest: 1018, year: 2025 },
    { id: "doks", repository: "thuliteio/doks", pullRequest: 1356, year: 2025 },
    { id: "kubeseal-webgui", repository: "Jaydee94/kubeseal-webgui", pullRequest: 278, year: 2025 },
    { id: "opensearch-helm-charts", repository: "opensearch-project/helm-charts", pullRequest: 618, year: 2024 },
    { id: "minio-operator", repository: "minio/operator", pullRequest: 1910, year: 2023 },
];

export function pullRequestUrl(contribution: (typeof OPEN_SOURCE)[number]): string {
    return `https://github.com/${contribution.repository}/pull/${contribution.pullRequest}`;
}
