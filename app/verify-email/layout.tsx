import { ReactNode } from "react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Email Verification, LinkedBoost - LinkedIn Automation Tool'  // This will use the template from root layout
}

export default function EmailVerificationLayout({
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