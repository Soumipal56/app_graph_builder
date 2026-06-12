# App Graph Builder

A responsive "App Graph Builder" UI that visualizes service graphs using ReactFlow, TanStack Query, and Zustand.

## 🚀 Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   *The MSW (Mock Service Worker) is automatically initialized in development mode to intercept API requests.*

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🏗️ Key Architecture Decisions

- **State Management (Zustand over Context):** Used a centralized Zustand store (`useAppStore`) for cross-component UI state (`selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`). This completely eliminates prop-drilling between the Canvas, TopBar, and RightPanel.
- **Data Fetching (TanStack Query + MSW):** Handled all server-state natively via TanStack Query (`useApps`, `useGraph`). MSW was used to mock the API endpoints (`/api/apps`) at the network layer, providing realistic simulated latency, error states, and loading skeletons without needing a real backend.
- **ReactFlow Integration:** Lifted the `<ReactFlowProvider>` to the root `<App />` component. This allows child components (like the `NodeInspector`) to access and update graph data directly using `useReactFlow()` and `useNodesData()`, maintaining predictable and performant graph state outside of the immediate canvas.
- **Routing:** Avoiding traditional React Router, the app leverages derived state in the main canvas for dynamic data loading, preventing URL-based SPA fallback collisions with the Mock Service Worker routes.
- **Styling:** Utilized Tailwind CSS v4 paired with `shadcn/ui` components for rapid, consistent, and beautiful UI development.

## ⚠️ Known Limitations

- **Mock Backend Only:** The app uses Mock Service Worker (MSW) to intercept and mock API calls. It does not communicate with a real backend. If you refresh the page heavily, Vite's cache and the MSW registration can sometimes race, requiring a hard refresh (`Ctrl + Shift + R`).
- **In-Memory Graph State:** Any changes to the graph (node capacity slider, deleting nodes) are only stored in local ReactFlow state and are not persisted across application reloads or switching between apps.
- **Static Canvas Coordinates:** The mock data provides hardcoded `x`/`y` positions for the nodes rather than implementing an auto-layout algorithm (like Dagre).
- **Mobile Experience:** While the right panel drawer is fully responsive for mobile views, complex node-dragging and zooming on small touch devices inside ReactFlow can be cramped.

---
*Built with React, Vite, TypeScript, ReactFlow, shadcn/ui, TanStack Query, and Zustand.*
