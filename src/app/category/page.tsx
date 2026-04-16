import React from 'react'
import {getAllCategory} from "./category.services"
import Image from 'next/image';
import Link from 'next/link';

export default async function page() {
  const data = await getAllCategory();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
      {data?.map(({ _id, name, image }) => (
        <Link href={`/categoryDetails/${_id}`} key={_id} className="group hover:-translate-y-2 transition text-center my-6 rounded-4xl shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(0,0,0,0.25)] cursor-pointer">
          <div className="bg-[#f9fafb] m-6  py-5 overflow-hidden rounded">
            <Image className="group-hover:scale-[1.1] transition mx-auto " src={image} width={150} height={100} alt="Brand-Image"/>
          </div>
          <p className="group-hover:text-violet-700 transition py-6">{name}</p>

        </Link>
      ))}
    </div>
  )
}
