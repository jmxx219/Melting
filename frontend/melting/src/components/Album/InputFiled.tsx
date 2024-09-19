import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface InputFieldProps {
  label: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  required?: boolean
  multiline?: boolean
  maxLength?: number
  placeholder?: string
}

export default function InputField({
  label,
  value,
  onChange,
  required = false,
  multiline = false,
  maxLength,
  placeholder,
}: InputFieldProps) {
  const inputProps = {
    value,
    onChange,
    required,
    maxLength,
    placeholder,
  }

  return (
    <div className="space-y-2">
      <Label
        htmlFor={label.toLowerCase().replace(' ', '-')}
        className="font-semibold"
      >
        {label}
        {required && <span className="text-primary-400 ml-1">*</span>}
      </Label>
      {multiline ? (
        <Textarea
          id={label.toLowerCase().replace(' ', '-')}
          {...inputProps}
          className="min-h-[100px]"
        />
      ) : (
        <Input
          id={label.toLowerCase().replace(' ', '-')}
          type="text"
          {...inputProps}
        />
      )}
      {maxLength && (
        <p className="text-sm text-gray text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  )
}
