import { ReactNode } from "react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register, LinkedBoost - LinkedIn Automation Tool'  // This will use the template from root layout
}

export default function RegisterLayout({
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