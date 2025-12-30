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

export type ParishInfo = {
  name: string;
  address?: string;
  priest?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  time?: string; // hh:mm
  location?: string;
  description?: string;
};

export type PrayerPost = {
  id: string;
  author: string;
  content: string;
  createdAt: string; // ISO
  answered?: boolean;
};

export type Sermon = {
  id: string;
  title: string;
  videoUrl?: string; // youtube or mp4
  description?: string;
  date?: string; // ISO
};

export type DailyVerse = {
  text: string;
  reference: string;
};