import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from 'state/api';
import 'index.css'

const AddProduct = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNewProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('title', title);
      formData.append('detail', detail);
      formData.append('file', file);

      console.log(file);

      await axios.post('https://gotech-ecommerce.onrender.com/api/add_product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setName('');
      setTitle('');
      setPrice('');
      setDetail('');
      setFile(null);
      setLoading(false);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error.message);
      setError('Error adding product. Please try again.');
      setLoading(false);
    }
  };

  const { userID } = useSelector((state) => state.global.user);
  const { data, error: userError, isLoading } = useGetUserQuery(userID);

  if (isLoading) return <div>Loading...</div>;
  if (userError) return <div>Error: {userError.message}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {data ? (
        <>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
        </>
      ) : (
        <p>No user data available.</p>
      )}
      <div id="productForm">
        <form onSubmit={handleNewProduct}>
          <div id="prod_name">
            <span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              <label>Product Name</label>
            </span>
            <span>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <label>Product Title</label>
            </span>
          </div>

          <div className="user_img">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            <label>Product Image</label>
          </div>
          
          <div>
            <input type="text" value={price} onChange={(e) => setDetail(e.target.price)} required />
            <label>price</label>
          </div>

          <div>
            <textarea type="text" value={detail} onChange={(e) => setDetail(e.target.price)} required />
            <label>Product detail</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Add Product'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
