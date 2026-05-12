"use client";

import { useEffect, useState } from "react";
import type { SignupFormFieldKey, SignupFormValues } from "@/components/SignupFormFields";
import { SignupFormFields } from "@/components/SignupFormFields";

type UserRow = {
  _id: string;
  fullName: string;
  email: string;
  role: "admin" | "editor" | "viewer";
};

type EditUserModalProps = {
  user: UserRow | null;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

function EditUserModalContent({
  user,
  onClose,
  onSaved,
}: {
  user: UserRow;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<SignupFormValues>(() => ({
    fullName: user.fullName,
    email: user.email,
    password: "",
    role: user.role,
  }));
  const [errors, setErrors] = useState<Partial<Record<SignupFormFieldKey, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const validate = (): boolean => {
    const next: Partial<Record<SignupFormFieldKey, string>> = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    if (!values.role) next.role = "Role is required.";
    if (values.password && values.password.length > 0 && values.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field: SignupFormFieldKey, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setFormError("");

    const payload: Record<string, string> = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      role: values.role,
    };
    if (values.password.trim()) {
      payload.password = values.password;
    }

    const res = await fetch(`/api/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as { message?: string };

    setSubmitting(false);

    if (!res.ok) {
      setFormError(data.message || "Could not update user.");
      return;
    }

    onSaved();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-user-title"
      className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 id="edit-user-title" className="text-xl font-bold text-slate-900 dark:text-white">
            Edit user
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
        <SignupFormFields
          idPrefix="edit-user"
          values={values}
          errors={errors}
          onChange={handleChange}
          passwordMode="optionalNewPassword"
          showPassword={false}
          rolePlaceholder={false}
          disabled={submitting}
        />

        {formError && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-200">
            {formError}
          </p>
        )}

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function EditUserModal({ user, open, onClose, onSaved }: EditUserModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <EditUserModalContent key={user._id} user={user} onClose={onClose} onSaved={onSaved} />
    </div>
  );
}
