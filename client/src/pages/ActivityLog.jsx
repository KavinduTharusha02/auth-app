// AdminActivityLog.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch('/backend/user/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch activity log from the API
    const fetchActivityLog = async () => {
      try {
        const response = await fetch('https://auth-app-one-rho.vercel.app/backend/admin/activity-log');
        if (!response.ok) {
          throw new Error('Failed to fetch activity log');
        }
        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchActivityLog();
  }, []);

  return (
    <div>
      <Navbar onSignOut={handleSignOut} />
      <h1 className="text-3xl font-bold text-center my-7">User Activity Log</h1>
      {error && <p className="text-red-700">{error}</p>}
      <ul className="list-disc list-inside">
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.username}: {activity.description} at {new Date(activity.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;