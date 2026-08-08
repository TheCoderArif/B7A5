// "use server"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken"


const tokenParser = async () => {
    const cookieStore = await cookies();
          const accessToken = cookieStore.get("accessToken")?.value;


          if(!accessToken){
            return null;
          }
        //   console.log("accessToken:",accessToken);
    
          const decoded = jwt.decode(accessToken)
    
        //   console.log(decoded);

        return decoded;
}


export default tokenParser