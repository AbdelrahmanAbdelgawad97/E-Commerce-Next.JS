import { getSpecificProduct } from "@/app/home.services";
import { getUserToken } from "@/app/myUtil";
import AddToCart from "@/components/AddToCart/AddToCart";
import AppButtons from "@/components/Shared/AppButtons/AppButtons";
import { Star } from "lucide-react";

export default async function page({ params }:{params:{hamada:string}}) {
  const {hamada} = await params;

  const productDetails = await getSpecificProduct(hamada);

  const {imageCover, images,ratingsQuantity,ratingsAverage, title, category, brand, price, priceAfterDiscount, description} = productDetails;

    const userToken = await getUserToken();
  

  return (
<div className="w-[95%] mx-auto py-10">
  
  {/* Title */}
  <h2 className="mb-8 text-main-color text-center text-3xl md:text-4xl font-bold">
    Product Details
  </h2>

  {/* Layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

    {/* ===== Left Side (Images) ===== */}
    <div className="flex flex-col gap-5">

      {/* Main Image */}
      <div className="p-4 border rounded-2xl">
        <img
          src={imageCover}
          alt={title}
          className="w-full h-[300px] object-cover rounded-xl"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto p-2 border rounded-2xl">
        {images.map((img, index) => (
          <div key={index} className="min-w-[80px]">
            <img
              src={img}
              alt={title}
              className="w-full h-[80px] object-cover rounded-lg cursor-pointer hover:scale-105 transition"
            />
          </div>
        ))}
      </div>
    </div>

    {/* ===== Right Side (Details) ===== */}
    <div className="flex flex-col gap-5 bg-gray-100 p-6 rounded-2xl">

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-main-color">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 leading-relaxed">
        {description}
      </p>

      {/* Category + Brand */}
      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-main-color/10 text-main-color rounded-xl text-sm">
          {category.name}
        </span>
        <span className="px-4 py-2 bg-blue-400/20 text-blue-500 rounded-xl text-sm">
          {brand.name}
        </span>
      </div>

      {/* Price */}
      <div className="text-lg font-semibold">
        Price:{" "}
        {priceAfterDiscount ? (
          <>
            <span className="line-through text-gray-400 mr-2">
              {price} EGP
            </span>
            <span className="text-main-color">
              {priceAfterDiscount} EGP
            </span>
          </>
        ) : (
          <span>{price} EGP</span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.floor(ratingsAverage) }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}

        {Array.from({ length: 5 - Math.floor(ratingsAverage) }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400" />
        ))}

        <span className="text-sm text-gray-500 ml-2">
          ({ratingsQuantity})
        </span>
      </div>

      {/* Button */}
      {userToken && (
        <div className="mt-4">
          <AddToCart id={hamada} />
        </div>
      )}

    </div>
  </div>
</div>
  )
}
