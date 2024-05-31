import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from 'state/api';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const { userID } = useSelector((state) => state.global.user);
  
  const { data, error, isLoading } = useGetUserQuery(userID);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {data ? (
        <>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
          {/* Render other user data */}
        </>
      ) : (
        <p>No user data available.</p>
      )}
        <div id="productForm">
            <form>
                <div className="prod_name">
                    <span>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </span>
                    <span>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </span>
                </div>

                <div>

                </div>

                <div>

                </div>

                <div>

                </div>
            </form>
        </div>
        {/* title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '',
        required: true
    },
    images: [{
        type: String,
        default: ''
    }],
    price: {
        type: Number,
        default: 0
    }, */}
    </div>
  );
};

export default AddProduct;
