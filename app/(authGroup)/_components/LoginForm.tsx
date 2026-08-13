// "use client"

// // import { useRouter } from 'next/navigation'

// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { loginAction } from "../_actions/authActions"
// import { useActionState, useEffect } from "react"
// import { toast } from "sonner"

// const LoginForm = () => {










// //   const initialState = {
// //   success: false,
// //   message: "",
// //   statusCode: 0,
// //   data: ""
// // };




//   const [state, action, pending] = useActionState(loginAction, initialState);
//   // const router = useRouter();

//   useEffect(()=> {
//     if (!state) return;

//     if (state.success) {
//       toast.error(state.message || "Login Successful")
//       // router.push("/dashboard");
//     }

//     if(!state.success) {
//       toast.error(state.message || "Login Failed")
//     }

    
//   },[state]);














//   return (
//     <form action={action }>
//         <Card className="p-5 space-y-0">
//             <Input name="email" type="email" placeholder="Enter your email" required />
//             <Input name="password" type="password" placeholder="Enter your password" required />
            
//             <Button type="submit">
//               {/* Login */}
//               {
//                 pending ? "Submitting..." : "Login"
//               }
//             </Button>
//         </Card>
//     </form>
//   )
// }

// export default LoginForm






















































"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  loginAction,
  type LoginState,
} from "../_actions/authActions";

const initialState: LoginState = {
  success: false,
  statusCode: 0,
  message: "",
  data: null,
};

const LoginForm = () => {
  const [state, action, pending] = useActionState(
    loginAction,
    initialState
  );

  useEffect(() => {
    if (!state.message) {
      return;
    }

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={action}>
      <Card className="p-5 space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          disabled={pending}
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          disabled={pending}
        />

        <Button
          type="submit"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;