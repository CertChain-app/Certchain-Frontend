"use client"
import { InputWrapper, TextInputProps } from "@mantine/core"
import dynamic from "next/dynamic"
import { ComponentProps, useEffect, useState } from "react"
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form"

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => null,
})

// Import styles in a way that works with SSR
import "react-quill-new/dist/quill.snow.css"

export type RichInputBaseProps = Omit<TextInputProps, "onChange"> &
  ComponentProps<typeof ReactQuill> & {
    wrapperClassName?: string
  }

export type RichInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<RichInputBaseProps, "value" | "defaultValue" | "onChange"> & {
    onChange?: (content: string) => void
  }

export function RichInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  label,
  description,
  error,
  errorProps,
  wrapperClassName,
  onChange,
  ...props
}: RichInputProps<T>) {
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

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error || fieldState.error?.message}
      errorProps={errorProps}
      className={wrapperClassName}
    >
      <div className='rich-editor-wrapper'>
        <ReactQuill
          theme='snow'
          value={value}
          onChange={(content: string) => {
            fieldOnChange(content)
            onChange?.(content)
          }}
          className='w-full [&>.ql-container]:min-h-[200px] [&>.ql-toolbar]:border-gray-300 [&>.ql-container]:border-gray-300 [&>.ql-container]:rounded-b-md [&>.ql-toolbar]:rounded-t-md'
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "clean"],
            ],
          }}
          {...field}
          {...props}
        />
      </div>
    </InputWrapper>
  )
}
