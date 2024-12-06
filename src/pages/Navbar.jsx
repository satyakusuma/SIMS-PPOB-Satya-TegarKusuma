import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Logo.png'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="SIMS PPOB Logo" className="navbar-logo" />
                <span>SIMS PPOB</span>
            </div>
            <ul className="navbar-right">
                <li><NavLink to="/topup" className={({ isActive }) => (isActive ? 'active-link' : '')}>Top Up</NavLink></li>
                <li><NavLink to="/transaction" className={({ isActive }) => (isActive ? 'active-link' : '')}>Transaction</NavLink></li>
                <li><NavLink to="/akun" className={({ isActive }) => (isActive ? 'active-link' : '')}>Akun</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
