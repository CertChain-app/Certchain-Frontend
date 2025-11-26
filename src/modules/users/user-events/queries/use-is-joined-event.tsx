import { UserUserEventClient } from "@/api/clients/UserUserEventClient"
import { useQuery } from "@tanstack/react-query"

export const useIsJoinedEvent = (id: string) => {
  return useQuery({
    queryKey: ["user-event", id, "is-joined"],
    queryFn: () => new UserUserEventClient().isJoined(id),
    enabled: !!id,
  })
}
