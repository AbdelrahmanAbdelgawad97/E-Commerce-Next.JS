import React from 'react'
import Slider from '../Slider/Slider'
import { getAllCategory } from '@/app/category/category.services';

export default async function CategorySlider() {


  
    const categoryList = await getAllCategory();
    const categoryImage = categoryList.map(e => e.image)

    

  return (
    <Slider imageList={categoryImage} navigation={true} sliderPerview={7} spaceBetween={20} effect='slide'/>
  )
}
