import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Halaman publik
import Login from './components/pages/Login';
import Register from './components/pages/Register';

// Halaman admin
import Kelas from './components/pages/admin/Kelas';
import LayoutAdmin from './components/templates/LayoutAdmin';
import Dashboard from './components/pages/admin/Dashboard';
import Mahasiswa from './components/pages/admin/Mahasiswa';
import MahasiswaDetail from './components/pages/admin/MahasiswaDetail';
import Dosen from './components/pages/admin/Dosen';
import MataKuliah from './components/pages/admin/MataKuliah';
import UserList from './components/pages/admin/UserList'; // ⬅️ Tambahkan ini

// Proteksi login
import ProtectedRoute from './components/routes/ProtectedRoute';

export default function App() {
  return (
    <>
      <Routes>
        {/* Halaman publik */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman admin yang butuh login */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:id" element={<MahasiswaDetail />} />
          <Route path="dosen" element={<Dosen />} />
          <Route path="matakuliah" element={<MataKuliah />} />
          <Route path="users" element={<UserList />} /> {/* ⬅️ Ini yang ditambahkan */}
          <Route path="kelas" element={<Kelas />} />
        </Route>

        {/* Redirect ke halaman utama jika route tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Komponen notifikasi */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}
