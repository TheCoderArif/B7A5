import { Card } from '@/components/ui/card';
import  Link  from 'next/link'


const page = async ({params}) => {

  const {id} = await params;

   const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch gear");
  }

  const gear = await res.json();

  const data = gear.data.result;

  // console.log(data);
  return (
    <div>
      <Card className=' my-2 px-3 max-w-3xl mx-auto'>
        <div>{data.name}</div>
        
         <img className='border-2 w-3/4 h-20 mx-auto pt-2 mt-2' src={data.name} alt="image" />
          <div className=''>Provider: {data.provider.name}</div>
          <div>Category: {data.category.name}</div>
          <div>Availability: {data.available}</div>
          <div>Quantity: {data.quantity}</div>
          <div>Available quantity: {data.available}</div>
          <div>Price per day: {data.pricePerDay} $</div>

          <Link href={`/payment/success`}><button className='bg-blue-500 rounded-full px-2 py-1'>Buy Now</button></Link>

      </Card>
    </div>
  )
}

export default page