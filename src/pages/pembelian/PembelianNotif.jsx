import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PembelianNotif.css';
import logo from '../../assets/checklist.png'; 

const PembelianNotif = ({ service }) => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/homepage');
    };

    return (
        <div className="notif-overlay">
            <div className="notif-container">
                <img src={logo} alt="Logo" className="notif-logo" />
                <p>Pembayaran {service.service_name} sebesar</p>
                <h2>Rp{service.service_tariff}</h2>
                <p> berhasil!</p>
                <span onClick={handleBackToHome} className="back-home-link">Kembali ke Beranda</span>
            </div>
        </div>
    );
};

export default PembelianNotif;
