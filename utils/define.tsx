export type RewardType = "coin" | "item" | "vip" | "code";

export type Reward = {
    id: string;
    label: string;
    type: RewardType;
    amount?: number; // coins
    image?: string; // public path
    color?: string;
    description?: string;
    weight?:number
};