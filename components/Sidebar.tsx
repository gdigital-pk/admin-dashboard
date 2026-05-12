import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/users", label: "Users" },
  { href: "/weather", label: "Weather" },
  { href: "/currency", label: "Currency" },
];

export function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 lg:min-h-screen lg:w-64 lg:border-r lg:border-b-0">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Admin Panel</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-6">
        <LogoutButton />
      </div>
    </aside>
  );
}
