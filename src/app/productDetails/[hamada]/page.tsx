import { getSpecificProduct } from "@/app/home.services";
import { getUserToken } from "@/app/myUtil";
import AddToCart from "@/components/AddToCart/AddToCart";
import { Star } from "lucide-react";

type ProductDetails = {
  _id: string;
  imageCover: string;
  images: string[];
  ratingsQuantity: number;
  ratingsAverage: number;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;

  category: {
    name: string;
  };

  brand: {
    name: string;
  };
};

export default async function page({params}: {params: { hamada: string }}) {

  const { hamada } = await params;

  const productDetails: ProductDetails = await getSpecificProduct(hamada);

  const userToken = await getUserToken();

  if (!productDetails) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const {
    imageCover,
    images,
    ratingsQuantity,
    ratingsAverage,
    title,
    category,
    brand,
    price,
    priceAfterDiscount,
    description,
  } = productDetails;

  return (
    <div className="w-[95%] mx-auto py-10">

      {/* Title */}
      <h2 className="mb-8 text-main-color text-center text-3xl md:text-4xl font-bold">
        Product Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Images */}
        <div className="flex flex-col gap-5">

          <div className="p-4 border rounded-2xl">
            <img
              src={imageCover}
              alt={title}
              className="w-full h-[300px] object-cover rounded-xl"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto p-2 border rounded-2xl">
            {images?.map((img, index) => (
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

        {/* Details */}
        <div className="flex flex-col gap-5 bg-gray-100 p-6 rounded-2xl">

          <h3 className="text-2xl md:text-3xl font-bold text-main-color">
            {title}
          </h3>

          <p className="text-gray-500 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-main-color/10 text-main-color rounded-xl text-sm">
              {category?.name}
            </span>

            <span className="px-4 py-2 bg-blue-400/20 text-blue-500 rounded-xl text-sm">
              {brand?.name}
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
            {Array.from({ length: Math.floor(ratingsAverage || 0) }).map((_, i) => (
              <Star key={`f-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}

            {Array.from({ length: 5 - Math.floor(ratingsAverage || 0) }).map((_, i) => (
              <Star key={`e-${i}`} className="w-4 h-4 text-gray-300" />
            ))}

            <span className="text-sm text-gray-500 ml-2">
              ({ratingsQuantity})
            </span>
          </div>

          {/* Button */}
          {!!userToken && (
            <div className="mt-4">
              <AddToCart id={hamada} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}