"use client";

export type SignupFormValues = {
  fullName: string;
  email: string;
  password: string;
  role: string;
  showPassword?: boolean;
};

export type SignupFormFieldKey = keyof SignupFormValues;

type SignupFormFieldsProps = {
  values: SignupFormValues;
  errors?: Partial<Record<SignupFormFieldKey, string>>;
  onChange: (field: SignupFormFieldKey, value: string) => void;
  /** Sign up requires password; edit user keeps password optional */
  passwordMode: "required" | "optionalNewPassword";
  /** Register starts with empty role; edit always has a role */
  rolePlaceholder?: boolean;
  disabled?: boolean;
  showPassword?: boolean;
  /** Prefix ids for multiple instances on page (e.g. modal) */
  idPrefix?: string;
};

export function SignupFormFields({
  values,
  errors = {},
  onChange,
  passwordMode,
  showPassword = true,
  rolePlaceholder = false,
  disabled = false,
  idPrefix = "signup",
}: SignupFormFieldsProps) {
  const err = (field: SignupFormFieldKey) => errors[field];
  const border = (field: SignupFormFieldKey) =>
    err(field) ? "border-pink-500" : "border-indigo-200";

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-fullName`} className="mb-1 block text-[1rem] font-semibold text-slate-900 dark:text-slate-100">
          Full name <span className="font-bold text-pink-600">*</span>
        </label>
        <input
          id={`${idPrefix}-fullName`}
          type="text"
          value={values.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          disabled={disabled}
          className={`w-full rounded-lg border-2 bg-white/90 px-4 py-3 text-base transition focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-indigo-700 dark:bg-slate-900/80 dark:text-slate-100 ${border("fullName")}`}
          placeholder="Enter full name"
          autoComplete="name"
        />
        {err("fullName") && <p className="mt-1 text-sm text-pink-600">{err("fullName")}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-email`} className="mb-1 block text-[1rem] font-semibold text-slate-900 dark:text-slate-100">
          Email <span className="font-bold text-pink-600">*</span>
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          disabled={disabled}
          className={`w-full rounded-lg border-2 bg-white/90 px-4 py-3 text-base transition focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-indigo-700 dark:bg-slate-900/80 dark:text-slate-100 ${border("email")}`}
          placeholder="Enter email address"
          autoComplete="email"
        />
        {err("email") && <p className="mt-1 text-sm text-pink-600">{err("email")}</p>}
      </div>

      {showPassword !== false && (
  <div className="space-y-2">
    <label
      htmlFor={`${idPrefix}-password`}
      className="mb-1 block text-[1rem] font-semibold text-slate-900 dark:text-slate-100"
    >
      Password{" "}
      {passwordMode === "required" ? (
        <span className="font-bold text-pink-600">*</span>
      ) : (
        <span className="font-normal text-slate-500 dark:text-slate-400">
          (optional)
        </span>
      )}
    </label>

    <input
      id={`${idPrefix}-password`}
      type="password"
      value={values.password}
      onChange={(e) => onChange("password", e.target.value)}
      disabled={disabled}
      className={`w-full rounded-lg border-2 bg-white/90 px-4 py-3 text-base transition focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-indigo-700 dark:bg-slate-900/80 dark:text-slate-100 ${border("password")}`}
      placeholder={
        passwordMode === "required"
          ? "Enter password"
          : "Leave blank to keep current password"
      }
      autoComplete="new-password"
      minLength={passwordMode === "required" ? 6 : undefined}
      required={passwordMode === "required"}
    />

    {err("password") && (
      <p className="mt-1 text-sm text-pink-600">{err("password")}</p>
    )}
  </div>
)}

      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-role`} className="mb-1 block text-[1rem] font-semibold text-slate-900 dark:text-slate-100">
          Role <span className="font-bold text-pink-600">*</span>
        </label>
        <select
          id={`${idPrefix}-role`}
          value={values.role}
          onChange={(e) => onChange("role", e.target.value)}
          disabled={disabled}
          className={`w-full rounded-lg border-2 bg-white/80 px-4 py-3 text-base transition focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-indigo-700 dark:bg-slate-900/80 dark:text-slate-100 ${border("role")}`}
          required={!rolePlaceholder}
        >
          {rolePlaceholder && <option value="">Select role</option>}
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        {err("role") && <p className="mt-1 text-sm text-pink-600">{err("role")}</p>}
      </div>
    </div>
  );
}
