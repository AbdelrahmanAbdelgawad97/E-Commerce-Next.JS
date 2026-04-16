import image1 from "@images/1.webp"
import image2 from "@images/2.webp"
import image3 from "@images/3.webp"
import Slider from "@/components/Slider/Slider";

const listOfImage = [image1.src,image2.src,image3.src];

export default function HomeSlider() {
  return (
      <Slider spaceBetween={0} imageList={listOfImage} autoplay={{
        delay: 900,
        disableOnInteraction: false
    }} navigation={false} effect="fade"/>
  )
}
