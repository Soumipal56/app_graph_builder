<div align="center">
  <h1>🌌 App Graph Builder</h1>
  <p>A responsive, interactive service architecture graph builder with a premium aesthetic.</p>

  [![React](https://img.shields.io/badge/React-18.x-blue.svg?style=flat-square&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![ReactFlow](https://img.shields.io/badge/ReactFlow-11.x-FF0072.svg?style=flat-square)](https://reactflow.dev/)
  [![Zustand](https://img.shields.io/badge/Zustand-State-black.svg?style=flat-square)](https://zustand-demo.pmnd.rs/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

  <br />
  <h3>
    <a href="https://app-graph-builder-ochre.vercel.app">View Live Demo</a>
  </h3>
</div>

---

## 🌟 Overview

**App Graph Builder** is an interactive canvas application that allows users to visualize, select, and configure complex microservice architectures. Built with a modern tech stack, it demonstrates complex UI composition, mock API integrations, global state management, and a seamless light/dark mode aesthetic.

![App Screenshot Placeholder](https://via.placeholder.com/1000x500.png?text=App+Graph+Builder+Screenshot)

## ✨ Features

- **Interactive Canvas**: Drag, drop, select, zoom, pan, and delete nodes using ReactFlow (`@xyflow/react`).
- **Detailed Node UI**: Custom service nodes displaying real-time mocked metrics (CPU, Memory, Disk) and synced capacity sliders.
- **Node Inspector**: Slide-out (mobile) or anchored (desktop) right panel that allows editing of node properties, environment configurations, and auto-scaling rules.
- **Semantic Search**: Intelligently filter applications in the floating selector using terminology logic.
- **Mocked Data Fetching**: Utilizes TanStack Query and Mock Service Worker (MSW) to simulate realistic API latency, data retrieval, and error states.
- **Global Theme Toggle**: Clean architectural separation using the React Context API to manage Light/Dark modes seamlessly.
- **Responsive Layout**: Desktop-first layout with a collapsing side-drawer for smaller viewports.

---

## 🚀 Quick Start

### Prerequisites
Make sure you are running **Node.js (v18+ recommended)**.

### 1. Clone & Install
```bash
git clone https://github.com/your-username/app-graph-builder.git
cd app-graph-builder
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will boot up at `http://localhost:5173`. 
*(Note: MSW is enabled in both Dev and Prod to provide the mock APIs without a real backend).*

### 3. Build & Typecheck
```bash
# Check for linting errors
npm run lint

# Check for TypeScript strict errors
npm run typecheck

# Build the production bundle
npm run build
```

---

## 🧠 Architectural Decisions

1. **State Management Separation**: 
   - **ReactFlow** handles its own internal graph state (`useNodesState`, `useEdgesState`), keeping our global store extremely lean and avoiding unnecessary re-renders.
   - **Zustand** is specifically reserved for core UI state (`selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`).
   - **Context API** manages the global `theme` to ensure presentation layer logic remains decoupled from the functional UI store.

2. **Mock Service Worker (MSW)**:
   - Instead of simply wrapping Promises in `setTimeout`, MSW was chosen to provide realistic network interception. This accurately triggers TanStack Query's loading states, refetches, and makes it incredibly easy to swap out the mock layer for a real API later.

3. **Custom Service Node Component**:
   - The ReactFlow `Node` was entirely custom-built to match a specific premium aesthetic. It heavily leverages Tailwind CSS for complex UI gradients and layout composition directly inside the canvas graph.

---

## ⚠️ Known Limitations

- **Mock Data Persistence**: Because the mock data is hardcoded in the MSW interceptors and the app is heavily client-side, hard-refreshing the browser will reset the node positions and states to their initial mock payload.
- **Edge Routing Logic**: Edges are currently simple Bezier curves. If many nodes are added, edges might overlap and become visually cluttered.
- **Save Functionality**: Changes made in the Node Inspector (like Capacity changes) update the local ReactFlow state in real-time, but there is no `POST` or `PUT` endpoint currently wired up to definitively "save" the graph architecture back to the server.

---

<div align="center">
  <i>Built with ❤️ using React & Tailwind.</i>
</div>
