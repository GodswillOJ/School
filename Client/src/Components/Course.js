import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link, NavLink } from 'react-router-dom';


const Courses_Comp = () => {
  const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Track authentication state
    
  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://personal-site-awu4.onrender.com/api/all_courses');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    setLoading(false)
  }, []);

    const [selectedTimes, setSelectedTimes] = useState({
      Monday: '9:00 AM - 11:00 AM',
      Tuesday: '10:00 AM - 12:00 PM',
      Wednesday: '11:00 AM - 1:00 PM',
      Thursday: '9:30 AM - 11:30 AM',
      Friday: '10:30 AM - 12:30 PM',
    });
    // Function to handle changing the selected time range for a day
  const handleTimeChange = (day, time) => {
    setSelectedTimes({
      ...selectedTimes,
      [day]: time,
    });
  };

    const myImage = 'pexels-fauxels-3184339.jpg';
    const MyImage = 'mansmiling.jpg';

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
          <div className='All_Courses_'>
                      <div>
                            <div className='course_cont'>
                              <div className='all_c'>
                                  <div className='class_online' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${myImage})` }}>
                                    <p>course_info, Get a tutor online. We offer the best tutors that will meet your needs, with much confidence. Click the button below, and get linked to a tutor now. Happy learning</p>
                                    <Link to='/bookOnline'><input type='button' value={'Get started'}/></Link>
                                  </div>
                              </div>
            
                              <div className='all_c'>
                                  <div className='class_onsite' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${MyImage})` }}>
                                    <p>course_info, Contact a tutor onsite. We offer the best tutors that will meet your needs. Click the button below, and get linked to a tutor close to you. Happy learning</p>
                                    <Link to='/bookOnsite'><input type='button' value={'Get started'}/></Link>
                                  </div>
                              </div>
                            </div>
            
                            <div className='course_cat'>
                              <p>Set by Category</p>
                              <ul className='cat_show'>
                                <Link to='/machine_learning/:id'><li><p>Machine Learning</p></li></Link>
                                <Link to='/web_development/:id'><li><p>Web Development</p></li></Link>
                                <Link to='/data_analysis/:id'><li><p>Data Analysis</p></li></Link>
                                <Link to='/artificial_intelligence/:id'><li><p>Artificial Intelligence</p></li></Link>
                              </ul>
                            </div>
            
                            <div className='each_course'>
                              <div className='each_course_container'>
                                          {/* Map through categories and render course info */}
                                      {categories.map(category => {
                                        if (category.name === 'machine_learning') {
                                          return (
                                            <div className='each_c' key={category._id}>
                                              <div className='my_img1'>
                                                <Link to={`/${category.name}/${category._id}`}>
                                                  <img src={`${process.env.PUBLIC_URL}/images/machine.jpg`} alt="My Image" />
                                                </Link>
                                              </div>
                                              <div className='c_information'>
                                                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consectetur ipsum quos repellat facere qui fuga sequi fugiat ea maxime</p>
                                                  <input type='button' value={"Get Course"}/>
                                              </div>
                                            </div>
                                          );
                                        }
                                        return null; // Render nothing if category doesn't match
                                      })}
                                      {categories.map(category => {
                                        if (category.name === 'deep_learning') {
                                          return (
                                            <div className='each_c' key={category._id}>

                                              <div className='my_img1'>
                                                <Link to={`/${category.name}/${category._id}`}>
                                                  <img src={`${process.env.PUBLIC_URL}/images/machine.jpg`} alt="My Image" />
                                                </Link>
                                              </div>

                                              <div className='c_information'>
                                                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consectetur ipsum quos repellat facere qui fuga sequi fugiat ea maxime</p>
                                                  <Link to='/bookOnsite'><input type='button' value={"Get Course"}/></Link>
                                              </div>

                                            </div>
                                          );
                                        }
                                        return null; // Render nothing if category doesn't match
                                      })}
                                      {categories.map(category => {
                                        if (category.name === 'data_analysis') {
                                          return (
                                            <div className='each_c' key={category._id}>
                                              <div className='my_img1'>
                                                <Link to={`/${category.name}/${category._id}`}>
                                                  <img src={`${process.env.PUBLIC_URL}/images/DataAnaly.jpg`} alt="My Image" />
                                                </Link>
                                              </div>
                                              <div className='c_information'>
                                                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consectetur ipsum quos repellat facere qui fuga sequi fugiat ea maxime</p>
                                                  <Link to='/bookOnsite'><input type='button' value={"Get Course"}/></Link>
                                              </div>
                                            </div>
                                          );
                                        }
                                        return null; // Render nothing if category doesn't match
                                      })}
                                      {categories.map(category => {
                                        if (category.name === 'web_development') {
                                          return (
                                            <div className='each_c' key={category._id}>
                                              <div className='my_img1'>
                                                <Link to={`/${category.name}/${category._id}`}>
                                                  <img src={`${process.env.PUBLIC_URL}/images/web.jpg`} alt="My Image" />
                                                </Link>
                                              </div>
                                              <div className='c_information'>
                                                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consectetur ipsum quos repellat facere qui fuga sequi fugiat ea maxime</p>
                                                  <Link to='/bookOnsite'><input type='button' value={"Get Course"}/></Link>
                                              </div>
                                            </div>
                                          );
                                        }
                                        return null; // Render nothing if category doesn't match
                                      })}
                                      {categories.map(category => {
                                        if (category.name === 'artificial_intelligence') {
                                          return (
                                            <div className='each_c' key={category._id}>
                                              <div className='my_img1'>
                                                <Link to={`/${category.name}/${category._id}`}>
                                                    <img src={`${process.env.PUBLIC_URL}/images/AI.jpg`} alt="My Image" />
                                                </Link>
                                              </div>
                                              <div className='c_information'>
                                                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consectetur ipsum quos repellat facere qui fuga sequi fugiat ea maxime</p>
                                                  <Link to='/bookOnsite'><input type='button' value={"Get Course"}/></Link>
                                              </div>
                                            </div>
                                          );
                                        }
                                        return null; // Render nothing if category doesn't match
                                      })}
                              </div>
                              <div className='time-frames'>
                                  <h3>Course Timetable</h3>
                                  <ul className="class-list">
                                    {Object.keys(selectedTimes).map(day => (
                                      <li key={day} className="day-list-item">
                                        <span>{day}</span>
                                        <div className="select-container">
                                          <select
                                            value={selectedTimes[day]}
                                            onChange={(e) => handleTimeChange(day, e.target.value)}
                                          >
                                            <option value=""></option>
                                            <option value="">12:00 AM - 02:00 PM</option>
                                            <option value="">04:00 PM - 12:00 PM</option>
                                          </select>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                              </div>
                            </div>
                      </div>
                                      {/* footer */}
                      <div id="Footer_Dash">
                        <div>
                          <Link to="https://www.linkedin.com/in/godswill-ogono-861802144/"><FontAwesomeIcon icon={faLinkedin} /></Link>
                          <Link to="https://www.twitter.com/"><FontAwesomeIcon icon={faTwitter} /></Link>
                          <Link to="https://www.instagram.com/godswill_oj/"><FontAwesomeIcon icon={faInstagram} /></Link>
                          <Link to="https://api.whatsapp.com/send?phone=2347036744231&text=Hello, more information!"><FontAwesomeIcon icon={faWhatsapp} /></Link>
                          <Link to="https://wwww.facebook.com/"><FontAwesomeIcon icon={faFacebook} /></Link>
                        </div>
                      </div>
          </div>
        )
  }

export default Courses_Comp;