import { Zap, Maximize2, AlertTriangle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { useQueryClient } from '@tanstack/react-query';

export function TopBar() {
  const {
    isMobilePanelOpen,
    setIsMobilePanelOpen,
    simulateError,
    toggleSimulateError,
    selectedAppId,
  } = useAppStore();
  const queryClient = useQueryClient();

  const handleToggleError = () => {
    toggleSimulateError();
    // Immediately re-fetch current graph with new error state
    if (selectedAppId) {
      queryClient.invalidateQueries({ queryKey: ['graph', selectedAppId] });
    }
  };

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 shrink-0 z-20">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-md bg-primary/10">
          <Zap className="h-5 w-5 text-primary" />
        </div>
        <span className="font-semibold text-base tracking-tight">App Graph Builder</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          id="toggle-error-btn"
          variant={simulateError ? 'destructive' : 'outline'}
          size="sm"
          className="gap-1.5 hidden sm:flex"
          onClick={handleToggleError}
          title="Toggle simulated network error on graph API"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          {simulateError ? 'Error ON' : 'Simulate Error'}
        </Button>

        <Button
          id="fit-view-btn"
          variant="outline"
          size="sm"
          className="gap-1.5 hidden sm:flex"
          onClick={() => window.dispatchEvent(new CustomEvent('fit-view'))}
          title="Fit graph to view (Shift+F)"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          Fit View
        </Button>

        {/* Mobile panel toggle */}
        <Button
          id="mobile-panel-btn"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
          aria-label="Open panel"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
