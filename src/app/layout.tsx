"use client"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { SnackbarProvider } from 'notistack'

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <SnackbarProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}