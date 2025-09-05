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
  {
    id: '6',
    title: 'Recite life values and principles',
    completed: false,
    lastUpdated: new Date().toISOString(),
    details: `
1. Kindness: treat everyone with respect and compassion.

2. Openness: be receptive to new ideas, people, and experiences without judgement or defensiveness.

3. Justice: act fairly and stand up for what’s right.

4. Growth: seek to learn, improve, and develop.

5. Family: prioritize time, care, and love for my family.`
  },
  {
    id: '7',
    title: 'Recite work values and principles',
    completed: false,
    lastUpdated: new Date().toISOString(),
    details: `
1. Excellence: strive to deliver my best work.

2. Integrity: Act with honesty in every decision, keep commitments without compromise, and safeguard the trust others place in me by protecting their confidentiality.

3. Professionalism: uphold the highest standards in my work, communication, and demeanor.

4. Leadership: take initiative, guide others through uncertainty, and empower those around me to succeed.

5. Stewardship: treat client’s resources responsibly, ethically, and with care.`
  },
    {
    id: '8',
    title: 'Go for a walk',
    completed: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Recite SkyPointe mission statement',
    completed: false,
    lastUpdated: new Date().toISOString(),
    details: `We help our clients achieve financial independence, lifestyle aspiration, and a meaningful impact. We achieve this through deep discovery, a lifelong learning and teaching, and first-class grace and hustle.`
  },
  {
    id: '9',
    title: 'Practice 15-Sec, 60-Sec, and 2-Min Pitch',
    completed: false,
    lastUpdated: new Date().toISOString()
  },
    {
    id: '10',
    title: 'Review advantages, objections, value and common questions',
    completed: false,
    lastUpdated: new Date().toISOString()
  },
  { id: '11', title: '10 Minute MathToGo', completed: false, lastUpdated: new Date().toISOString() },
  { id: '12', title: 'Review economic metrics dashboard', completed: false, lastUpdated: new Date().toISOString() },
  { id: '13', title: 'Read WSJ, Economist, TheWeek', completed: false, lastUpdated: new Date().toISOString() },
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