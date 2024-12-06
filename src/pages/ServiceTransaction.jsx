import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initiateTransaction, resetState } from '../redux/transactionSlice';
import './ServiceTransaction.css';
import PembelianNotif from '../pages/pembelian/PembelianNotif';
import PembelianFailNotif from '../pages/pembelian/PembelianFailNotif';
import PembelianKonfirmasi from '../pages/pembelian/PembelianKonfirmasi';
import { formatRupiah } from '../utils/formatRupiah';

const ServiceTransaction = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { service } = location.state;
    const { message, isTransactionSuccess, loading, error } = useSelector((state) => state.transaction);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleBayar = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            return;
        }

        dispatch(initiateTransaction({
            token,
            serviceCode: service.service_code,
            amount: service.service_tariff
        }));
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    useEffect(() => {
        if (isTransactionSuccess === true) {
            setTimeout(() => dispatch(resetState()), 5000);
        }
    }, [isTransactionSuccess, dispatch]);

    return (
        <div className="pembelian-container">
            <p>Pembayaran</p>
            <div className="service-info">
                <img src={service.service_icon} alt={service.service_name} className="service-icon" />
                <span>{service.service_name}</span>
            </div>
            <div className="total-nominal">
                <input 
                  type="text" 
                  value={formatRupiah(service.service_tariff)} 
                  readOnly 
                  className="total-nominal-input" 
                />
                <i className="ri-bank-card-fill icon-inside-input"></i>
            </div>
            <button onClick={handleBayar} className="bayar-button" disabled={loading}>
                {loading ? 'Processing...' : 'Bayar'}
            </button>
            {showConfirmation && (
                <PembelianKonfirmasi 
                    amount={service.service_tariff}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
            {isTransactionSuccess === true && <PembelianNotif service={service} />}
            {isTransactionSuccess === false && <PembelianFailNotif service={service} message={message} />}
        </div>
    );
};

export default ServiceTransaction;
