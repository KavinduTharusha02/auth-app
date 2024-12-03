import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Adminprofile from "./pages/Adminprofile"
import PrivateRoute from "./components/PrivateRoute"
import VerifyOTP from "./components/VerifyOTP";
import ActivityLog from "./pages/ActivityLog";

function App() {
  return (
    <BrowserRouter>
    {/* Header */}
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOTP />} /> {/* OTP Verification Route */}
      <Route element={<PrivateRoute />} >
      <Route path="/profile" element={<Profile />} />
      <Route path="/activity-log" element={<ActivityLog />} />
      <Route path="/adminprofile" element={<Adminprofile />} />
      </Route>
     </Routes>
    </BrowserRouter>
  );
};

export default App
