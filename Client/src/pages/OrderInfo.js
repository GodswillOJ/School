// Client-side code (BookOnline.js)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const BookOnline = () => {
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [userEmail, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          setIsAuthenticated(true);
          const response = await axios.get('https://personal-site-awu4.onrender.com/api/dashboard', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          // Assuming the response contains user data
          console.log(response.data);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Unauthorized');
      }
  
      const response = await axios.post('https://personal-site-awu4.onrender.com/api/bookOnline',{ fullName, userEmail, description },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json' // Make sure to set Content-Type
          }
        }
      );
  
      console.log('Response from server:', response.data);
      // Clear form fields after successful submission
      setFullName('');
      setEmail('');
      setDescription('');
      alert('Course Data Sent to Admin')
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized');
      } else {
        console.error('Error in placing order. Please try again.');
      }
    }
  };
  

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Onsite Tutoring Form</h2>
      <div className="userDashBoard">
        <header className={`nav dropdown fixed-header ${isDropdownOpen ? 'open' : ''}`} id="menu">
          <button id="sub_nav_but" onClick={toggleDropdown}>
            <div id="my_logo">Gotech_dashboard</div>
            <FontAwesomeIcon icon={faCaretDown} id="icon001" />
          </button>
          <ul className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`} id="myDropdown">
          <Link to="/dashboard">
            <li>
              <p>Dashboard</p>
            </li>
          </Link>
          <Link to="">
            <li>
              <p>Profile</p>
            </li>
          </Link>
          <Link to="">
            <li>
              <p>Cart</p>
            </li>
          </Link>
          <Link to="/bookOnline">
            <li>
              <p>Add Course</p>
            </li>
          </Link>
          <Link to="">
            <li>
              <p>Settings</p>
            </li>
          </Link>
          </ul>
        </header>

        <div className="AddOrder_inFo">
           <div className='Course_inquiry'>
              <h2>Online Course Information</h2>
              <div id='myOrder_in'>
                <form onSubmit={handleSubmit}>
                  <div className='Order_form_in'>
                    <label>Full Name:</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div className='Order_form_in'>
                    <label>Email:</label>
                    <input type="text" value={userEmail} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className='Order_form_in'>
                    <label>Description:</label>
                      <label for="myTextarea">Enter your text:</label>
                      <textarea id="myTextarea" placeholder="Write something..." type="text" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>
                  <button type="submit"><h2>Send to Admin</h2></button>
                </form>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default BookOnline;
