import { Card } from '@/components/ui/card'
import React from 'react'

interface IGear {
  
    gear : {
        id: string,
    name: string,
    description: string,
    image: string,
    pricePerDay: number,
    quantity: number,
    available: number,
    status: string,
    providerId: string,
    categoryId: string,
    createdAt:string,
    updatedAt: string
    }
  
}

const GearCompo = ({gear} : IGear) => {

    // console.log(gear);
  return (
    <div >

        <Card className=' my-2 px-3'>
            <img className='border-2 w-3/4 h-20 mx-auto pt-2 mt-2' src={gear.image} alt="image" />
        <p>Name: {gear.name}</p>
        <p>Description: {gear.description}</p>
        <p>Price per day: {gear.pricePerDay}</p>
        <p>Availability: {gear.status}</p>
        <p>Quantity: {gear.quantity}</p>
        </Card>

    </div>
  )
}

export default GearCompo