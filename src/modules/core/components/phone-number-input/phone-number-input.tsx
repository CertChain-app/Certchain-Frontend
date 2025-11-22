import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form"
import {
  PhoneNumberInput as $PhoneNumberInput,
  type PhoneNumberInputProps as $PhoneInputProps,
} from "./phone-input"

export type PhoneNumberInputProps<T extends FieldValues> =
  UseControllerProps<T> & Omit<$PhoneInputProps, "value" | "defaultValue">

export function PhoneNumberInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: PhoneNumberInputProps<T>) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  })

  return (
    <$PhoneNumberInput
      value={value}
      onChange={(e) => {
        fieldOnChange(e)
        onChange?.(e)
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  )
}
