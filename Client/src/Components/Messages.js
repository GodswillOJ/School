import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


function MessageComp() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewedMessages, setViewedMessages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          setIsAuthenticated(true);
          const response = await axios.get('https://personal-site-awu4.onrender.com/api/messages', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          // Sort messages in descending order based on their IDs
          const sortedMessages = response.data.messages.sort((a, b) => b._id.localeCompare(a._id));
          setMessages(sortedMessages);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(prevOpen => !prevOpen);
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    // Add the ID of the selected message to the viewedMessages state
    setViewedMessages(prevViewedMessages => [...prevViewedMessages, message._id]);
  };

  const isMessageViewed = (message) => {
    // Check if the message ID exists in the viewedMessages state
    return viewedMessages.includes(message._id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="Message_c">
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
        <div className="Course_inquiry">
          <div className="Messages_container">
            <>
              {/* Send Mail Link */}
              <Link to="/sendAdmin_Inquiry">
                <p className="View_Mail">Send Mail</p>
              </Link>
            </>
            <h1>Messages</h1>
            {/* Render messages */}
            {messages.length === 0 ? (
              <div>There are no messages in this page yet.</div>
            ) : (
              <div className="message-list">
                <ul>
                  {messages.map((message) => (
                    <li key={message._id} onClick={() => handleSelectMessage(message)} className={isMessageViewed(message) ? 'viewed' : ''}>
                      {message.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageComp;
