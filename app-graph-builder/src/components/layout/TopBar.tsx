import { Moon, Sun, Share2, Menu } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useTheme } from '@/context/ThemeContext';

export function TopBar() {
  const { isMobilePanelOpen, setIsMobilePanelOpen } = useAppStore();
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-14 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] flex items-center justify-between px-4 shrink-0 transition-colors duration-200">
      <div className="flex items-center gap-3">
        {/* Intentionally left blank to make room for LeftRail logo alignment, 
            or place breadcrumbs here if needed */}
      </div>

      <div className="flex items-center gap-2">
        <button className="h-9 w-9 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors">
          <Share2 className="h-4 w-4" />
        </button>
        <div className="flex items-center bg-black/10 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-0.5 ml-2">
          <button 
            onClick={() => setTheme('dark')}
            className={`p-1.5 rounded-md transition-colors shadow-sm ${theme === 'dark' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-black'}`}
          >
            <Moon className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setTheme('light')}
            className={`p-1.5 rounded-md transition-colors shadow-sm ${theme === 'light' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <Sun className="h-4 w-4" />
          </button>
        </div>
        <button className="ml-2 w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-cyan-500 to-blue-500 ring-2 ring-transparent hover:ring-white/50 transition-all">
           {/* Avatar placeholder */}
        </button>
        {/* Mobile menu toggle */}
        <button
          className="md:hidden ml-2 h-9 w-9 flex items-center justify-center text-white bg-white/10 rounded-md"
          onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
          aria-label="Open panel"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
