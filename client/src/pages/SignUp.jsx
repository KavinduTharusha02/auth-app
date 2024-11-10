import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";
import VerifyOTP from "../components/VerifyOTP";


function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  
  const validate = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }

   
    const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
    if (!usernamePattern.test(formData.username)) {
      setError("Username must be alphanumeric and at least 3 characters long");
      return false;
    }

   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }

    
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(formData.password)) {
      setError("Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character");
      return false;
    }

    setError(null); 
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) return; 
  
    try {
      setLoading(true);
      setError(null);
  
     
      const res = await fetch('/backend/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
  
      if (!res.ok) {
        setError(data.message || "Signup failed. Please try again.");
        return;
      }
  
      
      setFormData({ username: '', email: '', password: '' });
  
     
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error) {
      setLoading(false);
      setError("Something went wrong!"); 
    }
  };
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.password}
        />
        <button
          disabled={loading}
          className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 justify-center items-center">
        <p className="text-gray-500 font-semibold">Already have an account?</p>
        <Link to="/sign-in">
          <span className="text-gray-700 font-semibold">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && error}</p> {}
    </div>
  );
}

export default SignUp;
