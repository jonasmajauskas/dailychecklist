import React from 'react';
import { Outlet } from 'react-router-dom';
export function Layout() {
  return <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
    </div>;
}