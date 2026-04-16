"use client"
import AppButtons from '@/components/Shared/AppButtons/AppButtons'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import {schema} from "./LoginSchema"
import { zodResolver } from '@hookform/resolvers/zod'
import sendUserLogin from './login.services'
import { toast } from 'sonner'
import { redirect, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import gLogo from "@images/g-logo.png";
import Image from 'next/image'

type LoginData = {
  email: string;
  password: string;
};

export default function LoginForm() {

    const router = useRouter();

    const {handleSubmit,control} = useForm({
        defaultValues: {
            email:"",
            password:"",
        },
        resolver: zodResolver(schema),
    })

    async function hamadaLogin (data:LoginData) {
        // const signInResponse = await signIn("credentials",{...data, redirect: true, callbackUrl: '/'})
        // console.log(signInResponse);
        toast.promise(signIn("credentials",{...data, redirect: false}),{
        loading: "Loading",
        success: function() {

            // router.push('/');
            location.href = '/'
            return "welcome";
        },
        error: "InCorrect Email Or Password"
    })
    }

  return (
    <>
    <form onSubmit={handleSubmit(hamadaLogin)}>


    {/* email */}
    <Controller
    name="email"
    control={control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>E-Mail</FieldLabel>
        <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Entry Your Email"
            autoComplete="off"
            className='mb-5 focus-visible:ring-main-color'
            type='email'
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )}
    />

        {/* password */}
        <Controller
    name="password"
    control={control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
        <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Entry Your Password"
            autoComplete="new-password"
            className='mb-5 focus-visible:ring-main-color'
            type='password'
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )}
    />


    <p>Don't Have An Account ? <Link href='/register' className='text-blue-700 hover:underline'>Sign UP</Link></p>
    <AppButtons className='w-full bg-main-color hover:bg-main-color/80 cursor-pointer' type='submit'>Login</AppButtons>
        </form>
    <div className='flex gap-2 my-3'>
    <Button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center justify-center gap-3 w-full py-6 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition cursor-pointer"
    >
      <Image
        src={gLogo}
        alt="Google"
        className="w-5 h-5"
      />
      <span className="font-medium text-gray-700">
        Continue with Google
      </span>
    </Button>        {/* <Button variant="outline" className='grow cursor-pointer'>Face Book</Button> */}
    </div>
    
    </>
  )
}

/* 

    1- create your project in google cloud


*/