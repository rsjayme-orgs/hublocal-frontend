import { Box } from '@chakra-ui/react'
import React from 'react'

interface IPageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: IPageLayoutProps) {
  return <Box mx="35px">{children}</Box>
}
