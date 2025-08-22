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
    title: 'Recite SkyPointe mission statement',
    completed: false,
    lastUpdated: new Date().toISOString(),
    details: `We help our clients achieve financial independence, lifestyle aspiration, and a meaningful impact. We achieve this through deep discovery, a lifelong learning and teaching, and first-class grace and hustle.`
  },
  {
    id: '9',
    title: 'Practice 15-Sec Pitch',
    completed: false,
    lastUpdated: new Date().toISOString(),
    details:
      `I’m a financial advisor at Morgan Stanley who helps [target market] with $500k–$5M in investable assets grow and protect their wealth by creating a clear financial plan, avoiding costly mistakes, and providing proven guidance — so they feel confident, secure, and in control of their financial future.We help our clients achieve financial independence, lifestyle aspiration, and a meaningful impact. We achieve this through deep discovery, a lifelong learning and teaching, and first-class grace and hustle.`
  },
  {
    id: '10',
    title: 'Practice 60-Sec Pitch',
    completed: false,
    lastUpdated: new Date().toISOString(),
    details:
      `I’m part of a group called SkyPointe, and together we have over X years of experience helping people build financial independence, create the lifestyle they want, and make an impact that matters to them.

A lot of the people I work with tell me they feel their money isn’t working as hard as they are — and I understand how frustrating that can be.

That’s why we take a hands-on approach: getting to know your goals through deep discovery, sharing proven strategies we’ve learned over decades, and putting in the work with what we call ‘first-class grace and hustle’ to grow and protect your wealth.

And while the numbers are important, what our clients really appreciate is the trust, security, and clarity they feel knowing they have a plan that adapts with them no matter how their career, the markets, or life itself changes.`
  },
  {
    id: '11',
    title: 'Practice 2-Min Pitch',
    completed: false,
    lastUpdated: new Date().toISOString(),
    details:
      `
    **Hook (Personal & Relatable):**

    Four years ago, I was in the same position as many of my clients — wondering if I was making the right moves with my money and feeling like my financial plan didn’t truly reflect the life I wanted. That experience shaped how I work with clients today — with clarity, trust, and a focus on what matters most to them.

**Problem (Their Pain Points):**

“Most people don’t fail to reach their financial goals because of lack of effort — they fall short because they don’t have a clear, disciplined plan that coordinates taxes, investments, and risk protection. Instead, their accounts are scattered, they may be working with multiple advisors, and no one is coordinating it into one strategy.

And with markets, taxes, and inflation constantly shifting, that lack of coordination can quietly drain both money and opportunity. 

**Solution (Your Process):**

That’s where I come in. I work with [target market] who have $500k–$5M in investable assets to build and maintain a plan that consistently reduces taxes, protects income, and grows wealth.

My process is proven, straightforward, and comprehensive

- **Discovery** – We dig deep into your goals, challenges, and the life you truly want.
- **Strategy** – We design a tailored plan with the right balance of growth, safety, and tax efficiency.
- **Optimization** – We make proactive adjustments as markets and life change.
- **Review** – We meet regularly to ensure your plan stays aligned and delivers results.”

**Emotional Payoff (The Real Reason They Buy):**

While the numbers matter, the real value is…

- The comfort of knowing your family’s future is secure and protected from the unexpected.
- The pride of seeing your money working for you instead of sitting idle.
- The freedom to make life decisions based on what you want — not just what you can afford.
- The advantage of saying yes to experiences today while feeling secure about tomorrow.
- Knowing your child’s education is fully funded.
- Taking a sabbatical or pursuing a passion project without sacrificing income.
- Having a plan that brings confidence instead of a pit in your stomach when markets dip.

**Close (Invite to Next Step):**

If that’s the kind of relationship and process you’d value, let’s start with a discovery meeting — no pressure, no obligation — just a clear picture of where you are, where you want to be, and the most direct path to get there.
    `
  },
  { id: '12', title: 'Review economic metrics dashboard', completed: false, lastUpdated: new Date().toISOString() },
  { id: '13', title: '10 Minute MathToGo', completed: false, lastUpdated: new Date().toISOString() },
  { id: '14', title: 'Read WSJ, Economist, TheWeek', completed: false, lastUpdated: new Date().toISOString() },
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