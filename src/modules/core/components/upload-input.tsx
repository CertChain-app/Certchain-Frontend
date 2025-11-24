import { InboxOutlined } from "@ant-design/icons"
import { InputWrapper, type TextInputProps } from "@mantine/core"
import { Upload, UploadFile, UploadProps, message } from "antd"
import { useState } from "react"
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form"
import { twMerge } from "tailwind-merge"

const { Dragger } = Upload

type FileResponse = {
  statusCode: number
  success: boolean
  data: {
    url: string
  }
  path: string
  message: string
  meta: Record<string, unknown>
}

export type UploadInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextInputProps, "value" | "defaultValue"> & {
    wrapperClassName?: string
    uploadProps?: Omit<UploadProps, "onChange" | "fileList">
  }

export function UploadInput<T extends FieldValues>({
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
  uploadProps,
}: UploadInputProps<T>) {
  const {
    field: { onChange, value },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  })

  const [fileList, setFileList] = useState<UploadFile[]>(() => {
    if (!value) return []
    if (Array.isArray(value)) {
      return value.map((url: string, index: number) => ({
        uid: `-${index}`,
        name: url.split("/").pop() || "file",
        status: "done",
        url: url.startsWith("assets/")
          ? `${process.env.NEXT_PUBLIC_ASSETS_URL}/${url}`
          : url,
        thumbUrl: url.startsWith("assets/")
          ? `${process.env.NEXT_PUBLIC_ASSETS_URL}/${url}`
          : url,
      }))
    }
    return [
      {
        uid: "-1",
        name: (value as string).split("/").pop() || "file",
        status: "done",
        url: (value as string).startsWith("assets/")
          ? `${process.env.NEXT_PUBLIC_ASSETS_URL}/${value}`
          : (value as string),
        thumbUrl: (value as string).startsWith("assets/")
          ? `${process.env.NEXT_PUBLIC_ASSETS_URL}/${value}`
          : (value as string),
      },
    ]
  })

  const handleChange: UploadProps["onChange"] = ({
    file,
    fileList: newFileList,
  }) => {
    // For single upload, only keep the latest file
    if (!uploadProps?.multiple) {
      const latestFile = newFileList[newFileList.length - 1]
      setFileList(latestFile ? [latestFile] : [])
    } else {
      setFileList(newFileList)
    }

    if (file.status === "done" && file.response) {
      const response = file.response as FileResponse
      if (response.success) {
        if (uploadProps?.multiple) {
          const urls = newFileList
            .filter((f) => f.status === "done")
            .map((f) => (f.response as FileResponse)?.data?.url)
            .filter(Boolean)
          onChange(urls)
        } else {
          onChange(response.data.url)
        }
      }
    }

    if (file.status === "error") {
      message.error(`${file.name} upload failed.`)
    }
  }

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/")
    if (!isImage) {
      message.error("You can only upload image files!")
      return Upload.LIST_IGNORE
    }

    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!")
      return Upload.LIST_IGNORE
    }

    return true
  }

  const onRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid)
    setFileList(newFileList)

    if (uploadProps?.multiple) {
      const urls = newFileList
        .filter((f) => f.status === "done")
        .map((f) => (f.response as FileResponse)?.data?.url)
        .filter(Boolean)
      onChange(urls)
    } else {
      onChange(undefined)
    }
  }

  const hasError = !!fieldState.error?.message || !!error

  return (
    <InputWrapper
      label={label}
      description={description}
      error={fieldState.error?.message || error}
      errorProps={errorProps}
      className={wrapperClassName}
    >
      <div
        className={twMerge("rounded-md", hasError && "border border-red-500")}
      >
        <Dragger
          name='file'
          multiple={uploadProps?.multiple}
          action='/api/image/upload'
          accept='image/*'
          maxCount={uploadProps?.multiple ? undefined : 1}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          onRemove={onRemove}
          fileList={fileList}
          listType='picture'
          progress={{
            strokeColor: {
              "0%": "#108ee9",
              "100%": "#87d068",
            },
            strokeWidth: 3,
            format: (percent?: number) =>
              `${parseFloat((percent || 0).toFixed(2))}%`,
          }}
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: true,
            showDownloadIcon: false,
          }}
          className={twMerge(
            "[&_.ant-upload]:bg-white [&_.ant-upload]:border-dashed [&_.ant-upload]:border-gray-300 [&_.ant-upload]:hover:border-primary-500",
            hasError &&
              "[&_.ant-upload]:border-red-500 [&_.ant-upload]:hover:border-red-500"
          )}
          {...uploadProps}
        >
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag file{uploadProps?.multiple ? "s" : ""} to this area to
            upload
          </p>
          <p className='ant-upload-hint'>
            Support for {uploadProps?.multiple ? "bulk" : "single"} upload. Only
            images allowed, max 2MB per file.
          </p>
        </Dragger>
      </div>
    </InputWrapper>
  )
}
