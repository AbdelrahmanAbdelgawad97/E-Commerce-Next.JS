import { getCategoryDetails } from '@/app/category/category.services';
import { getUserToken } from '@/app/myUtil';
import AddToCart from '@/components/AddToCart/AddToCart';
import NotFoundProduct from '@/components/NotFoundProduct/NotFoundProduct';
import RedirectTo from '@/components/Shared/AppButtons/RedirectTo';
import { Star } from 'lucide-react';
import Image from 'next/image';

type ProductItem = {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;

  category: {
    name: string;
  };

  brand: {
    name: string;
  };
};

export default async function page({params}: {params: { category: string }}) {
  const { category } = await params;

  const finalData: ProductItem[] = await getCategoryDetails(category);
  const userToken = await getUserToken();

  const isEmpty = !finalData || finalData.length === 0;

  return (
    <div className="w-[95%] mx-auto py-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {isEmpty ? (
          <NotFoundProduct directedPath="/category" browse="Category" />
        ) : (
          finalData.map((item) => {
            const {
              _id,
              title,
              price,
              imageCover,
              ratingsAverage,
              ratingsQuantity,
              category,
              brand,
            } = item;

            return (
              <div
                key={_id}
                className="group hover:-translate-y-2 bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(0,0,0,0.25)] cursor-pointer transition duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <Image
                    src={imageCover}
                    width={300}
                    height={250}
                    alt={title}
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-3">

                  {/* Category */}
                  <span className="text-xs text-gray-400 uppercase">
                    {category?.name}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm font-semibold line-clamp-2 min-h-[40px]">
                    {title}
                  </h3>

                  {/* Brand */}
                  <span className="text-xs text-gray-500">
                    {brand?.name}
                  </span>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({
                      length: Math.floor(ratingsAverage || 0),
                    }).map((_, i) => (
                      <Star
                        key={`f-${i}`}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}

                    {Array.from({
                      length: 5 - Math.floor(ratingsAverage || 0),
                    }).map((_, i) => (
                      <Star
                        key={`e-${i}`}
                        className="w-4 h-4 text-gray-300"
                      />
                    ))}

                    <span className="text-xs text-gray-500">
                      ({ratingsQuantity})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-main-color font-bold text-lg">
                      {price} EGP
                    </span>
                  </div>

                  {/* Button */}
                  {userToken ? <AddToCart id={_id} /> : <RedirectTo />}
                </div>
              </div>
            );
          })
        )}

      </div>
    </div>
  );
}