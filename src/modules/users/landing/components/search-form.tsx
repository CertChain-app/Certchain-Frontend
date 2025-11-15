import { cn } from "@/modules/core/lib/utils"
import { ActionIcon, Input } from "@mantine/core"
import { Search } from "lucide-react"
import type { FC } from "react"

interface SearchFormProps {
  className?: string
}

const SearchForm: FC<SearchFormProps> = ({ className }) => {
  return (
    <form className={cn("flex flex-col md:flex-row gap-2", className)}>
      <Input
        size='lg'
        type='text'
        placeholder='Search for events'
        className='flex-grow'
        rightSection={
          <ActionIcon variant='subtle' type='submit'>
            <Search className='h-4 ml-2 w-4' />
          </ActionIcon>
        }
      />
    </form>
  )
}

export default SearchForm
