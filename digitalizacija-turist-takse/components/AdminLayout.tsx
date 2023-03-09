import React, { ReactNode } from 'react'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default AdminLayout
