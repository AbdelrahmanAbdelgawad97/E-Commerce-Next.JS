import React from 'react'
import PaymentForm from './PaymentForm';
import { getUserCart } from '@/components/AddToCart/AddToCart.action';

export default async function page() {

    const {cartId} = await getUserCart()

  return (
    <>
        <h1 className='text-8xl text-main-color text-center my-10'>Payment in Fresh Cart</h1>
        <div className='max-w-2xl mx-auto'>
            <PaymentForm cartId={cartId}/>
        </div>
    </>
  )
}
