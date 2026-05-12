"use client";

import { CircleAlert, X } from "lucide-react";

type User = {
    _id: string;
    fullName: string;
    email: string;
    role: "admin" | "editor" | "viewer";
};

type Props = {
    user: User | null;
    loading: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export function DeleteModal({
    user,
    loading,
    onClose,
    onConfirm,
}: Props) {
    if (!user) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity px-4">

            <div className="relative w-full max-w-md rounded-2xl bg-slate-50 p-8 shadow-xl dark:bg-slate-900">
                <button onClick={onClose} className="absolute right-4 top-2 rounded-full p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800">
                    <X size={18} />
                </button>

                <div className="relative w-full max-w-md rounded-2xl bg-white p-6">
                    <div className="flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/40">
                            <CircleAlert size={26} />
                        </div>
                    </div>

                    <h2 className="mt-4 text-center text-lg font-semibold text-slate-900 dark:text-white">
                        Are you sure?
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
                        Are you sure you want to delete this record?
                    </p>

                    <div className="mt-6 flex gap-3">
                        <button onClick={onClose} className="flex-1 rounded-lg border border-slate-200 bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                            Cancel
                        </button>

                        <button onClick={onConfirm} disabled={loading} className="flex-1 rounded-lg bg-rose-600 py-2 text-sm font-semibold text-white hover:bg-rose-700">
                            {loading ? "Deleting..." : "Delete"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}