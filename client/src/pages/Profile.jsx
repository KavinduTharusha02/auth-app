import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserStart, updateUserSuccess, updateUserFailure, 
         signInSuccess, 
         deleteUserStart, deleteUserSuccess, deleteUserFailure } from "../redux/user/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading,error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`backend/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success===false){
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  };

  const handleDeleteAccount = async () => {
    try{
      dispatch(deleteUserStart());
        const res = await fetch(`backend/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success===false){
          dispatch(deleteUserFailure(data));
          return;
        }
        dispatch(deleteUserSuccess());
    }catch(error){
      dispatch(deleteUserFailure(error))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          src={currentUser.profilePic}
          alt="Profile"
          className="h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="text"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="text"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-gray-700 text-white rounded-lg p-3 uppercase hover:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteAccount} className="text-red-700 font-semibold cursor-pointer"> Delete Account</span>
        <span className="text-gray-800 font-semibold cursor-pointer">Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error&& 'Something went wrong!'}</p>
      <p className='text-green-500 mt-5'>{updateSuccess&& 'User is updated successfully!'}</p>
    </div>
  );
}

export default Profile;
