import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { CheckSquare, BarChart } from 'lucide-react';
export function Layout() {
  const location = useLocation();
  return <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
      <nav className="border-t bg-background fixed bottom-0 w-full">
        <div className="container">
          <div className="flex justify-center">
            <Link to="/" className={`flex flex-col items-center p-4 ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              <CheckSquare className="h-6 w-6 mb-1" />
              <span className="text-xs">Checklist</span>
            </Link>
            <Link to="/report" className={`flex flex-col items-center p-4 ${location.pathname === '/report' ? 'text-primary' : 'text-muted-foreground'}`}>
              <BarChart className="h-6 w-6 mb-1" />
              <span className="text-xs">Reports</span>
            </Link>
          </div>
        </div>
      </nav>
      {/* Add padding to account for fixed nav */}
      <div className="h-20"></div>
    </div>;
}