import React from 'react'
import { Navbar } from '../(authGroup)/_components/shared/navbar'
import { getMe } from '../service/getMe'
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

const PublicGroupLayout = async (
    {
        children
    } : {
        children : React.ReactNode
    }
) => {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    // console.log("accessToken:",accessToken);

    // const user = await getMe()
    // console.log(user);

  return (
    <div>
        {/* <Navbar ></Navbar> */}
        {children}
    </div>
  )
}

export default PublicGroupLayout