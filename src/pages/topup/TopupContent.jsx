import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiateTopup, resetState } from '../../redux/topupSlice';
import TopupNotif from './TopupNotif';
import './TopupContent.css';
import { InputGroup, FormControl } from 'react-bootstrap';
import { formatRupiah } from '../../utils/formatRupiah';

const TopupContent = () => {
  const dispatch = useDispatch();
  const { message, isTopupSuccess, loading, error } = useSelector((state) => state.topup);
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [showNotif, setShowNotif] = useState(false);

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
    setFormattedAmount(formatRupiah(value));
  };

  const handlePredefinedAmountClick = (amount) => {
    setAmount(amount);
    setFormattedAmount(formatRupiah(amount));
  };

  const handleTopUp = () => {
    if (!amount) {
      alert('Please enter a top-up amount');
      return;
    }
    setShowNotif(true);
  };

  const handleConfirmTopUp = () => {
    setShowNotif(false);
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    dispatch(initiateTopup({ token, amount }));
  };

  const handleCancelTopUp = () => {
    setShowNotif(false);
  };

  useEffect(() => {
    if (isTopupSuccess) {
      setTimeout(() => {
        dispatch(resetState());
        setAmount('');
        setFormattedAmount('');
      }, 3000);
    }
  }, [isTopupSuccess, dispatch]);

  return (
    <div className="topup-container">
      <div className="topup-content">
        <div className="left-column">
          <p>Silahkan masukan</p>
          <h5>Nominal Top Up</h5>
          <InputGroup className='topup-input-group'>
            <FormControl 
              type="text" 
              value={formattedAmount} 
              onChange={handleAmountChange} 
              placeholder="Masukan nominal Top Up" 
              className="topup-input" 
            />
            <i className="ri-bank-card-fill input-icon-left"></i> 
          </InputGroup>
          <button onClick={handleTopUp} className="topup-submit-button" disabled={loading}>
            {loading ? 'Processing...' : 'Top Up'}
          </button>
        </div>
        <div className="right-column">
          <div className="topup-options">
            <button onClick={() => handlePredefinedAmountClick(10000)} className="topup-button">{formatRupiah(10000)}</button>
            <button onClick={() => handlePredefinedAmountClick(20000)} className="topup-button">{formatRupiah(20000)}</button>
            <button onClick={() => handlePredefinedAmountClick(50000)} className="topup-button">{formatRupiah(50000)}</button>
            <button onClick={() => handlePredefinedAmountClick(100000)} className="topup-button">{formatRupiah(100000)}</button>
            <button onClick={() => handlePredefinedAmountClick(250000)} className="topup-button">{formatRupiah(250000)}</button>
            <button onClick={() => handlePredefinedAmountClick(500000)} className="topup-button">{formatRupiah(500000)}</button>
          </div>
        </div>
      </div>
      {message && <p className="topup-message">{message}</p>}
      {showNotif && (
        <TopupNotif 
          amount={amount} 
          onConfirm={handleConfirmTopUp} 
          onCancel={handleCancelTopUp} 
        />
      )}
    </div>
  );
};

export default TopupContent;
