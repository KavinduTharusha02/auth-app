import { useSelector } from "react-redux"

function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-3xl font-bold text-center my-7 '>Profile</h1>
     <form className='flex flex-col gap-4'>
      <img src={currentUser.profilePic} alt="Profile" className='h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2'/>
      <input defaultValue={currentUser.username} type="text" id='usrename' placeholder='Username' className='bg-slate-100 rounded-lg p-3' />
      <input defaultValue={currentUser.email} type="text" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3' />
      <input type="text" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3' />
      <button className="bg-gray-700 text-white rounded-lg p-3 uppercase hover:opacity-80">Update</button>
     </form>
     <div className="flex justify-between mt-5">
      <span className='text-red-700 font-semibold cursor-pointer'>Delete Account</span>
      <span className='text-gray-800 font-semibold cursor-pointer'>Sign Out</span>
     </div>
    </div>
  )
}

export default Profile
