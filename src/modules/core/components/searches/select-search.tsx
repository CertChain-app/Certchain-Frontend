import { Select } from "@mantine/core"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, type FC } from "react"

interface SelectSearchProps {
  label?: string
  placeholder?: string
  description?: string
  searchFields: string
  options: { label: string; value: string }[]
}

const SelectSearch: FC<SelectSearchProps> = ({
  label,
  placeholder,
  description,
  searchFields,
  options,
}) => {
  const searchParam = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState(
    searchParam.get("searchFields") === searchFields
      ? searchParam.get("search") || ""
      : ""
  )

  return (
    <Select
      name={searchFields}
      label={label}
      clearable
      onClear={() => {
        setQuery("")
        const params = new URLSearchParams(searchParam)
        params.delete("searchFields")
        params.delete("search")
        router.push(`${pathname}?${params.toString()}`)
      }}
      value={query}
      onChange={(value) => {
        if (value) {
          setQuery(value)
          const params = new URLSearchParams(searchParam)
          params.set("searchFields", searchFields)
          params.set("search", value)
          router.push(`${pathname}?${params.toString()}`)
        }
      }}
      description={description}
      placeholder={placeholder}
      data={options}
    />
  )
}

export default SelectSearch
