import { create } from 'zustand';

interface AppStore {
  // Required by spec
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: string;
  // Extra: needed for error simulation requirement
  simulateError: boolean;

  setSelectedAppId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  setIsMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: string) => void;
  toggleSimulateError: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  simulateError: false,

  setSelectedAppId: (id) => set({ selectedAppId: id, selectedNodeId: null }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setIsMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  toggleSimulateError: () => set((s) => ({ simulateError: !s.simulateError })),
}));
