"use client"

// import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// import { loginAction } from "../_actions/authActions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { GearAction } from "../_actions/gearAction"

const AddGear = () => {

//   const [state, action, pending] = useActionState(loginAction, false);
  // const router = useRouter();

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
  return (
    <form action={''}>
        <Card className="p-5 space-y-0">
            <Input name="name" type="name" placeholder="Product name" required />
            <Input name="description" type="description" placeholder="Description" required />
            <Input name="image" type="text" placeholder="Image link" required />
            <Input name="pricePerDay" type="number" placeholder="Price per day" required />
            <Input name="quantity" type="number" placeholder="Quantity" required />
            <Input name="available" type="number" placeholder="How much available" required />
            {/* <Input name="available" type="number" placeholder="How much available" required /> */}
            {/* <Input name="role" type="role" placeholder="Role" required /> */}

            <select  >
  <option value="" disabled>
    Status
  </option>
  <option value="AVAILABLE">Avilable</option>
  <option value="NOT_AVAILABLE">Not Available</option>
  
</select>

            {/* <Input name="password" type="password" placeholder="Password" required /> */}
            
            <Button type="submit">
              {/* {
                 ? "Submitting..." : "Register"

              } */}
              Submit
            </Button>
        </Card>
    </form>
  )
}

export default AddGear