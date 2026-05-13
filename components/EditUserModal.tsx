"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  SignupFormFields,
  type SignupFormFieldKey,
  type SignupFormValues,
} from "@/components/SignupFormFields";

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
  const [values, setValues] = useState<SignupFormValues>({
    fullName: user.fullName,
    email: user.email,
    password: "",
    role: user.role,
  });

  const [errors, setErrors] = useState<
    Partial<Record<SignupFormFieldKey, string>>
  >({});

  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<SignupFormFieldKey, string>> = {};

    if (!values.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!values.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: SignupFormFieldKey,
    value: string
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setFormError("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);

      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          role: values.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.message || "Failed to update user");
        return;
      }

      onSaved();
      onClose();
    } catch {
      setFormError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm">

      <div className="relative w-full max-w-md rounded-2xl bg-slate-50 p-8 shadow-xl dark:bg-slate-900">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-2 rounded-full p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800"
        >
          <X size={18} />
        </button>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 dark:bg-slate-950">

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Edit User
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update user information
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-5 space-y-4"
          >
            <SignupFormFields
              values={values}
              errors={errors}
              onChange={handleChange}
              passwordMode="optional"
              showPassword={false}
              disabled={submitting}
            />

            {formError && (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/40">
                {formError}
              </p>
            )}

            <div className="flex justify-center gap-3 pt-2">

              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="flex-1 rounded-lg bg-rose-600 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function EditUserModal({
  user,
  open,
  onClose,
  onSaved,
}: EditUserModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open || !user) return null;

  return (
    <EditUserModalContent
      key={user._id}
      user={user}
      onClose={onClose}
      onSaved={onSaved}
    />
  );
}