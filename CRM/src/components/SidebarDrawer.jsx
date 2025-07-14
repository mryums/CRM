// components/SidebarDrawer.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

export default function SidebarDrawer({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navItems = [
    { to: "/", label: "Clients" },
    { to: "/leads", label: "Leads" },
    { to: "/tasks", label: "Tasks" },
  ];

  return (
    <>
      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 p-6 border-r border-border-color z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-xl"
        >
          <FiX />
        </button>

        <h1 className="text-2xl font-bold mb-8 text-primary">CRM</h1>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-text-light hover:text-primary transition ${
                location.pathname === item.to ? "font-bold text-primary" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <ThemeToggle />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen sticky top-0 bg-white dark:bg-gray-800 border-r border-border-color p-6">
        <h1 className="text-2xl font-bold mb-8 text-primary dark:text-white">CRM</h1>
        <nav className="flex flex-col gap-4 mb-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-text-light hover:text-primary transition ${
                location.pathname === item.to ? "font-bold text-primary" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </aside>
    </>
  );
}
