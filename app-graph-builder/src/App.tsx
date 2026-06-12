import { useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { TopBar } from '@/components/layout/TopBar';
import { LeftRail } from '@/components/layout/LeftRail';
import { RightPanel } from '@/components/layout/RightPanel';
import { AppCanvas } from '@/components/canvas/AppCanvas';
import { FloatingAppSelector } from '@/components/layout/FloatingAppSelector';
import { useAppStore } from '@/store/useAppStore';
import { ThemeProvider } from '@/context/ThemeContext';

export default function App() {
  const { isMobilePanelOpen, setIsMobilePanelOpen } = useAppStore();

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) return;

      // Shift+F → Fit View
      if (e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('fit-view'));
      }
      // Ctrl/Cmd+B → Toggle mobile panel
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsMobilePanelOpen(!isMobilePanelOpen);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isMobilePanelOpen, setIsMobilePanelOpen]);

  return (
    <ThemeProvider>
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-[#111111] text-gray-900 dark:text-white transition-colors duration-200">
        <ReactFlowProvider>
          <TopBar />
          <div className="flex flex-1 overflow-hidden">
            <LeftRail />
            <main className="flex-1 relative overflow-hidden">
              <FloatingAppSelector />
              <AppCanvas />
            </main>
            {/* We will hide RightPanel in desktop as requested by moving app selector, 
                but NodeInspector still needs a place. For now, it will be in the right panel. */}
            <RightPanel />
          </div>
        </ReactFlowProvider>
      </div>
    </ThemeProvider>
  );
}
