
import HomeSlider from '@/components/HomeSlider/HomeSlider';
import { getAllProduct } from './home.services';
import ProductCard from "@/components/ui/ProductCard/ProductCard";
// import {CategorySlider} from '@/components/CategorySlider/CategorySlider';
import { lazy, Suspense } from 'react';



const CategorySlider = lazy(function(){
  return import ('@/components/CategorySlider/CategorySlider')
})

export default async function page() {

  const productList = await getAllProduct();
  

  return (
    <>
    <HomeSlider />
    
    <Suspense fallback={<h1 className='text-xl bg-gray-200 text-black text-center py-4 my-4'>Loading...</h1>}>
      <CategorySlider />
    </Suspense>

      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5 my-6 container mx-auto w-[95%]'> 
        {productList.map(e=> <ProductCard key={e._id} prod={e}/>)}
      </div>
    </>
  )
}