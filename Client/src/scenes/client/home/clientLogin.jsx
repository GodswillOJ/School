import React, { useState, useEffect } from 'react';import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

export const RegisterClient = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
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
      formData.append('country', country);
      formData.append('state', state);
      formData.append('phone', phone);
      formData.append('city', city);
      formData.append('file', file); // Append image to form data

      console.log(file)

      await axios.post('https://gotech-ecommerce.onrender.com/api/registerClient', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUsername('');
      setEmail('');
      setPassword('');
      setCountry('');
      setState('');
      setCity('');
      setPhone('');
      setFile(null);
      setLoading(false);
      alert('User added successfully. Proceed to login!');
    } catch (error) {
      console.error('Error adding user:', error.message);
      setError('Error adding user. Please try again.');
      setLoading(false);
    }
  };

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
    "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
    "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the",
    "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
    "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Niger", "Nigeria", "Namibia"
  ];

  return (
    <Form
      onSubmit={handleCreateUser}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      country={country}
      setCountry={setCountry}
      state={state}
      setState={setState}
      city={city}
      setCity={setCity}
      phone={phone}
      setPhone={setPhone}
      file={file}
      setFile={setFile}
      label="Client registration form"
      loading={loading}
      error={error}
      countries={countries} // Pass countries as a prop
    />
  );
};

const Form = ({ onSubmit, username, setUsername, email, setEmail, password, setPassword, country, setCountry, city, setCity, state, setState, phone, setPhone, file, setFile, label, loading, error, countries }) => {
  const isSmallScreen = useMediaQuery(`(max-width: 800px)`)

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
          
          <div style={{
            position: 'relative',
            display: isSmallScreen ? 'block' : 'flex',
            gridTemplateColumns: isSmallScreen ? '1fr' : '2fr',
            gap: '20px',
            flexDirection: isSmallScreen ? 'column' : 'row'
          }}>
            <Box sx={{width: '100%'}}>
            <div>
                <label>State:</label>
                <input type="state" value={state} onChange={(e) => setState(e.target.value)} />
              </div>
              <div>
                <label>City:</label>
                <input type="city" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
            </Box>

            <Box sx={{width: '100%'}}>
            <div>
                <label>Phone:</label>
                <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label>Select Country:</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="">Select country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </Box>
          </div>

          <div id="verify_btn">
            <button type="submit" disabled={loading}>
              {loading ? 'Creating User...' : "Register"}
            </button>
            {label === 'Register' && (
              <div id="redirect_log">
                <Link to="/loginUser">Login</Link>
              </div>
            )}
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <div id="Footer_Dash">
            <Box 
              sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  py: 4, 
                  bgcolor: "background.paper",
                  mt:"1rem",
                  width: "100%"
              }}
          >
              <Box display="flex" justifyContent="center" gap={2}>
                  <IconButton href="https://facebook.com" target="_blank" sx={{ color: "primary.main" }}>
                      <Facebook />
                  </IconButton>
                  <IconButton href="https://twitter.com" target="_blank" sx={{ color: "primary.main" }}>
                      <Twitter />
                  </IconButton>
                  <IconButton href="https://instagram.com" target="_blank" sx={{ color: "primary.main" }}>
                      <Instagram />
                  </IconButton>
                  <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "primary.main" }}>
                      <LinkedIn />
                  </IconButton>
              </Box>
              <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                      &copy; 2024, Developer Godswill Ogono
                  </Typography>
              </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export const LoginClient = () => {
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
      const response = await axios.post('https://gotech-ecommerce.onrender.com/api/loginUser', { username, password });
  
      // Clear inputs only if login is successful
      setUsername('');
      setPassword('');
  
      // Store tokens in localStorage
      console.log('Access Token:', response.data.access_token);
      console.log('User Data:', response.data.userData);
      console.log('UserID:', response.data.userID);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('userID', response.data.userID); // Ensure userID is stored here
  
      navigate('/user/clientDashboard');
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
            <Link to="/registerClient">Register</Link>
          </div>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      
      <div id="Footer_Dash">
            <Box 
              sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  py: 4, 
                  bgcolor: "background.paper",
                  mt:"1rem",
                  width: "100%"
              }}
          >
              <Box display="flex" justifyContent="center" gap={2}>
                  <IconButton href="https://facebook.com" target="_blank" sx={{ color: "primary.main" }}>
                      <Facebook />
                  </IconButton>
                  <IconButton href="https://twitter.com" target="_blank" sx={{ color: "primary.main" }}>
                      <Twitter />
                  </IconButton>
                  <IconButton href="https://instagram.com" target="_blank" sx={{ color: "primary.main" }}>
                      <Instagram />
                  </IconButton>
                  <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "primary.main" }}>
                      <LinkedIn />
                  </IconButton>
              </Box>
              <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                      &copy; 2024, Developer Godswill Ogono
                  </Typography>
              </Box>
          </Box>
      </div>
    </div>
  );
};

export const VerifyClient = () => {
  const { id } = useParams(); // Extract the token and ID parameters from the URL
  const [data, setUserData] = useState(null);
  const [message, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('ID:', id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Start loading before the API call
      try {
        const response = await axios.get(`https://gotech-ecommerce.onrender.com/api/clientVerifyMail/${id}`);
        console.log('User Data:', response.data);
        setUserData(response.data.userID);
        setUserMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
      } finally {
        setLoading(false);  // Stop loading after the API call
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div id="VerifyCont">
      <div id="Verify_info">
        <h1>User Verify Mail</h1>
        <div>
          {data ? (
            <p>
              <b>Hi, {data.username}</b>
              {message} please click to redirect to login <Link to='/loginUser'>proceed to login</Link>
            </p>
          ) : (
            <p>User data not available</p>
          )}
        </div>
      </div>
    </div>
  );
};