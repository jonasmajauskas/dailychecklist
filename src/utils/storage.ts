import { ChecklistItem, CheckEvent } from '../types';
// Default checklist items
const defaultItems: ChecklistItem[] = [{
  id: '1',
  title: 'Stretching',
  completed: false,
  lastUpdated: new Date().toISOString()
}, {
  id: '2',
  title: '50 pushups',
  completed: false,
  lastUpdated: new Date().toISOString()
}, {
  id: '3',
  title: '100 situps',
  completed: false,
  lastUpdated: new Date().toISOString()
}, {
  id: '4',
  title: '5 Minute Breathing',
  completed: false,
  lastUpdated: new Date().toISOString()
}, {
  id: '5',
  title: 'Daily Gratitude',
  completed: false,
  lastUpdated: new Date().toISOString()
}, {
  id: '6',
  title: '10 Minute MathToGo',
  completed: false,
  lastUpdated: new Date().toISOString(),
}, {
  id: '7',
  title: 'Recite values',
  completed: false,
  lastUpdated: new Date().toISOString(),
  details: "1. Focus on what matters - Prioritize tasks that align with my goals\n2. Start small, build momentum - Begin with achievable steps\n3. Embrace discomfort - Growth happens outside the comfort zone\n4. Seek feedback - Others' perspectives help me improve\n5. Balance is essential - Work, relationships, health, and personal growth all need attention"
},
{
  id: '8',
  title: 'Recite principles',
  completed: false,
  lastUpdated: new Date().toISOString(),
  details: "1. Focus on what matters - Prioritize tasks that align with my goals\n2. Start small, build momentum - Begin with achievable steps\n3. Embrace discomfort - Growth happens outside the comfort zone\n4. Seek feedback - Others' perspectives help me improve\n5. Balance is essential - Work, relationships, health, and personal growth all need attention"
}, {
  id: '9',
  title: 'Recite SkyPointe mission statement',
  completed: false,
  lastUpdated: new Date().toISOString(),
  details: 'My mission is to live with purpose and integrity, continuously growing and learning while making a positive impact on those around me. I strive to balance achievement with well-being, to be present in each moment, and to leave every situation better than I found it. Through my actions and choices, I aim to create a meaningful legacy that inspires others to discover and fulfill their own potential.'
}, {
  id: '10',
  title: 'Review Dashboard Metrics',
  completed: false,
  lastUpdated: new Date().toISOString(),
}];
// Get checklist items from localStorage or use defaults
export const getChecklistItems = (): ChecklistItem[] => {
  const storedItems = localStorage.getItem('checklistItems');
  return storedItems ? JSON.parse(storedItems) : defaultItems;
};
// Save checklist items to localStorage
export const resetChecklistItems = (
  items: ChecklistItem[],
): ChecklistItem[] => {
  return items.map((item) => ({
    ...item,
    completed: false,
    lastUpdated: new Date().toISOString(),
  }))
}
// Save checklist items to localStorage
export const saveChecklistItems = (items: ChecklistItem[]): void => {
  localStorage.setItem('checklistItems', JSON.stringify(items))
}
// Get check events from localStorage
export const getCheckEvents = (): CheckEvent[] => {
  const storedEvents = localStorage.getItem('checkEvents')
  return storedEvents ? JSON.parse(storedEvents) : []
}
// Save a new check event
export const saveCheckEvent = (event: CheckEvent): void => {
  const events = getCheckEvents()
  events.push(event)
  localStorage.setItem('checkEvents', JSON.stringify(events))
}
