import React from 'react';
import useOrderStore from '../store/useOrderStore';

const OrderReview: React.FC = () => {
  const { prompt, name, nim, major } = useOrderStore((state) => ({
    prompt: state.prompt,
    name: state.name,
    nim: state.nim,
    major: state.major,
  }));

  const handlePaymentClick = () => {
    console.log('Lanjut ke Pembayaran...');
    // Di sini Anda bisa menambahkan logika navigasi ke halaman pembayaran
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Konfirmasi Pesanan</h2>
      <div className="bg-gray-100 p-4 rounded-lg space-y-2">
        <p className="text-gray-700"><span className="font-semibold">Prompt:</span> {prompt}</p>
        <p className="text-gray-700"><span className="font-semibold">Nama Lengkap:</span> {name}</p>
        <p className="text-gray-700"><span className="font-semibold">NIM:</span> {nim}</p>
        <p className="text-gray-700"><span className="font-semibold">Jurusan:</span> {major}</p>
      </div>

      <div className="text-center mt-4">
        <p className="text-3xl font-bold text-green-600">Harga Total: Rp 5.000</p>
      </div>

      <button
        onClick={handlePaymentClick}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Lanjutkan ke Pembayaran
      </button>
    </div>
  );
};

export default OrderReview;
