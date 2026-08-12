"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import jwt, { JwtPayload } from "jsonwebtoken"

type LoginState ={
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string
    }
}


export const GearAction = async ( formData : FormData)  => {

    // console.log(formData);
    // console.log(prevState);

    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("image");
    const pricePerDay = formData.get("pricePerDay");
    const quantity = formData.get("quantity");
    const availableQuantity = formData.get("availableQuantity");
    const status = formData.get("status");

    const payload = {name, description, image, pricePerDay, quantity, availableQuantity, status}

    // console.log(email, password);

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`,{
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body : JSON.stringify(payload)

    });

    const result : LoginState = await res.json();

    // console.log(result);
    if (result.success){
        const cookieStore = await cookies();

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60*60*24,
            sameSite: "lax",

        });
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60*60*24*7,
            sameSite: "lax",

        });

        
        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        // console.log(decodedToken);

        if(decodedToken.role === "CUSTOMER"){
            redirect("/dashboard/customer");
        } else if (decodedToken.role === "PROVIDER"){
            redirect("/dashboard/provider");
        } else if (decodedToken.role === "ADMIN"){
            redirect("/dashboard/admin");
        }


    }
    return result;

} ;