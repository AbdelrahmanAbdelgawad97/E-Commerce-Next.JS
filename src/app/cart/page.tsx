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
    {/* Title */}
    <div className="text-main-color text-3xl sm:text-4xl md:text-5xl font-bold text-center">
      Cart
    </div>

    {/* Summary */}
    <div className="text-center my-6 px-4">
      <h1 className="text-sm sm:text-base md:text-lg">
        Total Cart Price: {products.data.totalCartPrice}
      </h1>
      <h2 className="text-sm sm:text-base md:text-lg">
        Total Cart Number: {products.numOfCartItems}
      </h2>
    </div>

    {/* Table Wrapper */}
    <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-0 overflow-x-auto">
      <Table className="min-w-[600px] sm:min-w-full">

        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products?.data?.products?.length > 0 ? (
            products.data.products.map((item: CartProduct) => (
              <TableRow key={item._id} className="text-sm sm:text-base">

                {/* Product Image */}
                <TableCell>
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                  />
                </TableCell>

                {/* Price */}
                <TableCell>{item.price}</TableCell>

                {/* Count */}
                <TableCell>{item.count}</TableCell>

                {/* Actions */}
                <TableCell className="w-20">
                  {item.count ? (
                    <HandleProductQuantity
                      count={item.count}
                      productId={item.product._id}
                    />
                  ) : null}
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

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full">

          <Link
            href="/cart/payment"
            className="flex-1 text-center px-6 py-3 sm:p-6 rounded-2xl sm:rounded-4xl bg-main-color hover:bg-main-color/80 text-white"
          >
            Pay
          </Link>

          <AppButtons className="flex-1 px-6 py-3 sm:p-6 rounded-2xl sm:rounded-4xl bg-red-600 hover:bg-red-600/80 text-white cursor-pointer">
            Clear
          </AppButtons>

        </div>

      </Table>
    </div>
  </>
);
}
