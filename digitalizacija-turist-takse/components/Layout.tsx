import React, { ReactNode } from 'react'
import NavBar from './NavBar'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Layout
