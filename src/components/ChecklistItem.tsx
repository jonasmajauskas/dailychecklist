import React, { useState } from 'react';
import { CheckSquare, Square, ChevronDown, ChevronUp } from 'lucide-react';
import { ChecklistItem as ChecklistItemType } from '../types';
import { formatDate } from '../utils/date';
interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
}
export function ChecklistItem({
  item,
  onToggle
}: ChecklistItemProps) {
  const [expanded, setExpanded] = useState(false);
  return <div className={`p-4 border rounded-lg mb-3 transition-colors ${item.completed ? 'bg-muted/50' : 'bg-background'}`}>
      <div className="flex items-start">
        <button onClick={() => onToggle(item.id)} className="mr-3 mt-0.5 focus:outline-none focus:ring-2 focus:ring-primary rounded" aria-checked={item.completed} role="checkbox">
          {item.completed ? <CheckSquare className="h-6 w-6 text-primary" /> : <Square className="h-6 w-6 text-muted-foreground" />}
        </button>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
              {item.title}
            </h3>
            {item.details && <button onClick={() => setExpanded(!expanded)} className="ml-2 p-1 text-muted-foreground hover:text-foreground focus:outline-none" aria-label={expanded ? 'Collapse details' : 'Expand details'}>
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>}
          </div>
          {/* <p className="text-xs text-muted-foreground mt-1">
            Last updated: {formatDate(item.lastUpdated)}
          </p> */}
          {item.details && expanded && <div className="mt-3 p-3 bg-muted/30 rounded-md text-sm whitespace-pre-line">
              {item.details}
            </div>}
        </div>
      </div>
    </div>;
}