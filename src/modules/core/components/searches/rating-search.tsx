import { ActionIcon, Input, Rating } from "@mantine/core"
import { IconX } from "@tabler/icons-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, type FC } from "react"

interface RatingSearchProps {
  label: string
  placeholder?: string
  description?: string
  searchFields: string
}

const RatingSearch: FC<RatingSearchProps> = ({
  label,
  description,
  searchFields,
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
    <Input.Wrapper label={label} description={description}>
      <div className='flex items-center gap-1'>
        <Rating
          value={query ? Number(query) : 0}
          onChange={(value) => {
            if (value) {
              setQuery(value.toString())
              const params = new URLSearchParams(searchParam)
              params.set("searchFields", searchFields)
              params.set("search", value.toString())
              router.push(`${pathname}?${params.toString()}`)
            }
          }}
        />
        {query && (
          <ActionIcon
            variant='white'
            onClick={() => {
              setQuery("")
              const params = new URLSearchParams(searchParam)
              params.delete("searchFields")
              params.delete("search")
              router.push(`${pathname}?${params.toString()}`)
            }}
          >
            <IconX size={12} />
          </ActionIcon>
        )}
      </div>
    </Input.Wrapper>
  )
}

export default RatingSearch
