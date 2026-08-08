"use client"

// import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginAction } from "../_actions/authActions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const LoginForm = () => {

  const [state, action, pending] = useActionState(loginAction, false);
  // const router = useRouter();

  useEffect(()=> {
    if (!state) return;

    if (state.success) {
      toast.error(state.message || "Login Successful")
      // router.push("/dashboard");
    }

    if(!state.success) {
      toast.error(state.message || "Login Failed")
    }

    
  },[state]);
  return (
    <form action={action}>
        <Card className="p-5 space-y-0">
            <Input name="email" type="email" placeholder="Enter your email" required />
            <Input name="password" type="password" placeholder="Enter your password" required />
            
            <Button type="submit">
              {
                pending ? "Submitting..." : "Login"
              }
            </Button>
        </Card>
    </form>
  )
}

export default LoginForm