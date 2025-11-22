import { ActionIcon, Switch, SwitchProps } from "@mantine/core"
import { XIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, type FC } from "react"

interface SwitchSearchProps extends SwitchProps {
  label?: string
  placeholder?: string
  description?: string
  searchFields: string
  offValue: string
  onValue: string
}

const SwitchSearch: FC<SwitchSearchProps> = ({
  label,
  placeholder,
  description,
  searchFields,
  offValue,
  onValue,
  ...props
}) => {
  const searchParam = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState(
    searchParam.get("searchFields") === searchFields
      ? searchParam.get("search") || offValue
      : offValue
  )
  return (
    <form>
      <Switch
        name={searchFields}
        label={label}
        {...props}
        checked={onValue === query}
        onChange={(e) => {
          console.log(e.target.checked, onValue, offValue)
          setQuery(e.target.checked ? onValue : offValue)
          const params = new URLSearchParams(searchParam)
          params.set("searchFields", searchFields)
          params.set("search", e.target.checked ? onValue : offValue)
          router.push(`${pathname}?${params.toString()}`)
        }}
        description={description}
        placeholder={placeholder}
      />
      <ActionIcon
        onClick={() => {
          const params = new URLSearchParams(searchParam)
          params.delete("searchFields")
          params.delete("search")
          router.push(`${pathname}?${params.toString()}`)
        }}
        size='xs'
        color='red'
        variant='outline'
      >
        <XIcon />
      </ActionIcon>
    </form>
  )
}

export default SwitchSearch
