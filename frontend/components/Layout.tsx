import Header from './Header/Header'
import Footer from './Footer/Footer'

import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill container py-4">
        {children}
      </main> 
      <Footer />
    </div>
  )
}
