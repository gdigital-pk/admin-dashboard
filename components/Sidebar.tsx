"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoutButton } from "@/components/LogoutButton";
import { Menu as MenuIcon, X as XIcon, LayoutDashboard, Users, CloudSun, DollarSign } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
  { href: "/users", label: "Users", icon: <Users className="w-4 h-4 mr-2" /> },
  { href: "/weather", label: "Weather", icon: <CloudSun className="w-4 h-4 mr-2" /> },
  { href: "/currency", label: "Currency", icon: <DollarSign className="w-4 h-4 mr-2" /> },
];

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 lg:min-h-screen lg:w-64 lg:border-r lg:border-b-0 flex flex-col">
      <div className="flex items-center justify-between mb-4 lg:mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Admin Panel</h2>
        <button className="text-slate-900 lg:hidden focus:outline-none" aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)} >
          {menuOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>
      <nav className={`space-y-2 ${menuOpen ? "block" : "hidden"} lg:block`} >
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-600 hover:text-white" onClick={() => setMenuOpen(false)} >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
      <div className={`mt-6 ${menuOpen ? "block" : "hidden"} lg:block`}>
        <LogoutButton />
      </div>
    </aside>
  );
}
