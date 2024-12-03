import { Link } from "react-router-dom"
import { useSelector } from "react-redux" 


function NavBar() {
    const {currentUser} = useSelector((state) => state.user);
  return (
    <div className='bg-slate-200'>
<div className="flex justify-between items-center max-w-6xl mx-auto p-3">
    <Link to='/activity-log'>
    <h1 className='font-bold'>Authentication App</h1>
    </Link>
    <ul className='flex gap-4'>
    <Link to='/activity-log'>
        <li>Activity Log</li>
        </Link>
   
    <Link to='/adminprofile'>
    {currentUser ? (
<img src = {currentUser.profilePic} alt = {currentUser.name} className='w-7 h-7 rounded-full'/>
    ):(
    <li>Sign In</li>
    )}
        </Link>
    </ul>
</div>
    </div>
  )
}

export default NavBar
