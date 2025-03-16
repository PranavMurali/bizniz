"use client"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { SnackbarProvider} from 'notistack'

export default function RootLayout({ children }: RootLayoutProps) {

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