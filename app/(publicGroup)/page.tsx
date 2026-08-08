
// import { cookies } from "next/headers";
// import { JsonWebTokenError } from "jsonwebtoken";
// import jwt, { JwtPayload } from "jsonwebtoken"

import { getMe } from "../service/getMe";

export default async function Home() {

  // const cookieStore = await cookies();
  //     const accessToken = cookieStore.get("accessToken")?.value;

  const user = await getMe();
  // console.log(user);
  

  // const decoded = jwt.verify(
  //     accessToken as string,
  //     process.env.JWT_ACCESS_TOKEN_SECRET!
  //   ) as JwtPayload;

  // const decoded = jwt.decode(accessToken)

    // console.log(decoded);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      GearUp
      {/* {user.name} */}

{/* {accessToken} */}

      {/* {user as string} */}
    </div>
  );
}
