import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/serviceSlice';
import './Content.css';
import 'remixicon/fonts/remixicon.css';

const Service = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { services, loading, error } = useSelector((state) => state.service);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            navigate('/login');
            return;
        }

        dispatch(fetchServices(token));
    }, [navigate, dispatch]);

    const handleServiceClick = (service) => {
        navigate('/pembelian', { state: { service } });
    };

    return (
        <div className="services">
            <div className="service-list">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    services.map(service => (
                        <div key={service.service_code} className="service-item" onClick={() => handleServiceClick(service)}>
                            <img src={service.service_icon} alt={service.service_name} className="service-icon" />
                            <div className="service-details">
                                <p className="service-name">{service.service_name}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Service;
