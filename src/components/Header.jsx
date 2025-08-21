import React, { useContext } from 'react';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { NotificationContext } from './NotificationProvider';



const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useContext(NotificationContext);
  const accessToken = useSelector(state => state.auth.accessToken);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authState');
    notify && notify('Logged out successfully', 'success');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">IQsetter CRM</div>
      <div className="navbar-links">
        <a href="/dashboard" className="navbar-link">Dashboard</a>
        <a href="/tasks" className="navbar-link">Tasks</a>
        <a href="/projects" className="navbar-link">Projects</a>
        <a href="/team" className="navbar-link">Team</a>
        {accessToken && (
          <button className="navbar-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }} onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
