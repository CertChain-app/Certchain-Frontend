import { InputWrapper, TextInputProps } from "@mantine/core"
import "@mantine/core/styles/Input.css"
import { ComponentProps, FC } from "react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"

export type PhoneNumberInputProps = TextInputProps &
  ComponentProps<typeof PhoneInput> & {
    wrapperClassName?: string
  }

export const PhoneNumberInput: FC<PhoneNumberInputProps> = ({
  label,
  description,
  error,
  errorProps,
  wrapperClassName,
  ...props
}) => {
  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      errorProps={errorProps}
      className={wrapperClassName}
    >
      <PhoneInput
        international
        className='w-full [&>input]:focus-within:border-none focus-within:border-indigo-500 outline-none [&>input]:focus-within:outline-none rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500'
        {...props}
      />
    </InputWrapper>
  )
}
