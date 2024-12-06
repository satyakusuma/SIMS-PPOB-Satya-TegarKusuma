import React from 'react';
import './PembelianKonfirmasi.css';
import logo from '../../assets/Logo.png';

const PembelianKonfirmasi = ({ amount, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <img src={logo} alt="Logo" className="confirmation-logo" />
        <p>Apakah Anda yakin ingin melakukan Top Up senilai</p>
        <h5>Rp{amount} ?</h5>
        <div className="confirmation-actions">
          <span className="confirm-text" onClick={onConfirm}>
            Ya, lanjutkan Bayar
          </span>
          <span className="cancel-text" onClick={onCancel}>
            Batalkan
          </span>
        </div>
      </div>
    </div>
  );
};

export default PembelianKonfirmasi;
