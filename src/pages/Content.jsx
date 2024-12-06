import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, fetchBalance, resetState } from '../redux/profileSlice';
import './Content.css';
import 'remixicon/fonts/remixicon.css';
import { formatRupiah } from '../utils/formatRupiah';

const Content = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profile, balance, loading, error } = useSelector((state) => state.profile);
    const [showBalance, setShowBalance] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            navigate('/login');
            return;
        }

        dispatch(fetchProfile(token));
        dispatch(fetchBalance(token));
    }, [navigate, dispatch]);

    useEffect(() => {
        if (error) {
            console.error('Error fetching data:', error);
            if (error.status === 108) {
                alert('Sesi Anda telah kadaluwarsa. Silakan login kembali.');
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }, [error, navigate]);

    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
    };

    return (
        <div className="content">
            <div className="header">
                <div className="profile-section">
                    <img src={profile.profile_image} alt="Profile" className="profile-image" />
                    <p>Selamat datang, </p>
                    <h5>{profile.first_name} {profile.last_name}</h5>
                </div>
                <div className="balance">
                    <p>Saldo anda</p>
                    {showBalance ? <p>{formatRupiah(balance)}</p> : <p>*******</p>}
                    <button onClick={toggleBalanceVisibility} className="toggle-button">
                        {showBalance ? ' Sembunyikan Saldo' : ' Tampilkan Saldo'}
                        <i className={showBalance ? "ri-eye-off-line" : "ri-eye-line"}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Content;
