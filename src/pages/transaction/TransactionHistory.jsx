import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionHistory, increaseOffset } from '../../redux/transactionHistorySlice';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const { transactions, offset, limit, hasMore, loading, error } = useSelector((state) => state.transactionHistory);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }
    dispatch(fetchTransactionHistory({ token, offset, limit }));
  }, [dispatch, offset, limit]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleShowMore = () => {
    const token = localStorage.getItem('token');
    dispatch(increaseOffset());
    dispatch(fetchTransactionHistory({ token, offset: offset + limit, limit }));
  };

  return (
    <div className="transaction-history">
      <h2>Semua Transaksi</h2>
      <div className="transaction-list">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <div className="transaction-info" style={{ color: transaction.transaction_type === 'TOPUP' ? 'green' : 'red' }}>
              <div className="transaction-amount">
                {transaction.transaction_type === 'TOPUP' ? '+' : '-'} Rp.{transaction.total_amount.toLocaleString('id-ID')}
              </div>
              <div className="transaction-description">{transaction.description}</div>
            </div>
            <div className="transaction-date">{formatDate(transaction.created_on)}</div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {hasMore && !loading && (
        <div onClick={handleShowMore} className="show-more-text">
          Show More
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;