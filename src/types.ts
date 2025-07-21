export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  lastUpdated: string; // ISO date string
  details?: string; // Optional content for recitation items
}
export interface CheckEvent {
  itemId: string;
  timestamp: string; // ISO date string
  checked: boolean;
}
export type TimeFrame = 'week' | 'month' | 'quarter' | 'year';