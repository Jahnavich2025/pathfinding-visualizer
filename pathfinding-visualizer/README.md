# ◈ PathFinder — Algorithm Visualizer

An interactive, visually polished pathfinding algorithm visualizer built with **React**. Watch classic graph algorithms explore a grid and discover the shortest path in real time.

![PathFinder Demo](https://via.placeholder.com/900x400/080c16/00e5ff?text=PathFinder+%E2%80%94+Algorithm+Visualizer)

---

## ✨ Features

- **5 Algorithms** — Dijkstra, A\*, BFS, DFS, Greedy Best-First Search
- **Interactive Grid** — draw walls, weighted nodes, erase; drag start/end nodes anywhere
- **Maze Generator** — recursive-division maze with a single click
- **Speed Control** — slow / normal / fast animation speed
- **Live Stats** — nodes explored, path length, execution time
- **Algorithm Info Panel** — guarantees, weight-awareness, description for each algorithm
- **Dark, polished UI** — Syne + Space Mono typefaces, electric-cyan accent, glowing nodes

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 16
- npm ≥ 8

### Installation

```bash
git clone https://github.com/your-username/pathfinding-visualizer.git
cd pathfinding-visualizer
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

The optimized bundle is output to `/build`.

---

## 🗺️ Usage

| Action | How |
|---|---|
| Draw wall | Click / click-drag on empty cells |
| Draw weight (×5 cost) | Switch to **Weight** mode, then click/drag |
| Erase | Switch to **Erase** mode, then click/drag |
| Move start/end | Click-drag the ▶ or ◆ node |
| Generate maze | Click **Maze** |
| Run algorithm | Click **Visualize!** |
| Clear path only | Click **Clear Path** (keeps walls) |
| Full reset | Click **Reset** |
| Algorithm info | Click the **?** button |

---

## 🧠 Algorithms

| Algorithm | Shortest Path? | Weighted? |
|---|---|---|
| **Dijkstra** | ✅ Yes | ✅ Yes |
| **A\* Search** | ✅ Yes | ✅ Yes |
| **BFS** | ✅ Yes (unweighted) | ❌ No |
| **DFS** | ❌ No | ❌ No |
| **Greedy BFS** | ❌ No | ❌ No |

### Dijkstra's Algorithm
Explores nodes in order of cumulative distance from the source. Respects weighted nodes. **Guarantees** the shortest path.

### A\* Search
Combines Dijkstra's distance cost with a Manhattan-distance heuristic to guide exploration toward the target. Faster than Dijkstra in practice while still **guaranteeing** the shortest path.

### Breadth-First Search (BFS)
Explores the grid layer by layer. **Guarantees** the shortest path on **unweighted** grids. Ignores node weights.

### Depth-First Search (DFS)
Dives as deep as possible before backtracking. Very memory-efficient but **does not guarantee** the shortest path.

### Greedy Best-First Search
Always expands the node that appears closest to the target using only the heuristic. Extremely fast but **does not guarantee** the shortest path.

---

## 📁 Project Structure

```
pathfinding-visualizer/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── algorithms/
│   │   ├── index.js        # barrel + metadata
│   │   ├── dijkstra.js
│   │   ├── astar.js
│   │   ├── bfs.js
│   │   ├── dfs.js
│   │   └── greedy.js
│   ├── components/
│   │   ├── Grid.jsx / Grid.css
│   │   ├── Node.jsx / Node.css
│   │   ├── Navbar.jsx / Navbar.css
│   │   └── Legend.jsx / Legend.css
│   ├── hooks/
│   │   └── usePathfinder.js   # all state & animation logic
│   ├── utils/
│   │   └── nodeUtils.js       # grid helpers, maze generator
│   ├── App.jsx
│   ├── App.css                # design tokens + global styles
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

- **React 18** (functional components, hooks)
- **Create React App** (zero-config toolchain)
- **CSS custom properties** (design tokens)
- **Google Fonts** — Syne, Space Mono

No external UI libraries or algorithm packages — every algorithm and animation is hand-crafted.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/new-algorithm`
3. Commit your changes: `git commit -m 'feat: add Bidirectional BFS'`
4. Push to the branch: `git push origin feature/new-algorithm`
5. Open a Pull Request

---

## 📄 License

MIT © 2024 — see [LICENSE](LICENSE) for details.

---

<div align="center">Built with ◈ and a lot of graph theory</div>
