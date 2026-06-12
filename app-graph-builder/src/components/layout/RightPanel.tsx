import { Loader2, AlertCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/useAppStore';
import { NodeInspector } from '@/components/inspector/NodeInspector';
import type { App } from '@/types';

// ── App Selector list ──────────────────────────────────────────────
function AppList() {
  const { data: apps, isLoading, error } = useApps();
  const { selectedAppId, setSelectedAppId, setIsMobilePanelOpen } = useAppStore();

  const handleSelect = (id: string) => {
    setSelectedAppId(id);
    setIsMobilePanelOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-3 flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
        <AlertCircle className="h-4 w-4 shrink-0" />
        Failed to load apps.
      </div>
    );
  }

  return (
    <div className="p-2 flex flex-col gap-0.5">
      {apps?.map((app: App) => (
        <button
          key={app.id}
          id={`app-${app.id}`}
          onClick={() => handleSelect(app.id)}
          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
            selectedAppId === app.id
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-foreground hover:bg-muted'
          }`}
        >
          {app.name}
        </button>
      ))}
    </div>
  );
}

// ── Panel content ──────────────────────────────────────────────────
function PanelContent() {
  const { selectedNodeId } = useAppStore();

  return (
    <div className="flex flex-col h-full bg-background border-l">
      {/* Apps section */}
      <div className="shrink-0">
        <div className="px-4 pt-4 pb-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Applications
          </h2>
        </div>
        <AppList />
      </div>

      <div className="h-px bg-border mx-0 shrink-0" />

      {/* Node Inspector section */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {selectedNodeId ? (
          <NodeInspector />
        ) : (
          <div className="flex items-center justify-center h-full p-6 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Click a node on the canvas to inspect its properties.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── RightPanel (desktop sidebar + mobile drawer) ───────────────────
export function RightPanel() {
  const { isMobilePanelOpen, setIsMobilePanelOpen } = useAppStore();

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block w-72 shrink-0 h-full">
        <PanelContent />
      </aside>

      {/* Mobile slide-over drawer */}
      <Sheet open={isMobilePanelOpen} onOpenChange={setIsMobilePanelOpen}>
        <SheetContent side="right" className="p-0 w-80" aria-describedby={undefined}>
          <SheetTitle className="sr-only">App Panel</SheetTitle>
          <PanelContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
