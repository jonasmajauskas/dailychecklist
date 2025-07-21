import React, { useEffect, useState, Component } from 'react';
import { Plus } from 'lucide-react';
import { ChecklistItem as ChecklistItemComponent } from '../components/ChecklistItem';
import { ProgressBar } from '../components/ProgressBar';
import { ChecklistItem, CheckEvent } from '../types';
import { getChecklistItems, saveChecklistItems, saveCheckEvent } from '../utils/storage';
export function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemTitle, setNewItemTitle] = useState('');
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
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemTitle.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        title: newItemTitle.trim(),
        completed: false,
        lastUpdated: new Date().toISOString()
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      saveChecklistItems(updatedItems);
      setNewItemTitle('');
    }
  };
  return <div>
      <h2 className="text-2xl font-bold mb-6">Daily Checklist</h2>
      <ProgressBar items={items} />
      <div>
        {items.length === 0 ? <div className="text-center py-8 text-muted-foreground">
            No items yet. Add your first item below.
          </div> : items.map(item => <ChecklistItemComponent key={item.id} item={item} onToggle={handleToggle} />)}
      </div>
      <form onSubmit={handleAddItem} className="mt-6 sticky bottom-20 bg-background pt-4 pb-2 border-t">
        <div className="flex gap-2">
          <input type="text" value={newItemTitle} onChange={e => setNewItemTitle(e.target.value)} placeholder="Add a new item..." className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <button type="submit" disabled={!newItemTitle.trim()} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center disabled:opacity-50">
            <Plus className="h-5 w-5 mr-1" />
            Add
          </button>
        </div>
      </form>
    </div>;
}