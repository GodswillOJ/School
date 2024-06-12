import React from 'react';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from 'state/api';
import { Link } from '@mui/material'

const VerifyMail = () => {
    const { userID } = useSelector((state) => state.global.user);
  
    const { data, error, isLoading } = useGetUserQuery(userID);
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  

  return (
    <div className="VerifyCont">
        <div>
            <h1>User Verify Mail</h1>
            <div>
                <p>
                    Email verified please click to redirect to login<Link to='/loginUser'> proceed to login</Link>
                </p>
            </div>
        </div>
    </div>
  );
};

export default VerifyMail;
