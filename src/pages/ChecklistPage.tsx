import React, { useEffect, useState, Component } from 'react';
import { ChecklistItem as ChecklistItemComponent } from '../components/ChecklistItem';
import { ProgressBar } from '../components/ProgressBar';
import { ChecklistItem, CheckEvent } from '../types';
import { getChecklistItems, saveChecklistItems, saveCheckEvent } from '../utils/storage';
export function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  useEffect(() => {
    setItems(getChecklistItems());
  }, []);
  const handleToggle = (id: string) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const completed = !item.completed;
        const lastUpdated = new Date().toISOString();
        // Save check event
        const checkEvent: CheckEvent = {
          itemId: id,
          timestamp: lastUpdated,
          checked: completed
        };
        saveCheckEvent(checkEvent);
        return {
          ...item,
          completed,
          lastUpdated
        };
      }
      return item;
    });
    setItems(updatedItems);
    saveChecklistItems(updatedItems);
  };
  return <div>
      <h2 className="text-2xl font-bold mb-6">Daily Checklist</h2>
      <ProgressBar items={items} />
      <div>
        {items.length === 0 ? <div className="text-center py-8 text-muted-foreground">
            No items in your checklist.
          </div> : items.map(item => <ChecklistItemComponent key={item.id} item={item} onToggle={handleToggle} />)}
      </div>
    </div>;
}