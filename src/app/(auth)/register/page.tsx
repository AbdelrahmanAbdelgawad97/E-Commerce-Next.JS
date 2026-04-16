import React from 'react'
import RegisterForm from './RegisterForm'

export default function page() {
  return (
    <>
      <div className='text-5xl text-main-color text-center font-extrabold my-5'>Register</div>
      <div className='max-w-2xl mx-auto'>
        <RegisterForm />
      </div>
    </>
  )
}
