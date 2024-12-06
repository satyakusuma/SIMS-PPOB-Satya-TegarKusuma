import React from 'react';
import './TopupNotif.css';
import logo from '../../assets/Logo.png';
import { formatRupiah } from '../../utils/formatRupiah'

const TopupNotif = ({ amount, onConfirm, onCancel }) => {
  return (
    <div className="notif-overlay">
      <div className="notif-container">
        <img src={logo} alt="Logo" className="notif-logo" />
        <p>Anda yakin untuk Top Up sebesar</p>
        <h2>{formatRupiah(amount)} ?</h2>
        <div className="notif-actions">
          <span className="notif-confirm-text" onClick={onConfirm}>Ya, lanjutkan Top Up</span>
          <span className="notif-cancel-text" onClick={onCancel}>Batalkan</span>
        </div>
      </div>
    </div>
  );
};

export default TopupNotif;