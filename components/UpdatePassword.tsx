"use client";

import { useState } from "react";
import { X } from "lucide-react";

type User = {
    _id: string;
    fullName: string;
};

type Props = {
    user: User | null;
    open: boolean;
    onClose: () => void;
    onUpdated: () => void;
};

export function UpdatePassword({
    user,
    open,
    onClose,
    onUpdated,
}: Props) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUpdate = async () => {
        setError("");

        if (!password.trim() || !confirmPassword.trim()) {
            setError("Both fields are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        const res = await fetch(`/api/users/${user?._id}/password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        });

        setLoading(false);

        if (!res.ok) {
            setError("Failed to update password");
            return;
        }

        setPassword("");
        setConfirmPassword("");
        onUpdated();
        onClose();
    };

    if (!open || !user) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity px-4 ">
            <div className="relative w-full max-w-md rounded-2xl bg-slate-50 p-8 shadow-xl dark:bg-slate-900">

                <button onClick={onClose} className="absolute right-4 top-2 rounded-full p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800">
                    <X size={18} />
                </button>

                <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Update Password
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        User: {user.fullName}
                    </p>

                    <div className="mt-4">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            New Password <span className="text-red-500">*</span>
                        </label>

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                    </div>

                    <div className="mt-4">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            Re-enter Password <span className="text-red-500">*</span>
                        </label>

                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter new password"
                            className="mt-1 w-full rounded-lg border px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                    </div>

                    {/* Error */}
                    {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

                    <div className="mt-5 flex justify-center gap-2">
                        <button onClick={onClose} className="flex-1 rounded-lg bg-rose-600 py-2 text-sm font-semibold text-white hover:bg-rose-700" >
                            Cancel
                        </button>

                        <button onClick={handleUpdate} disabled={loading} className="flex-1 rounded-lg border border-slate-200 bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700" >
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}