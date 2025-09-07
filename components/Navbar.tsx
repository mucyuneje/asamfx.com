"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, AlertCircle, Activity } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu
  const [dialogOpen, setDialogOpen] = useState(false); // Join Now dialog
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoid SSR mismatch

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navLinks = ["Home", "Courses", "Mentorship"];

  return (
    <>
      <nav className="fixed w-full z-50 bg-background/90 backdrop-blur-md shadow-sm border-b border-border transition-colors duration-500">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
          {/* Desktop title */}
          <div className="hidden md:block text-2xl font-bold">AsamFXAcademy</div>
          {/* Mobile icon */}
          <div className="md:hidden">
            <Activity className="w-8 h-8 text-primary" />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}

            <button
              onClick={() => setDialogOpen(true)}
              className="px-4 py-2 rounded transition bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:brightness-90"
            >
              Join Now
            </button>

            <button onClick={toggleTheme} className="ml-4">
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleTheme} className="mr-4">
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
            <button onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          </div>
        </div>

        {/* Mobile Menu Animate */}
        {open && (
          <div className="md:hidden bg-background/95 border-t border-border overflow-hidden p-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-primary transition-colors"
                onClick={() => setOpen(false)} // auto-close menu
              >
                {link}
              </a>
            ))}

            <button
              onClick={() => {
                setDialogOpen(true);
                setOpen(false); // close menu when Join Now clicked
              }}
              className="px-4 py-2 rounded transition bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:brightness-90"
            >
              Join Now
            </button>
          </div>
        )}
      </nav>

      {/* Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg flex flex-col items-center text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-primary" />
            <h2 className="text-xl font-bold">Coming Soon</h2>
            <p>Stay tuned! This feature will be available shortly.</p>
            <button
              onClick={() => setDialogOpen(false)}
              className="px-4 py-2 rounded bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:brightness-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}