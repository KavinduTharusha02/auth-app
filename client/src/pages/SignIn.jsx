import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import{signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice'
import { useDispatch, useSelector } from "react-redux"

function SignIn() {
  const[formData, setFormData] = useState({});
  const{loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    try {
       dispatch(signInStart());
    const res =await fetch('/backend/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if(data.success===false) {
    dispatch(signInFailure(data));
    return;
  }

    dispatch(signInSuccess(data));
    navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60'>
          {loading? 'Loading...': 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5 justify-center items-center'>
  <p className='text-gray-500 font-semibold'>Dont have an account?</p>
  <Link to='/sign-up'>
    <span className='text-gray-700 font-semibold'>Sign Up</span>
  </Link>
</div>
<p className="text-red-700 mt-5">{error ? error.message || "Something Went Wrong!":''}</p>
    </div>
  )
}

export default SignIn