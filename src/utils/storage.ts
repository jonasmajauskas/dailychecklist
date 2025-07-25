import { ChecklistItem, CheckEvent } from '../types';

const CHECKLIST_KEY = 'checklistItems';
const CHECK_EVENTS_KEY = 'checkEvents';
const LAST_RESET_KEY = 'lastChecklistReset';

// ✅ Default checklist items
const defaultItems: ChecklistItem[] = [
  { id: '1', title: 'Stretching', completed: false, lastUpdated: new Date().toISOString() },
  { id: '2', title: '50 pushups', completed: false, lastUpdated: new Date().toISOString() },
  { id: '3', title: '100 situps', completed: false, lastUpdated: new Date().toISOString() },
  { id: '4', title: '5 Minute Breathing', completed: false, lastUpdated: new Date().toISOString() },
  { id: '5', title: 'Daily Gratitude', completed: false, lastUpdated: new Date().toISOString() },
  { id: '6', title: '10 Minute MathToGo', completed: false, lastUpdated: new Date().toISOString() },
  {
    id: '7',
    title: 'Recite life values and principles',
    completed: false,
    lastUpdated: new Date().toISOString(),
    details: `
1. Kindness: treat everyone with respect and compassion, offering help without expecting anything in return.

2. Humility: acknowledge my limits, admit mistakes, and give credit to others where it’s due.

3. Openness: be receptive to new ideas, people, and experiences without judgement or defensiveness.

4. Justice: act fairly and stand up for what’s right, even when it’s inconvenient or uncomfortable.

5. Growth: continuously seek to learn, improve, and develop — emotionally, intellectually, and spiritually.

6. Family: prioritize time, care, and love for my family, nurturing those bonds and supporting them through all seasons of life.`
  },
  {
    id: '8',
    title: 'Recite work values and principles',
    completed: false,
    lastUpdated: new Date().toISOString(),
    details: `
1. Trust: keep my promises, be honest, and protect confidentiality.

2. Stewardship: treat client’s resources and goals as though they were my own — responsibly, ethically, and with care.

3. Professionalism: uphold the highest standards in my work, communication, and demeanor, inspiring confidence in others.

4. Leadership: take initiative, guide others through uncertainty, and empower those around me to succeed.

5. Excellence: strive to deliver my best work, continuously improving and exceeding expectations where possible.`
  },
  {
    id: '9',
    title: 'Recite SkyPointe mission statement',
    completed: false,
    lastUpdated: new Date().toISOString(),
    details: `My mission is to live with purpose and integrity, continuously growing and learning while making a positive impact on those around me. I strive to balance achievement with well-being, to be present in each moment, and to leave every situation better than I found it. Through my actions and choices, I aim to create a meaningful legacy that inspires others to discover and fulfill their own potential.`
  },
  {
    id: '10',
    title: 'Review Dashboard Metrics',
    completed: false,
    lastUpdated: new Date().toISOString()
  }
];

// ✅ Get checklist items from localStorage or use defaults
export const getChecklistItems = (): ChecklistItem[] => {
  const storedItems = localStorage.getItem(CHECKLIST_KEY);
  return storedItems ? JSON.parse(storedItems) : defaultItems;
};

// ✅ Save checklist items to localStorage
export const saveChecklistItems = (items: ChecklistItem[]): void => {
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(items));
};

// ✅ Reset all items to incomplete and update localStorage
export const resetChecklistItems = (): void => {
  const resetItems: ChecklistItem[] = getChecklistItems().map(item => ({
    ...item,
    completed: false,
    lastUpdated: new Date().toISOString()
  }));
  saveChecklistItems(resetItems);
};

// ✅ Daily reset check: returns true if today hasn't been reset yet
export const shouldResetToday = (): boolean => {
  const today = new Date().toISOString().split('T')[0];
  const lastReset = localStorage.getItem(LAST_RESET_KEY);

  if (lastReset === today) return false;

  localStorage.setItem(LAST_RESET_KEY, today);
  return true;
};

// ✅ Get check events from localStorage
export const getCheckEvents = (): CheckEvent[] => {
  const storedEvents = localStorage.getItem(CHECK_EVENTS_KEY);
  return storedEvents ? JSON.parse(storedEvents) : [];
};

// ✅ Save a new check event
export const saveCheckEvent = (event: CheckEvent): void => {
  const events = getCheckEvents();
  events.push(event);
  localStorage.setItem(CHECK_EVENTS_KEY, JSON.stringify(events));
};