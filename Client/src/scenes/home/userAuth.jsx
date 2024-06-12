// VerifyLogin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null); // New state for the image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('file', file); // Append image to form data

      console.log(file)

      await axios.post('https://gotech-ecommerce.onrender.com/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUsername('');
      setEmail('');
      setPassword('');
      setFile(null);
      setLoading(false);
      alert('User added successfully. Proceed to login!');
    } catch (error) {
      console.error('Error adding user:', error.message);
      setError('Error adding user. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleCreateUser}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      file={file}
      setFile={setFile}
      label="Register"
      loading={loading}
      error={error}
    />
  );
};

const Form = ({ onSubmit, username, setUsername, email, setEmail, password, setPassword, file, setFile, label, loading, error }) => {
  return (
    <div className="Register">
      <div className="CounterCont RegCont">
        <h2 className="Title">Personal Website</h2>
        <form className="Counter_Engine" id="registerInput" onSubmit={onSubmit}>
          <h2>{label}</h2>
          <div className="user_img">
            <label>Profile Image:</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div id="verify_btn">
            <button type="submit" disabled={loading}>
              {loading ? 'Creating User...' : label}
            </button>
            {label === 'Register' && (
              <div id="redirect_log">
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <div id="Footer_Dash">
          <div>
            <Link to="https://www.linkedin.com/in/godswill-ogono-861802144/"><li><FontAwesomeIcon icon={faLinkedin} /></li></Link>
            <Link to="https://www.twitter.com/"><li><FontAwesomeIcon icon={faTwitter} /></li></Link>
            <Link to="https://www.instagram.com/godswill_oj/"><li><FontAwesomeIcon icon={faInstagram} /></li></Link>
            <Link to="https://api.whatsapp.com/send?phone=2347036744231&text=Hello, more information!"><li><FontAwesomeIcon icon={faWhatsapp} /></li></Link>
            <Link to="https://wwww.facebook.com/"><li><FontAwesomeIcon icon={faFacebook} /></li></Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before starting the login process
  
    try {
      const response = await axios.post('https://gotech-ecommerce.onrender.com/api/login', { username, password });
  
      // Clear inputs only if login is successful
      setUsername('');
      setPassword('');
  
      // Store tokens in localStorage
      console.log('Access Token:', response.data.access_token);
      console.log('User Data:', response.data.userData);
      console.log('UserID:', response.data.userID);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('userID', response.data.userID); // Ensure userID is stored here
  
      navigate('/dashboard');
      window.location.reload();
       // Reload the page after navigation
    } catch (error) {
      console.error('Error in verifying user:', error.message);
  
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Error in verifying user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="CounterCont">
      <h2 className="Title">Personal Site</h2>
      <form onSubmit={handleLogin} className="Counter_Engine" id="registerInput">
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div id="verify_btn">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p>Already Have an Account
            <br />
            <Link to='/forget-password'>Forget Password</Link>
          </p>
          <div id="redirect_log">
            <Link to="/registerUser">Register</Link>
          </div>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div id="Footer_Dash">
        <div>
          <Link to="https://www.linkedin.com/in/godswill-ogono-861802144/"><li><FontAwesomeIcon icon={faLinkedin} /></li></Link>
          <Link to="https://www.twitter.com/"><li><FontAwesomeIcon icon={faTwitter} /></li></Link>
          <Link to="https://www.instagram.com/godswill_oj/"><li><FontAwesomeIcon icon={faInstagram} /></li></Link>
          <Link to="https://api.whatsapp.com/send?phone=2347036744231&text=Hello, more information!"><li><FontAwesomeIcon icon={faWhatsapp} /></li></Link>
          <Link to="https://wwww.facebook.com/"><li><FontAwesomeIcon icon={faFacebook} /></li></Link>
        </div>
      </div>
    </div>
  );
};

export const UserVerify = ({ isLoggedIn }) => {
  const { token, id } = useParams(); // Extract the token and ID parameters from the URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  console.log('Token:', token);
  console.log('ID:', id);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          const accessToken = localStorage.getItem('access_token');
          const response = await axios.get(`https://gotech-ecommerce.onrender.com/api/clientVerifyMail/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          console.log('User Data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [isLoggedIn, id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="VerifyCont">
        <div>
            <h1>Admin Verify Mail</h1>
            <div>
                <p>
                    Email verified please click to redirect to login<Link to='/login'> proceed to login</Link>
                </p>
            </div>
        </div>
    </div>
  );
};
