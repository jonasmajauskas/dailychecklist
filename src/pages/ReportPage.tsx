import React, { useEffect, useState } from 'react';
import { TimeFilter } from '../components/TimeFilter';
import { ChecklistItem, CheckEvent, TimeFrame } from '../types';
import { getChecklistItems, getCheckEvents } from '../utils/storage';
import { filterEventsByTimeFrame } from '../utils/date';
export function ReportPage() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('week');
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [events, setEvents] = useState<CheckEvent[]>([]);
  useEffect(() => {
    setItems(getChecklistItems());
    setEvents(getCheckEvents());
  }, []);
  const filteredEvents = filterEventsByTimeFrame(events, timeFrame);
  // Calculate stats for each item
  const itemStats = items.map(item => {
    const itemEvents = filteredEvents.filter(event => event.itemId === item.id);
    const completedCount = itemEvents.filter(event => event.checked).length;
    const incompleteCount = itemEvents.filter(event => !event.checked).length;
    const totalEvents = completedCount + incompleteCount;
    const completionPercentage = totalEvents > 0 ? Math.round(completedCount / totalEvents * 100) : 0;
    return {
      ...item,
      completedCount,
      incompleteCount,
      totalEvents,
      completionPercentage
    };
  });
  // Overall stats
  const totalEvents = filteredEvents.length;
  const totalCompleted = filteredEvents.filter(event => event.checked).length;
  const completionRate = totalEvents > 0 ? Math.round(totalCompleted / totalEvents * 100) : 0;
  return <div>
      <h2 className="text-2xl font-bold mb-6">Activity Report</h2>
      <TimeFilter timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Total Activities
          </h3>
          <p className="text-3xl font-bold">{totalEvents}</p>
        </div>
        <div className="bg-card p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Completed
          </h3>
          <p className="text-3xl font-bold">{totalCompleted}</p>
        </div>
        <div className="bg-card p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Completion Rate
          </h3>
          <p className="text-3xl font-bold">{completionRate}%</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-4">Item Performance</h3>
      {itemStats.length === 0 ? <div className="text-center py-8 text-muted-foreground">
          No data available for the selected time period.
        </div> : <div className="space-y-4">
          {itemStats.map(item => <div key={item.id} className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{item.title}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Events</p>
                  <p className="font-semibold">{item.totalEvents}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Completion</p>
                  <p className="font-semibold">{item.completionPercentage}%</p>
                </div>
              </div>
              {item.totalEvents > 0 && <div className="mt-3">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{
              width: `${item.completionPercentage}%`
            }}></div>
                  </div>
                </div>}
            </div>)}
        </div>}
    </div>;
}