import { AllProductData } from "@/app/home.interface"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AddToCart from "@/components/AddToCart/AddToCart"

export default function ProductCard({prod}:{prod:AllProductData}) {
  const {category,imageCover,id, price,quantity,ratingsAverage, ratingsQuantity, title, priceAfterDiscount} =prod

    return (
    
    <Card className="relative mx-auto w-full max-w-sm pt-0">
        <Link href={`/productDetails/${id}`} >
        <div className=" " />
        <div className="relative h-60">
          {/* for Image next Component should add configurations of images , host , path , protocol */}
          {/* fill give the image component postions absolute */}
          <Image
          fill 
          src={imageCover}
          alt="Event cover"
          className="relative z-20  w-full object-cover "
        />
        </div>
        <CardHeader>
          <CardAction>
            <Badge variant="secondary" className="absolute z-40 top-0 inset-e-0 p-1 bg-main-color text-white m-1.5">{category.name}</Badge>
          </CardAction>
          <CardTitle className="text-main-color font-bold text-center font-larg">{title.split(' ',2).join(' ')}</CardTitle>
          <CardDescription className="text-center text-gray-500 text-lg font-semibold">
            
            <h2>Price: 
            {
              priceAfterDiscount ? 
              <>
              <span className="line-through">{price}</span>
              <span className="text-main-color"> {priceAfterDiscount}</span>
              </>: <span > {price}</span>
            }
            </h2>
            
            <h3>Quantity: {quantity}</h3>
            <div className="flex justify-center">
              {Array.from({length:Math.floor(ratingsAverage)}).map((e, i)=><Star key={i} color="yellow" fill="yellow"/>)}
              {Array.from({length: 5 - Math.floor(ratingsAverage)}).map((e,i)=><Star key={i} color="yellow"/>)}
              <span>({ratingsQuantity})</span>
            </div>
          </CardDescription>
        </CardHeader>
    </Link>
        <CardFooter>
          <AddToCart id={id}/>
        </CardFooter>
      </Card>
  )
}
