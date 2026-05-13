"use client";

export type SignupFormValues = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};

export type SignupFormFieldKey = keyof SignupFormValues;

type Props = {
  values: SignupFormValues;
  errors?: Partial<Record<SignupFormFieldKey, string>>;
  onChange: (field: SignupFormFieldKey, value: string) => void;
  passwordMode: "required" | "optional";
  disabled?: boolean;
  showPassword?: boolean;
};

export function SignupFormFields({
  values,
  errors = {},
  onChange,
  passwordMode,
  disabled = false,
  showPassword = true,
}: Props) {
  const inputClass = (field: SignupFormFieldKey) =>
    `w-full rounded-lg border px-4 py-3 text-sm outline-none transition
    dark:bg-slate-900 dark:text-white
    ${errors[field]
      ? "border-rose-500 focus:ring-2 focus:ring-rose-300"
      : "border-slate-300 focus:ring-2 focus:ring-indigo-300"
    }`;

  const renderError = (field: SignupFormFieldKey) =>
    errors[field] && (
      <p className="text-sm text-rose-500">{errors[field]}</p>
    );

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Full Name <span className="text-rose-500">*</span>
        </label>

        <input type="text" value={values.fullName} onChange={(e) => onChange("fullName", e.target.value)} placeholder="Enter full name" disabled={disabled} className={inputClass("fullName")} />
        {renderError("fullName")}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Email <span className="text-rose-500">*</span>
        </label>

        <input type="email" value={values.email} onChange={(e) => onChange("email", e.target.value)} placeholder="Enter email" disabled={disabled} className={inputClass("email")} />
        {renderError("email")}
      </div>

      {/* Password */}
      {showPassword && (
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Password{" "}
            {passwordMode === "required" ? (
              <span className="text-rose-500">*</span>
            ) : (
              <span className="text-slate-400">(optional)</span>
            )}
          </label>

          <input type="password" value={values.password} onChange={(e) => onChange("password", e.target.value)} placeholder={passwordMode === "required" ? "Enter password" : "Leave blank to keep current password"}
            disabled={disabled}
            className={inputClass("password")}
          />

          {renderError("password")}
        </div>
      )}

      {/* Role */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Role <span className="text-rose-500">*</span>
        </label>

        <select
          value={values.role}
          onChange={(e) => onChange("role", e.target.value)}
          disabled={disabled}
          className={inputClass("role")}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>

        {renderError("role")}
      </div>
    </div>
  );
}