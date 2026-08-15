"use client"

import { SegmentedControl } from "@mantine/core"
import type { FC } from "react"

export type AccountType = "attendee" | "organizer"

interface AccountTypeSwitchProps {
  value: AccountType
  onChange: (value: AccountType) => void
}

/**
 * Picks which side of the product you are signing into. Attendees and
 * organizers used to have separate pages; this keeps them on one.
 */
const AccountTypeSwitch: FC<AccountTypeSwitchProps> = ({ value, onChange }) => {
  return (
    <SegmentedControl
      fullWidth
      value={value}
      onChange={(next) => onChange(next as AccountType)}
      data={[
        { label: "I'm attending", value: "attendee" },
        { label: "I'm organizing", value: "organizer" },
      ]}
    />
  )
}

export default AccountTypeSwitch
