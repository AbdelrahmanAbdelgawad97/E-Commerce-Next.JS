"use client"

import AppButtons from '@/components/Shared/AppButtons/AppButtons'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ShippingAddressType, UserShippingAddress } from './payment.interface'
import { handleCashOrder, handleOnlineOrder } from './payment.action'
import { toast } from 'sonner'
import { CartCreatedContext } from '@/context/CartContext/CartContext'
import { useRouter } from 'next/navigation'

export default function PaymentForm({cartId}:{cartId:string}) {

    const {cartCount, setCartCount} = useContext(CartCreatedContext); 

    const router = useRouter();
    const {handleSubmit, control} = useForm({
        defaultValues:{
            details:"",
            phone:"",
            city:"",
            postalCode:"",
        }
    })

    function creteCashOrder(data:UserShippingAddress) {

        const shippingAddress:ShippingAddressType = {UserShippingAddress:data}

        toast.promise(handleCashOrder(shippingAddress,cartId),{
            loading: "Creating Cash Order Please Wait!",
            success: function() {
                router.push('/');
                setCartCount(0);
                return "Order Created.";
            }
        })
    }

    async function creteOnlineOrder(data:UserShippingAddress) {

        const shippingAddress:ShippingAddressType = {UserShippingAddress:data}
        const url = await handleOnlineOrder(shippingAddress,cartId);
        window.open(url,"_self");
        // toast.promise(handleCashOrder(shippingAddress,cartId),{
        //     loading: "Creating Cash Order Please Wait!",
        //     success: function() {
        //         router.push('/');
        //         setCartCount(0);
        //         return "Order Created.";
        //     }
        // })
    }

  return (
    <>
    
    <form>
    {/* details */}
    <Controller
    name="details"
    control={control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>Details</FieldLabel>
        <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Entry Your Details"
            autoComplete="off"
            className='mb-5 focus-visible:ring-main-color'
            type='text'
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )}
    />

        {/* phone */}
        <Controller
    name="phone"
    control={control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
        <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Entry Your phone number"
            className='mb-5 focus-visible:ring-main-color'
            type='tel'
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )}
    />

        {/* city */}
        <Controller
    name="city"
    control={control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>City</FieldLabel>
        <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Entry Your phone city"
            className='mb-5 focus-visible:ring-main-color'
            type='text'
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )}
    />

        {/* postalCode */}
        <Controller
    name="postalCode"
    control={control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
        <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Entry Your phone postalCode"
            className='mb-5 focus-visible:ring-main-color'
            type='text'
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )}
    />

    <div className='flex'>
        <AppButtons onClick={handleSubmit(creteCashOrder)} className='grow bg-blue-400 hover:bg-blue-400/80 cursor-pointer' type='button'>Create Cash Order</AppButtons>
        <AppButtons onClick={handleSubmit(creteOnlineOrder)} className='grow bg-yellow-400 hover:bg-yellow-400/80 cursor-pointer' type='button'>Create Online Order</AppButtons>
    </div>
        </form>
    </>
  )
}
