import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentStatus: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();

  return (
    <div className="text-white text-center text-xl">
      Payment Status Page for Transaction ID: {transactionId}
    </div>
  );
};

export default PaymentStatus;
