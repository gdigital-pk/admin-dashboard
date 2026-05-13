"use client";

import { DeleteModal } from "@/components/DeleteModal";
import { useCallback, useEffect, useState } from "react";
import { EditUserModal } from "@/components/EditUserModal";
import { UpdatePassword } from "@/components/UpdatePassword";

type User = {
  _id: string;
  fullName: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: string;
  updatedAt: string;
};

const roleBadge: Record<User["role"], string> = {
  admin:
    "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200",
  editor:
    "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-200",
  viewer:
    "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200",
};

function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-3 p-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="h-12 flex-1 rounded-xl bg-slate-200/90 dark:bg-slate-700/60" />
          <div className="h-12 w-52 rounded-xl bg-slate-200/90 dark:bg-slate-700/60" />
          <div className="h-12 w-28 rounded-xl bg-slate-200/90 dark:bg-slate-700/60" />
          <div className="h-12 w-36 rounded-xl bg-slate-200/90 dark:bg-slate-700/60" />
        </div>
      ))}
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [passwordUser, setPasswordUser] = useState<User | null>(null);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const formatDateTime = (date: string) => {
    const d = new Date(date);

    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      if (res.ok) setUsers(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const flash = (text: string, ok: boolean) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const openEdit = (user: User) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget._id);
    const res = await fetch(`/api/users/${deleteTarget._id}`, {
      method: "DELETE",
    });
    setDeletingId(null);
    setDeleteTarget(null);

    if (res.ok) {
      flash("User deleted.", true);
      fetchUsers();
    } else {
      flash("Could not delete user.", false);
    }
  };
  const isDeleting = (id: string) => deletingId === id;

  return (
    <>
      <section className="mx-auto max-w-6xl space-y-8">
        <div className="relative overflow-hidden rounded-2xl border border-indigo-100/90 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6 shadow-sm dark:border-indigo-900/50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900 sm:p-8">
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Team
              </p>
              <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                Users
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Review and manage all system users.
              </p>
            </div>

            <div className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold shadow-sm ring-1 ring-slate-200 dark:bg-slate-800/90 dark:text-slate-100 dark:ring-slate-600">
              {loading ? "…" : `${users.length} users`}
            </div>
          </div>
        </div>

        {toast && (
          <div className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium ${toast.ok
            ? "border-emerald-200 bg-emerald-50 text-emerald-900"
            : "border-rose-200 bg-rose-50 text-rose-900"}`}>
            {toast.text}
            <button onClick={() => setToast(null)} className="text-xs opacity-70">
              Dismiss
            </button>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900/40">
          {loading ? (
            <TableSkeleton />
          ) : users.length === 0 ? (
            <div className="py-16 text-center text-slate-600 dark:text-slate-400">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/70">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Created</th>
                    <th className="px-5 py-4">Updated</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40 text-center" >
                      <td className="px-5 py-4 font-medium">{user.fullName}</td>

                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {user.email}
                      </td>

                      <td className="px-5 py-4">
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${roleBadge[user.role]}`} >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {formatDateTime(user.createdAt)}
                      </td>

                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {formatDateTime(user.updatedAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit(user)} className="rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700">
                            Update
                          </button>
                          <button onClick={() => { setPasswordUser(user); setPasswordOpen(true); }} className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700">
                            Password
                          </button>

                          <button onClick={() => setDeleteTarget(user)} disabled={isDeleting(user._id)} className="rounded-lg border border-rose-200 bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50" >
                            {isDeleting(user._id) ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </section>
      <EditUserModal user={editUser} open={modalOpen} onClose={() => { setModalOpen(false); setEditUser(null); }} onSaved={() => { flash("User updated.", true); fetchUsers(); }} />
      <UpdatePassword user={passwordUser} open={passwordOpen} onClose={() => { setPasswordOpen(false); setPasswordUser(null); }} onUpdated={() => { flash("Password updated successfully", true); }} />
      <DeleteModal user={deleteTarget} loading={deletingId === deleteTarget?._id} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </>
  );
}