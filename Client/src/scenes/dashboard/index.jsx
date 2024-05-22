import React from 'react';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from 'state/api';

const Dashboard = () => {
  const { userID } = useSelector((state) => state.global.user);
  
  // Log the user ID to ensure it's fetched correctly
  console.log('UserProfile component userID:', userID);

  const { data, error, isLoading } = useGetUserQuery(userID);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {data.username}</p>
      <p>Email: {data.email}</p>
      {/* Render other user data */}
    </div>
  );
};

export default Dashboard;
