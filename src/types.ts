export type TabType = 'home' | 'map' | 'pets' | 'tome';

export type TimeOfDay = 'morning' | 'afternoon' | 'sunset' | 'night';

export interface PetStatus {
  name: string;
  species: string;
  title: string;
  mood: string;
  tag: string;
  bond: number; // 0-100
  fullness: number; // 0-100
  happiness: number; // 0-100
  energyDots: number; // 1-4
  napStatus: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  count: number;
  iconName: string;
  color: string;
  desc: string;
}

export interface Quest {
  id: string;
  title: string;
  summary: string;
  detail: string;
  npc: string;
  location: string;
  reward: {
    item: string;
    count: number;
  };
  completed: boolean;
}

export interface Expedition {
  companion: string;
  location: string;
  progressPercent: number;
  statusText: string;
  foundItems: string[];
}
