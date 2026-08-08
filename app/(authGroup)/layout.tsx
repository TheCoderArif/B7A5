import React from 'react'
import { Navbar } from './_components/shared/navbar'

const DashboardLayout = (
    {
        children
    } : {
        children : React.ReactNode
    }
) => {
  return (
    <>
    {/* <Navbar></Navbar> */}
    <div className=' max-w-7xl mx-auto'>
        {children} 
    </div>

    </>
  )
}

export default DashboardLayout