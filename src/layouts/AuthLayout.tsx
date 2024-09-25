import { Shape } from '@/assets'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div
      className='w-100 h-screen bg-[#4880FF] flex items-center justify-center overflow-hidden'
      style={{ backgroundImage: `url(${Shape})` }}
    >
      {children}
    </div>
  )
}

export default AuthLayout
