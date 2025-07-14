import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/themeStore";

import ClientsPage from "./pages/ClientPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import LeadsPage from "./pages/LeadsPage";
import TasksPage from "./pages/TasksPage";
import ThemeToggle from "./components/ThemeToggle";

import './App.css';

export default function App() {
  const { theme } = useThemeStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const touchStartX = useRef(null);

  // Handle swipe from left to open drawer
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.touches[0].clientX;
    const diff = touchEndX - touchStartX.current;

    // Swipe right from left edge to open
    if (touchStartX.current < 40 && diff > 60) {
      setIsDrawerOpen(true);
      touchStartX.current = null;
    }
  };

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className="flex min-h-screen transition-colors"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 h-screen bg-white dark:bg-gray-800 border-r border-border-color p-6 sticky top-0 flex-col">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-blue-700 dark:text-blue-300 border-b border-border-color pb-2">
          CRM Dashboard</h1>
        <nav className="flex flex-col gap-4 mb-6">
          <Link to="/" className="text-text-light hover:text-primary font-medium transition-colors">Clients</Link>
          <Link to="/leads" className="text-text-light hover:text-primary font-medium transition-colors">Leads</Link>
          <Link to="/tasks" className="text-text-light hover:text-primary font-medium transition-colors">Tasks</Link>
        </nav>
        <ThemeToggle />
      </aside>

      {/* Mobile swipe drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white dark:bg-gray-800 border-r border-border-color p-6 flex flex-col shadow-xl">
            <button onClick={handleCloseDrawer} className="self-end text-sm text-text-light mb-6">Close ✕</button>
            <h1 className="text-2xl font-bold mb-6 text-primary dark:text-white">CRM</h1>
            <nav className="flex flex-col gap-4 mb-6">
              <Link to="/" onClick={handleCloseDrawer} className="text-text-light hover:text-primary font-medium transition-colors">Clients</Link>
              <Link to="/leads" onClick={handleCloseDrawer} className="text-text-light hover:text-primary font-medium transition-colors">Leads</Link>
              <Link to="/tasks" onClick={handleCloseDrawer} className="text-text-light hover:text-primary font-medium transition-colors">Tasks</Link>
            </nav>
            <ThemeToggle />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-40"
            onClick={handleCloseDrawer}
          />
        </div>
      )}
      {/* Swipe indicator on left edge for mobile */}
        <div
        className="fixed top-0 left-0 z-20 w-2 h-full bg-primary opacity-80 rounded-r-md md:hidden animate-pulse"
        title="Swipe from edge to open menu"
        />

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <Routes>
          <Route path="/" element={<ClientsPage />} />
          <Route path="/client/:id" element={<ClientDetailPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </main>

      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#1f2937",
            border: "1px solid #e5e7eb",
          },
        }}
      />
    </div>
  );
}
