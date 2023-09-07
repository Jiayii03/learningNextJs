import '../styles/globals.css'
import Header from './Header'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.Js Introduction Project</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
