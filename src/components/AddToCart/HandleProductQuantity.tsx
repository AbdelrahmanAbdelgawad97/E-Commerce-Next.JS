"use client"
import { toast } from 'sonner';
import AppButtons from '../Shared/AppButtons/AppButtons'
import { Input } from '../ui/input'
import { handleProductQuantity, handleRemoveProduct } from './AddToCart.action';

export default function HandleProductQuantity({count, productId}:{count:number, productId:string}) {

    function handelProductCount(count:number) {
        const data = {count};
        toast.promise(
            handleProductQuantity(data , productId),
            {
                loading: "Handle Quantity Now...",
                success: "Product Quantity Updated",
            }
        )
    }

    function handelDeleteProduct() {
        const data = {count};
        toast.promise(
            handleRemoveProduct( productId),
            {
                loading: "Handle Delete Now...",
                success: "Product Deleted Successfully!",
            }
        )
    }

  return (
    <>
        <div>
            <AppButtons onClick={function() { handelProductCount(count + 1)}}>+</AppButtons>
            <Input type="text"  value={count} className="w-10"/>
            <AppButtons onClick={function() { handelProductCount(count - 1)}}>-</AppButtons>
        </div>
        <AppButtons onClick={handelDeleteProduct} variant="destructive" className="w-full cursor-pointer">Remove</AppButtons>
    </>

  )
}
