import { ReactNode } from "react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics'  // This will use the template from root layout
}

export default function AnalyticsLayout({
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