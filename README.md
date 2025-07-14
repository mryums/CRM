# Mini CRM Application

A lightweight, mobile-responsive **Customer Relationship Management (CRM)** web app built with **React + Tailwind CSS + Zustand**. It allows users to manage clients, leads, tasks, and notes with a simple and modern UI.

---

## ✨ Features

- 🧑‍💼 **Client Management** — Add, view, and manage client profiles.
- 🧠 **Notes System** — Store and delete notes per client.
- ✅ **Task Manager** — Add, complete, and delete global tasks.
- 📥 **Leads Kanban Board** — Drag-and-drop leads between stages.
- 🌙 **Dark Mode** — Toggle light/dark theme.
- 📱 **Mobile-Friendly UI** — Sidebar opens with swipe gesture on mobile.
- 💾 **Persistent Data** — Uses localStorage to save your data.

---

## 🛠️ Tech Stack

- **React (Vite)**
- **Tailwind CSS**
- **Zustand** (Global state management)
- **React Router DOM**
- **react-beautiful-dnd** (for Kanban)
- **react-hot-toast** (for alerts & feedback)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/mryums/CRM
cd mini-crm
```
2. Install Dependencies
npm install

4. Start Development Server
npm run dev

src/
├── app/                # App pages (clients, tasks, leads)
├── components/         # UI components (sidebar, modals, toggle, etc.)
├── store/              # Zustand state stores
├── data/               # Dummy client data
├── App.jsx             # Main layout and routing
├── index.css           # Tailwind setup


Built with ❤️ by MARYAM
