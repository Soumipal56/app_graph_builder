import { GitBranch, Zap, Database, Boxes, Network } from 'lucide-react';

export function LeftRail() {
  return (
    <aside className="w-16 shrink-0 bg-white dark:bg-[#000000] border-r border-gray-200 dark:border-white/5 flex flex-col items-center py-4 gap-8 transition-colors duration-200">
      
      {/* Top Logo - The white square with black icon */}
      <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center shadow-md mb-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-white dark:stroke-black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </div>

      {/* Top icons */}
      <div className="flex flex-col gap-6 w-full items-center">
        <button className="p-2 text-white hover:bg-white/10 rounded-md transition-colors">
          <GitBranch className="h-5 w-5" />
        </button>
        <button className="p-2 text-blue-400 hover:bg-white/10 rounded-md transition-colors">
          <Zap className="h-5 w-5" />
        </button>
        <button className="p-2 text-red-500 hover:bg-white/10 rounded-md transition-colors">
          <Database className="h-5 w-5" />
        </button>
        <button className="p-2 text-emerald-400 hover:bg-white/10 rounded-md transition-colors">
          <Boxes className="h-5 w-5" />
        </button>
        <button className="p-2 text-amber-500 hover:bg-white/10 rounded-md transition-colors">
          <Network className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom icons */}
      <div className="mt-auto pb-4 flex flex-col gap-6 w-full items-center">
        <button className="p-2 text-teal-400 hover:bg-white/10 rounded-md transition-colors">
          <Network className="h-5 w-5" />
        </button>
        <button className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-tr from-purple-500 to-pink-500 hover:ring-2 hover:ring-white transition-all mx-auto shadow-lg shadow-purple-500/20">
        </button>
      </div>
    </aside>
  );
}
