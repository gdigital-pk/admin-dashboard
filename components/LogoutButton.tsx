"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogoutModal } from "@/components/LogoutModal";

export function LogoutButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
      >
        Logout
      </button>

      <LogoutModal
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}