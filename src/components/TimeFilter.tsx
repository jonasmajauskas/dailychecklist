import React from 'react';
import { TimeFrame } from '../types';
interface TimeFilterProps {
  timeFrame: TimeFrame;
  setTimeFrame: (timeFrame: TimeFrame) => void;
}
export function TimeFilter({
  timeFrame,
  setTimeFrame
}: TimeFilterProps) {
  return <div className="flex flex-wrap gap-2 mb-6">
      <button onClick={() => setTimeFrame('week')} className={`px-3 py-1 text-sm rounded-full ${timeFrame === 'week' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
        Weekly
      </button>
      <button onClick={() => setTimeFrame('month')} className={`px-3 py-1 text-sm rounded-full ${timeFrame === 'month' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
        Monthly
      </button>
      <button onClick={() => setTimeFrame('quarter')} className={`px-3 py-1 text-sm rounded-full ${timeFrame === 'quarter' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
        Quarterly
      </button>
      <button onClick={() => setTimeFrame('year')} className={`px-3 py-1 text-sm rounded-full ${timeFrame === 'year' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
        Yearly
      </button>
    </div>;
}