import { useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { TopBar } from '@/components/layout/TopBar';
import { LeftRail } from '@/components/layout/LeftRail';
import { RightPanel } from '@/components/layout/RightPanel';
import { AppCanvas } from '@/components/canvas/AppCanvas';
import { useAppStore } from '@/store/useAppStore';

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
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background text-foreground">
      {/*
        ReactFlowProvider wraps everything so NodeInspector (in RightPanel)
        can call useReactFlow() / useNodesData() from the same context as AppCanvas.
      */}
      <ReactFlowProvider>
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <LeftRail />
          <main className="flex-1 relative overflow-hidden">
            <AppCanvas />
          </main>
          <RightPanel />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
