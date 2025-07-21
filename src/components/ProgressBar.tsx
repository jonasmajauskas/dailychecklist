import React from 'react';
import { ChecklistItem } from '../types';
interface ProgressBarProps {
  items: ChecklistItem[];
}
export function ProgressBar({
  items
}: ProgressBarProps) {
  const total = items.length;
  const completed = items.filter(item => item.completed).length;
  const percentage = total > 0 ? Math.round(completed / total * 100) : 0;
  return <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Progress</span>
        <span className="text-sm font-medium">
          {completed}/{total} ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2.5">
        <div className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out" style={{
        width: `${percentage}%`
      }}></div>
      </div>
    </div>;
}