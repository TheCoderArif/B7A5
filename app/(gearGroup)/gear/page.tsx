import React from 'react'
import gearCompo from '../_components/gearCompo';
import GearCompo from '../_components/gearCompo';

interface IGear {
  
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

const gear = async () => {

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`);

const data = await res.json();
const gears = data.data;
// console.log(gears);
// const gearArray = [...gears]
// console.log(gearArray);
// for(const gear in gears){
//   console.log(gear);
// }
// const arr = Object.keys(gears);
// const arr = Object.values(gears);
const gearArr = gears.result
console.log(gearArr);


  return (
    <div className='px-20'>
      <div>
        <div>Gears:{gearArr.length}</div>
      <div className='flex gap-2'>
        {
        gearArr.map((gear : IGear) => <GearCompo gear={gear} key={gear.id}></GearCompo>)
      }
      </div>
      </div>
    </div>
  )
}

export default gear