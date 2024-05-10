import React, { useState, useEffect } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faMagnifyingGlass, faEnvelope, faPalette } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CounterNav = ({ isLoggedIn, onLogout, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  console.log(userRole)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleBackgroundColor = () => {
    setLightTheme(!lightTheme);
    setDarkTheme(!darkTheme);
    document.body.classList.toggle('light-theme', lightTheme);
    document.body.classList.toggle('dark-theme', darkTheme);
  };

  const handleEnvelopeClick = () => {
    const destination = userRole === 'admin' ? '/adminMessages' : '/messages';
    navigate(destination);
  };

  const handleDashboardClick = () => {
    const destination = userRole === 'admin' ? '/dashboardAdmin' : '/dashboard';
    navigate(destination);
  };

  const logout = () => {
    setCookies('access_token', '');
    localStorage.removeItem('access_token');
    onLogout();
    navigate('/login');
  };

  return (
    <div className="navbar">
      <NavLink to="/" className="logo">
        GOtech
      </NavLink>

      <div id="nav_menu" className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <div id="theme_button" onClick={toggleBackgroundColor}>
          <NavLink>
            <li>
              <FontAwesomeIcon icon={faPalette} />
            </li>
          </NavLink>
        </div>
        <div id="search_user">
          <NavLink>
            <li>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </li>
          </NavLink>
        </div>
        <div onClick={handleEnvelopeClick}>
          <NavLink>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
            </li>
          </NavLink>
        </div>
        <div id="sub_menu_user" onClick={toggleUserMenu}>
          <li className="sub_li">
            <div>
              <NavLink>
                <FontAwesomeIcon icon={faUser} id="icon001" />
                <FontAwesomeIcon icon={faCaretDown} id="icon001" />
              </NavLink>
            </div>
            {isUserMenuOpen && (
              <ul className="submenu">
                <li onClick={handleDashboardClick}>
                  Dashboard
                </li>
                {isLoggedIn ? (
                  <li onClick={logout}>Logout</li>
                ) : (
                  <>
                    <li>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                      <NavLink to="/register">Register</NavLink>
                    </li>
                  </>
                )}
              </ul>
            )}
          </li>
        </div>
        <NavLink to="/About">
          <li>About</li>
        </NavLink>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default CounterNav;
