import React from 'react'
import { Navbar } from '../(authGroup)/_components/shared/navbar'

const GearGroupLayout = (
    {
        children
    } : {
        children : React.ReactNode
    }
) => {
  return (
    <>
        {/* <Navbar></Navbar> */}
        {children}
    </>
  )
}

export default GearGroupLayout