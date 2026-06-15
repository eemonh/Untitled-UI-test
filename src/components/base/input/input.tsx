import { cx } from "@/utils/cx";

export interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
}

export const InputField = ({ label, value, onChange, placeholder, hint, type = "text" }: InputFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-secondary">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cx(
        "w-full rounded-lg border border-primary bg-primary px-3.5 py-2.5 text-sm text-primary shadow-xs outline-none transition",
        "placeholder:text-placeholder",
        "hover:border-primary_hover",
        "focus:border-brand-300 focus:ring-4 focus:ring-brand-100",
      )}
    />
    {hint && <p className="text-sm text-tertiary">{hint}</p>}
  </div>
);
