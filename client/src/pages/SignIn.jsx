import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' }); // Initialize with empty fields
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to validate form inputs
  const validate = () => {
    // Check if email and password fields are filled
    if (!formData.email || !formData.password) {
      dispatch(signInFailure({ message: "Email and Password are required" }));
      return false;
    }
    // Basic email format validation
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
      dispatch(signInFailure({ message: "Invalid email format" }));
      return false;
    }
    return true;
  };

  // Handle form submission with async API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // Validate before making API call

    try {
      dispatch(signInStart());

      const res = await fetch('/backend/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data)); // Dispatch failure if response is unsuccessful
        return;
      }

      dispatch(signInSuccess(data)); // Dispatch success on successful response
      navigate('/'); // Redirect to home on successful sign-in
    } catch (error) {
      dispatch(signInFailure({ message: "Something went wrong!" })); // Dispatch error on API failure
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="email"
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          value={formData.email} // Controlled input
        />
        <input
          type="password"
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          value={formData.password} // Controlled input
        />
        <button
          disabled={loading}
          className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5 justify-center items-center'>
        <p className='text-gray-500 font-semibold'>Don't have an account?</p>
        <Link to='/sign-up'>
          <span className='text-gray-700 font-semibold'>Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error ? error.message || "Something Went Wrong!" : ''}</p> {/* Display error message */}
    </div>
  );
}

export default SignIn;
