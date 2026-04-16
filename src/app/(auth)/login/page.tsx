import LoginForm from "./LoginForm"

export default function page() {
  return (
    <>
      <h1 className='text-6xl font-extrabold text-main-color text-center py-3'>Welcome to fresh cart</h1>
      
      <div className="max-w-2xl mx-auto my-3">
        <LoginForm />
      </div>
    </>
  )
}
