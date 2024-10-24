import { Link } from "react-router-dom"

function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg'/>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg'/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg'/>
        <button className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60'>Sign Up</button>
      </form>

      <div className='flex gap-2 mt-5 justify-center items-center'>
  <p className='text-gray-500 font-semibold'>Already have an account?</p>
  <Link to='/sign-in'>
    <span className='text-gray-700 font-semibold'>Sign In</span>
  </Link>
</div>

    </div>
  )
}

export default SignUp
