import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 
  const email = location.state?.email;

  if (!email) {
    setError("Email not found.");
    return;
  }

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/backend/auth/verifyOtp', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'OTP verification failed');
        return;
      }

      
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Verify OTP</h1>
      <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
}

export default VerifyOTP;
