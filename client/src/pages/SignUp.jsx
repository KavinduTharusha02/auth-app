import { Link } from "react-router-dom"
import { useState } from "react"

function SignUp() {
  const[formData, setFormData] = useState({});
  const[error, setError] = useState(false);
  const[loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false); 
    const res =await fetch('/backend/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  console.log(data);
  setLoading(false);
  if(data.success===false) {
    setError(true);
    return;
  }
    
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60'>
          {loading? 'Loading...': 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5 justify-center items-center'>
  <p className='text-gray-500 font-semibold'>Already have an account?</p>
  <Link to='/sign-in'>
    <span className='text-gray-700 font-semibold'>Sign In</span>
  </Link>
</div>
<p className="text-red-700 mt-5">{error && "Something Went Wrong!"}</p>
    </div>
  )
}

export default SignUp
