import React from 'react';
import useOrderStore from '../store/useOrderStore';

const UserInfoForm: React.FC = () => {
  const { name, nim, major, setUserInfo } = useOrderStore((state) => ({
    name: state.name,
    nim: state.nim,
    major: state.major,
    setUserInfo: state.setUserInfo,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !nim || !major) {
      alert('Harap lengkapi semua field: Nama Lengkap, NIM, dan Jurusan.');
      return;
    }

    console.log('Data Pengguna Valid:', { name, nim, major });
    // Di sini Anda bisa menambahkan logika untuk melanjutkan ke konfirmasi
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Informasi Pengguna</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            value={name}
            onChange={(e) => setUserInfo({ name: e.target.value, nim, major })}
          />
        </div>
        <div>
          <label htmlFor="nim" className="block text-sm font-medium text-gray-700">NIM</label>
          <input
            type="text"
            id="nim"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            value={nim}
            onChange={(e) => setUserInfo({ name, nim: e.target.value, major })}
          />
        </div>
        <div>
          <label htmlFor="major" className="block text-sm font-medium text-gray-700">Jurusan</label>
          <input
            type="text"
            id="major"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            value={major}
            onChange={(e) => setUserInfo({ name, nim, major: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Lanjutkan ke Konfirmasi
        </button>
      </form>
    </div>
  );
};

export default UserInfoForm;