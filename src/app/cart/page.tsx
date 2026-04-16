import { getUserCart } from "@/components/AddToCart/AddToCart.action"
import HandleProductQuantity from "@/components/AddToCart/HandleProductQuantity";
import AppButtons from "@/components/Shared/AppButtons/AppButtons";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";


type CartProduct = {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
};

type Cart = {
  totalCartPrice: number;
  products: CartProduct[];
};

type GetUserCartResponse = {
  data: Cart;
  numOfCartItems: number;
};

export default async function page() {

  const products = await getUserCart();
  return (
    <>
      <div className='text-main-color text-5xl font-bold text-center'>Cart</div>
      <div className="text-center my-6">
        <h1>Total Cart Price: {products.data.totalCartPrice}</h1>
        <h2>Total Cart Number: {products.numOfCartItems}</h2>
      </div>

      <div className="fixed flex gap-5 top-52 inset-e-10">
        <Link href="/cart/payment" className="p-6 rounded-4xl bg-main-color hover:bg-main-color/80 text-white">Pay</Link>
        <AppButtons className="p-6 rounded-4xl bg-red-600 hover:bg-red-600/80 text-white">Clear</AppButtons>
      </div>

      <div className="max-w-3xl mx-auto">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/7">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead >Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.data?.products?.length > 0 ? (
              products.data.products.map((item:CartProduct) => (
                <TableRow key={item._id}>
                  {/* Product Image */}
                  <TableCell>
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </TableCell>

                  {/* Price */}
                  <TableCell>{item.price}</TableCell>

                  {/* Count */}
                  <TableCell>{item.count}</TableCell>

                  {/* Quantity Controller */}
                  <TableCell className="w-20">
                    {item.count ? <HandleProductQuantity
                      count={item.count}
                      productId={item.product._id}
                    /> : ""}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-5">
                  No products in cart
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
