# App Graph Builder

A responsive, interactive service architecture graph builder built with React, Vite, and ReactFlow. This project demonstrates complex UI layout composition, mock API integrations, state management, and modern component architecture with a premium dark/light mode aesthetic.

## Features

- **Interactive Canvas**: Drag, drop, select, zoom, pan, and delete nodes using ReactFlow (`@xyflow/react`).
- **Detailed Node UI**: Custom service nodes displaying real-time metrics (CPU, Memory, Disk) and synced capacity sliders.
- **Node Inspector**: Slide-out (mobile) or anchored (desktop) right panel that allows editing of node properties, environment configurations, and auto-scaling rules.
- **Mocked Data Fetching**: Utilizes TanStack Query and Mock Service Worker (MSW) to simulate API latency, data retrieval, and error states.
- **Global Theme Toggle**: Clean architectural separation using the React Context API to manage light and dark modes.
- **Responsive Layout**: Desktop-first layout with a collapsing side-drawer for smaller viewports.

---

## Setup Instructions

1. **Install Dependencies**
   Make sure you are running Node.js (v18+ recommended).
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **Check Code Quality (Linting & Types)**
   ```bash
   npm run lint
   npm run typecheck
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## Key Decisions

1. **State Management Separation**: 
   - **ReactFlow** handles its own internal graph state (`useNodesState`, `useEdgesState`), keeping our global store extremely lean and avoiding unnecessary prop drilling.
   - **Zustand** is specifically reserved for UI state (`selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`).
   - **Context API** manages the global `theme` to ensure components remain decoupled from the UI store.

2. **Mock Service Worker (MSW)**:
   - Instead of simply wrapping Promises in `setTimeout`, MSW was chosen to provide realistic network interception. This accurately triggers TanStack Query's loading states, refetches, and makes it incredibly easy to swap out the mock layer for a real API later.

3. **Custom Service Node Component**:
   - The ReactFlow `Node` was entirely custom-built to match a specific premium aesthetic. It heavily leverages Tailwind CSS for complex UI gradients and layout composition directly inside the canvas graph.

---

## Known Limitations

- **Mock Data Persistence**: Because the mock data is hardcoded in the MSW interceptors and the app is heavily client-side, hard-refreshing the browser will reset the node positions and states to their initial mock payload.
- **No Edge Routing Logic**: Edges are currently simple Bezier curves. If many nodes are added, edges might overlap and become visually cluttered.
- **Save Functionality**: Changes made in the Node Inspector (like Capacity changes) update the local ReactFlow state in real-time, but there is no `POST` or `PUT` mock endpoint currently wired up to definitively "save" the graph architecture back to the server.
