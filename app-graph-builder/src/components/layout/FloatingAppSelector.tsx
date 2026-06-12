import { useState } from 'react';
import { Search, Plus, AlertCircle, ChevronRight } from 'lucide-react';
import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/useAppStore';
import type { App } from '@/types';

export function FloatingAppSelector() {
  const { data: apps, isLoading, error } = useApps();
  const { selectedAppId, setSelectedAppId } = useAppStore();
  const [search, setSearch] = useState('');

  const filteredApps = apps?.filter(app => {
    const s = search.toLowerCase();
    // Simulate "semantic" search by checking descriptions/tags (if we had them) or simple keywords
    const keywords = app.name.toLowerCase().split('-').concat(['api', 'service', 'frontend', 'backend', 'web', 'worker', 'db', 'database']);
    return app.name.toLowerCase().includes(s) || keywords.some(k => k.includes(s));
  }) || [];

  if (isLoading) return null;

  return (
    <div className="absolute top-6 left-6 z-50 w-[300px] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-white/5">
        <h2 className="text-gray-900 dark:text-white font-semibold text-sm mb-3">Application</h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input 
              type="text" 
              placeholder="Semantic Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-md py-1.5 pl-8 pr-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-md transition-colors shrink-0">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-2 max-h-[300px] overflow-y-auto">
        {error && (
          <div className="p-2 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" /> Failed to load apps
          </div>
        )}
        
        {filteredApps.map((app: App, idx) => {
          const colors = ['bg-blue-500', 'bg-purple-500', 'bg-red-500', 'bg-pink-500'];
          const colorClass = colors[idx % colors.length];
          
          return (
            <button
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors group ${
                selectedAppId === app.id ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-[10px] ${colorClass}`}>
                   {app.name.substring(0, 1).toUpperCase()}
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{app.name}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-gray-400" />
            </button>
          )
        })}
        {filteredApps.length === 0 && !error && (
          <div className="p-4 text-center text-xs text-gray-500">No apps found.</div>
        )}
      </div>
    </div>
  );
}
