"use client"
// import Swiper core and required modules
import { Navigation, Pagination, A11y, Autoplay, EffectFade} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import Image from 'next/image';


export default function Slider({imageList, spaceBetween=100, sliderPerview=1 , autoplay=false ,navigation = false , effect }:{imageList:string[], spaceBetween?:number, sliderPerview?:number,autoplay?:boolean|{delay: number,
        disableOnInteraction: boolean} , navigation:boolean,effect:string }) {
    return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y, Autoplay,EffectFade]}
      spaceBetween={spaceBetween}
      slidesPerView={sliderPerview}
      navigation = {navigation}
    autoplay={autoplay}
    // autoplay={{
    //     delay: 900,
    //     disableOnInteraction: false
    // }}
    effect={effect}
      loop = {true}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {imageList.map(e => <SwiperSlide key={e}><div className='relative h-100'><Image fill src={e} alt={e}/></div></SwiperSlide>)}

    </Swiper>
  
  )
}
