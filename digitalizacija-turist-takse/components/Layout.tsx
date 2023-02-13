import React, { ReactNode } from 'react'
import NavBar from './NavBar'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar/>
      {children}
    </div>
  )
}

export default Layout
