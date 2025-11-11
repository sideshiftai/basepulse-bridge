import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/wallet-provider"
import { Toaster as SonnerToaster } from "sonner"
import { Toaster as ShadcnToaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "SideShift Bridge - Cross-Chain Crypto Bridge",
  description: "Bridge any cryptocurrency between blockchain networks using SideShift.ai. Fast, secure, and decentralized cross-chain transfers.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WalletProvider>
            <main className="min-h-screen">{children}</main>
            <SonnerToaster />
            <ShadcnToaster />
          </WalletProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
