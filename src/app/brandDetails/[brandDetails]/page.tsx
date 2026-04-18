import AddToCart from '@/components/AddToCart/AddToCart';
import AppButtons from '@/components/Shared/AppButtons/AppButtons';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import NotFoundProduct from '@/components/NotFoundProduct/NotFoundProduct';
import { getUserToken } from '@/app/myUtil';
import RedirectTo from '@/components/Shared/AppButtons/RedirectTo';


type Product = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;

  category: {
    name: string;
  };

  brand: {
    name: string;
  };
};

type ProductResponse = {
  data: Product[];
};



export default async function page({params,}: {params: { brandDetails: string }}) {
    const {brandDetails} = await params;

    const productDetails = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?brand=${brandDetails}`,
      { method: "GET" }
    );

  const result: ProductResponse = await productDetails.json();
  const data = result.data;

  const userToken = await getUserToken();
  return (
  <div className="w-[95%] mx-auto py-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {!data || data.length === 0 ? (
        <NotFoundProduct directedPath="/brands" browse="Brand" />
      ) : (
        data.map((e: Product) => (
          <div
            key={e._id}
            className="group hover:-translate-y-2 bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(0,0,0,0.25)] cursor-pointer transition duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <Image
                src={e.imageCover}
                width={300}
                height={250}
                alt={e.title}
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3">

              <span className="text-xs text-gray-400 uppercase">
                {e.category.name}
              </span>

              <h3 className="text-sm font-semibold line-clamp-2 min-h-[40px]">
                {e.title}
              </h3>

              <span className="text-xs text-gray-500">
                {e.brand.name}
              </span>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.floor(e.ratingsAverage || 0) }).map((_, i) => (
                  <Star key={`f-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}

                {Array.from({ length: 5 - Math.floor(e.ratingsAverage || 0) }).map((_, i) => (
                  <Star key={`e-${i}`} className="w-4 h-4 text-yellow-400" />
                ))}

                <span className="text-xs text-gray-500">
                  ({e.ratingsQuantity})
                </span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-main-color font-bold text-lg">
                  {e.price} EGP
                </span>
              </div>

              {userToken ? <AddToCart id={e._id} /> : <RedirectTo />}
            </div>
          </div>
        ))
      )}

    </div>
  </div>
);
}
