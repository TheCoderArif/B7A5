"use server"

// import { access } from "fs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
// import { access } from "fs";

export const getMe = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        // throw new Error("User not logged in!");
        return {
            success: false,
            message : "User not Logged in!"
        }
    }

    // const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    //     headers: {
    //         Authorization: accessToken as unknown as string,
    //         // Cookie : `accessToken=${accessToken}`
    //     }
    // });

//     const decoded = jwt.verify(
//     accessToken,
//     process.env.JWT_ACCESS_TOKEN_SECRET!
//   );

// console.log(accessToken);

const decoded = jwt.decode(accessToken)


    // const result = res.json();
    // console.log(decoded);
    return decoded;
}