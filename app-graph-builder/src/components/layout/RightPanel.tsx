import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useAppStore } from '@/store/useAppStore';
import { NodeInspector } from '@/components/inspector/NodeInspector';

// ── Panel content ──────────────────────────────────────────────────
function PanelContent() {
  const { selectedNodeId } = useAppStore();

  if (!selectedNodeId) return null; // Don't show inspector if no node selected in new design

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0a0a0a] border-l border-gray-200 dark:border-white/10 transition-colors duration-200">
      <div className="px-4 pt-4 pb-2 border-b border-gray-200 dark:border-white/10 shrink-0">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Node Inspector
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <NodeInspector />
      </div>
    </div>
  );
}

// ── RightPanel (desktop sidebar + mobile drawer) ───────────────────
export function RightPanel() {
  const { isMobilePanelOpen, setIsMobilePanelOpen, selectedNodeId } = useAppStore();

  return (
    <>
      {/* Desktop - Only show if a node is selected, matching the floating aesthetic */}
      {selectedNodeId && (
        <aside className="hidden md:block w-80 shrink-0 h-full border-l border-white/10 bg-[#0a0a0a] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20">
          <PanelContent />
        </aside>
      )}

      {/* Mobile slide-over drawer */}
      <Sheet open={isMobilePanelOpen} onOpenChange={setIsMobilePanelOpen}>
        <SheetContent side="right" className="p-0 w-80 bg-[#0a0a0a] border-l border-white/10 text-white" aria-describedby={undefined}>
          <SheetTitle className="sr-only">Node Inspector</SheetTitle>
          <PanelContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
