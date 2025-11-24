"use client"

import { Box, Collapse, Group, UnstyledButton } from "@mantine/core"
import { IconChevronRight, IconProps } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

interface LinksGroupProps {
  icon: React.FC<IconProps>
  label: string
  initiallyOpened?: boolean
  link: string
  links?: { label: string; link: string }[]
  active?: boolean
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
  active,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)

  const items = (hasLinks ? links : []).map((link) => (
    <Link
      href={link.link}
      key={link.label}
      className={`font-medium block text-sm text-gray-700 py-2 px-4 ml-8 border-l border-gray-300 hover:bg-gray-50 no-underline ${
        active ? "bg-blue-50 text-blue-600" : ""
      }`}
    >
      {link.label}
    </Link>
  ))

  return (
    <>
      <UnstyledButton
        component={Link}
        href={link || "#"}
        onClick={() => setOpened((o) => !o)}
        className='font-medium block w-full py-2 px-4 text-gray-900 text-sm hover:bg-gray-50'
      >
        <Group justify='space-between' gap={0}>
          <Box className='flex items-center'>
            <div className='flex items-center justify-center w-[30px] h-[30px] bg-gray-50 rounded-md'>
              <Icon size={18} />
            </div>
            <Box ml='md'>{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className='transition-transform duration-200'
              stroke={1.5}
              size={16}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
