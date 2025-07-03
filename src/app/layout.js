import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Natun Provat',
  description: 'Latest news from Bangladesh and Rajshahi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Header />
        <main className=" md:px-4 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}