import { Input } from "@/shared/ui/atoms"

interface FormFieldProps {
  id: string
  label: string
  type?: "text" | "email" | "password"
  placeholder?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  error,
}: FormFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-white/70">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}