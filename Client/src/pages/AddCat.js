import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate for redirection
// import Chart from 'chart.js/auto';
import {D3Chart, AreaPlotChart} from '../Components/D3Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const AddCategory = () => {
  // const [dashboardData, setDashboardData] = useState({});
  const [name, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [tag, setTag] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Track authentication state

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        console.log(accessToken)
        if (accessToken) {
          setIsAuthenticated(true);
          const response = await axios.get('https://personal-site-awu4.onrender.com/api/dashboardAdmin', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          setUserData(response.data);
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
  
      const response = await axios.post('https://personal-site-awu4.onrender.com/api/addCategory', 
        { name: name, tags: tag, description: description },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
  
      console.log('Category added successfully:', response.data);
      setCategoryName('');
      alert('Category added successfully. Proceed to login!');
    } catch (error) {
      console.error('Error adding category:', error);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized'); // Handle unauthorized error
      } else {
        setError('Error in adding course category. Please try again.');
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
    return <Navigate to="/loginAdmin" />; // Redirect unauthorized users to login page
  }
  
  
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
            <h2>Dashboard</h2>
            {userData && (
              <div>
                <div className="userDashBoard">
                    <header className={`nav dropdown fixed-header ${isDropdownOpen ? 'open' : ''}`} id="menu">
                      <button id="sub_nav_but" onClick={toggleDropdown}>
                        <div id="my_logo">Gotech_dashboard</div>
                        <FontAwesomeIcon icon={faCaretDown} id="icon001" />
                      </button>
                      <ul className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`} id="myDropdown">
                        <Link to="/dashboardAdmin"><li><p>Dashboard</p></li></Link>
                        <Link to=""><li><p>Profile</p></li></Link>
                        <Link to=""><li><p>Add Course</p></li></Link>
                        <Link to=""><li><p>Settings</p></li></Link>
                        <Link to=""><li><p>Add Data</p></li></Link>
                        <Link to="/messageUser"><li><p>Messages</p></li></Link>
                      </ul>
                    </header>


                    <div className="AddCat">
                        <div className="cat_container">
                            <div className="cats">
                                <div className="about_us">
                                    <p> Follow us on facebook. Like our post on Instagram and linkedIn Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, necessitatibus.</p>
                                    <div className="about_links">
                                        <Link to="#"><input type="submit" value={"facebook"} /></Link>
                                        <Link to="#"><input type="submit" value={"linkedIn"} /></Link>
                                    </div>
                                </div>
                                <div className="email_cat">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sapiente dolorum ipsam doloremque animi labore sint doloribus officiis obcaecati fuga?</p>
                                    <input type="submit" value={"Get Started"} />
                                </div>
                                <div className="search_cat">
                                    <input type="text" name="search_category" />
                                    <button>Search Category</button>
                                </div>
                                <div className="add_cat">
                                    <form onSubmit={handleSubmit} className="cat_form">
                                        <div className="cat_name">
                                            <label>Name</label>
                                            <input type="text" value={name} onChange={(e) => setCategoryName(e.target.value)} />
                                        </div>
            
                                        <div className="cat_name">
                                            <label>Tag</label>
                                            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
                                        </div>
            
                                        <div className="cat_name">
                                            <label>Description</label>
                                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>
            
                                        <div className="show_cats">
                                            <div className="cat_info">
                                                <div><input type="submit" className="edit_add" /></div>
                                                <p>Edit Categories</p>
                                            </div>
                
                                            <div className="show_tags">
            
                                                    <div className="single_tag" >
                                                        <input type="checkbox" className="tick_cat"  />
                                                        <h4></h4>
                                                    </div>
                                            </div>
                
                                            <div className="">
                                            <button type="submit" disabled={loading}>
                                              {'Apply'}
                                            </button>
                                            </div>
                                        </div>
                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                    </form>
                                </div>
            
                            </div>
                         </div>
                    </div>


                </div>
              </div>
            )}
      </div>
    );
}

export default AddCategory;
