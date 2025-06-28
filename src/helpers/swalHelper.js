// src/helpers/swalHelper.js
import Swal from 'sweetalert2';

export const confirmDelete = () => {
  return Swal.fire({
    title: 'Yakin ingin menghapus?',
    text: 'Data mahasiswa akan dihapus permanen!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  });
};

export const confirmSaveChanges = () => {
  return Swal.fire({
    title: 'Simpan Perubahan?',
    text: 'Data mahasiswa akan diperbarui!',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Simpan!',
    cancelButtonText: 'Batal'
  });
};

export const confirmLogout = () => {
  return Swal.fire({
    title: 'Logout?',
    text: 'Anda akan keluar dari sistem.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal'
  });
};
