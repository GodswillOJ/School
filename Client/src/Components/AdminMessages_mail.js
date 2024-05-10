import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


function MessageComp() {
  // const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setSelectedMessage] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Track authentication state


// In your MessageComp component:
useEffect(() => {
  const fetchMessages = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        setIsAuthenticated(true);
        const response = await axios.get('https://personal-site-awu4.onrender.com/api/adminMessages', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setSelectedMessage(response.data);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Update state to indicate error
    } finally {
      setLoading(false);
    }
  };
  fetchMessages();
}, []);

const [isDropdownOpen, setDropdownOpen] = useState(false);

const toggleDropdown = () => {
  setDropdownOpen((prevOpen) => !prevOpen);
};


  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect unauthorized users to login page
  }


  return (
    <div className="Message_c">
      <header className={`nav dropdown fixed-header ${isDropdownOpen ? 'open' : ''}`} id="menu">
        <button id="sub_nav_but" onClick={toggleDropdown}>
          <div id="my_logo">Gotech_dashboard</div>
          <FontAwesomeIcon icon={faCaretDown} id="icon001" />
        </button>
        <ul className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`} id="myDropdown">
        <Link to="/dashboardAdmin"><li><p>Dashboard</p></li></Link>
                  <Link to=""><li><p>Profile</p></li></Link>
                  <Link to=""><li><p>Add Data</p></li></Link>
                  <Link to=""><li><p>Add Course</p></li></Link>
                  <Link to=""><li><p>Settings</p></li></Link>
        </ul>
      </header>

      <div className="AddOrder_inFo">
           <div className='Course_inquiry'>
            <div className='Messages_container'>
              <><Link to="/messageUser"><p className='View_Mail'>Send Mail</p></Link></>
              <h1>Messages</h1>
              <div>Hi this are the messages page</div>
              <div className="message-list">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={messages === message ? 'message selected' : 'message'}
                    onClick={() => handleSelectMessage(message)}
                  >
                    {message.content}
                  </div>
                ))}
              </div>
            </div>
           </div>
        </div>

    </div>
  );
}

export default MessageComp;
