"use client"

// import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginAction } from "../_actions/authActions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const RegisterForm = () => {

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
            <Input name="name" type="name" placeholder="Name" required />
            <Input name="email" type="email" placeholder="Email" required />
            {/* <Input name="role" type="role" placeholder="Role" required /> */}

            <select  >
  <option value="" disabled>
    Select a role
  </option>
  <option value="CUSTOMER">Customer</option>
  <option value="PROVIDER">Provider</option>
  <option value="ADMIN">Admin</option>
</select>

            <Input name="password" type="password" placeholder="Password" required />
            
            <Button type="submit">
              {
                pending ? "Submitting..." : "Register"
              }
            </Button>
        </Card>
    </form>
  )
}

export default RegisterForm