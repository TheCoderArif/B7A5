// "use server"

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// import jwt, { JwtPayload } from "jsonwebtoken"

// type LoginState ={
//     success : true,
//     statusCode : number,
//     message : string,
//     data : {
//         accessToken : string,
//         refreshToken : string
//     }
// }


// export const loginAction = async ( prevState : LoginState , formData : FormData) : Promise<LoginState>  => {

//     // console.log(formData);
//     // console.log(prevState);

//     const email = formData.get("email");
//     const password = formData.get("password");

//     const payload = {email, password}

//     console.log(email, password);

//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`,{
//         method: "POST",
//         headers: {
//             "content-type" : "application/json"
//         },
//         body : JSON.stringify(payload)

//     });

//     const result : LoginState = await res.json();

//     // console.log(result);
//     if (result.success){
//         const cookieStore = await cookies();

//         cookieStore.set("accessToken", result.data.accessToken, {
//             httpOnly: true,
//             maxAge: 60*60*24,
//             sameSite: "lax",

//         });
//         cookieStore.set("refreshToken", result.data.refreshToken, {
//             httpOnly: true,
//             maxAge: 60*60*24*7,
//             sameSite: "lax",

//         });

        
//         const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

//         // console.log(decodedToken);

//         if(decodedToken.role === "CUSTOMER"){
//             redirect("/dashboard/customer");
//         } else if (decodedToken.role === "PROVIDER"){
//             redirect("/dashboard/provider");
//         } else if (decodedToken.role === "ADMIN"){
//             redirect("/dashboard/admin");
//         }


//     }
//     return result;

// } ;






































"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

export type LoginData = {
  accessToken: string;
  refreshToken: string;
};

export type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: LoginData | null;
};

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // Validate input
  if (!email || !password) {
    return {
      success: false,
      statusCode: 400,
      message: "Email and password are required",
      data: null,
    };
  }

  const payload = {
    email,
    password,
  };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const result = await res.json();

    // Backend login failed
    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message ?? "Login failed",
        data: null,
      };
    }

    // Make sure token data exists
    if (
      !result.data ||
      !result.data.accessToken ||
      !result.data.refreshToken
    ) {
      return {
        success: false,
        statusCode: 500,
        message: "Invalid login response from server",
        data: null,
      };
    }

    const accessToken = result.data.accessToken;
    const refreshToken = result.data.refreshToken;

    // Store tokens in HTTP-only cookies
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // Decode JWT
    const decodedToken = jwt.decode(accessToken) as JwtPayload | null;

    if (!decodedToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Invalid access token",
        data: null,
      };
    }

    const role = decodedToken.role;

    // Redirect according to role
    if (role === "CUSTOMER") {
      redirect("/dashboard/customer");
    }

    if (role === "PROVIDER") {
      redirect("/dashboard/provider");
    }

    if (role === "ADMIN") {
      redirect("/dashboard/admin");
    }

    // Unknown role
    return {
      success: false,
      statusCode: 403,
      message: "Invalid user role",
      data: null,
    };
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Something went wrong during login",
      data: null,
    };
  }
};