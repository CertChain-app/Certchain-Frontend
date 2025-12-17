import { api } from "@/api"
import { IApiParams } from "@/api/types"
import { useOrganizerContext } from "@/modules/organizer/contexts/organizer-context"
import { useQuery } from "@tanstack/react-query"

export const useEvents = (params: IApiParams) => {
  const { organizer } = useOrganizerContext()

  const { data, isLoading } = useQuery({
    queryKey: ["events", organizer?.id],
    queryFn: () => api.user.event.getAll(organizer?.id || "", params),
  })

  return { data, isLoading }
}
