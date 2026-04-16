import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default async function page() {

  const brandData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`,{
    method: "GET"
  })

  const {data} = await brandData.json();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
      {data.map(e => 
        <Link href={`../brandDetails/${e._id}`} key={e._id} className="group hover:-translate-y-2 transition text-center my-6 rounded-4xl shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(0,0,0,0.25)] cursor-pointer">
          <div className="bg-[#f9fafb] m-6  py-5 overflow-hidden rounded">
            <Image className="group-hover:scale-[1.1] transition mx-auto " src={e.image} width={150} height={100} alt="Brand-Image"/>
          </div>
          <p className="group-hover:text-violet-700 transition py-6">{e.name}</p>
          <div className="">
            <p className="group-hover:text-violet-700 transition py-6 flex w-fit mx-auto text-white"> View Products <ArrowRight/> </p>
          </div>
        </Link>
      )}
    </div>
  )
}
