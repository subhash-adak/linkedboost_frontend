import { ReactNode } from "react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutoConnect'  // This will use the template from root layout
}

export default function AutoConnectLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main>
      {children}
    </main>
  )
}