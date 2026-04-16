"use client"

import AppButtons from '@/components/Shared/AppButtons/AppButtons'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { sendUserData } from './register.services'
import {schema} from './register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'





export default function RegisterForm() {
    const {handleSubmit, control} = useForm({
        defaultValues: {
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },
        resolver: zodResolver(schema),
        mode: "all",
    });

  return (
    <form onSubmit={handleSubmit(sendUserData)}>
        {/* Name */}
        <Controller
    name="name"
    control={control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>User Name</FieldLabel>
        <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Entry You Name"
            autoComplete="off"
            className='mb-5 focus-visible:ring-main-color'
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )}
    />
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
        {/* rePassword */}
        <Controller
    name="rePassword"
    control={control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>Confirm Your Password</FieldLabel>
        <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Confirm Your Password"
            autoComplete="off"
            className='mb-5 focus-visible:ring-main-color'
            type='password'
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )}
    />
        {/* */}
        <Controller
    name="phone"
    control={control}
    render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>User Phone</FieldLabel>
        <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Confirm Your Password"
            autoComplete="off"
            className='mb-5 focus-visible:ring-main-color'
            type='tel'
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )}
    />

<p>Already Have An Account ? <Link href='/login' className='text-blue-700 hover:underline'>Sign In</Link></p>
<AppButtons className='w-full bg-main-color hover:bg-main-color/80 cursor-pointer' type='submit'>Submit</AppButtons>
    </form>
  )
}
