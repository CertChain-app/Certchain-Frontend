import { ActionIcon, TextInput } from "@mantine/core"
import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useQueryState } from "nuqs"
import { useState, type FC } from "react"

interface TextSearchProps {
  label?: string
  placeholder?: string
  description?: string
  searchFields: string
}

const TextSearch: FC<TextSearchProps> = ({
  label,
  placeholder,
  description,
  searchFields,
}) => {
  const [search] = useQueryState("search")
  const [querySearchFields] = useQueryState("searchFields")
  const searchParam = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState(
    querySearchFields === searchFields ? search || "" : ""
  )
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        const params = new URLSearchParams(searchParam)
        params.set("searchFields", searchFields)
        params.set("search", query)

        router.push(`${pathname}?${params.toString()}`)
      }}
    >
      <TextInput
        name={searchFields}
        label={label}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        description={description}
        placeholder={placeholder}
        leftSection={<Search size={16} />}
        rightSection={
          <ActionIcon
            onClick={() => {
              setQuery("")
              const params = new URLSearchParams(searchParam)
              params.delete("search")
              params.delete("searchFields")
              router.push(`${pathname}?${params.toString()}`)
            }}
            size='sm'
            variant='transparent'
            c='dimmed'
          >
            <X size={14} />
          </ActionIcon>
        }
      />
    </form>
  )
}

export default TextSearch
