// src/helpers/toastHelper.js
import { toast } from 'react-toastify';

export const toastLoginSuccess = () => toast.success('Login berhasil!');
export const toastLoginFail = () => toast.error('Login gagal. Periksa email atau password.');

export const toastSaveSuccess = () => toast.success('Data mahasiswa berhasil ditambahkan!');
export const toastSaveFail = () => toast.error('Gagal menambahkan data!');

export const toastDeleteSuccess = () => toast.success('Data berhasil dihapus!');
export const toastDeleteFail = () => toast.error('Gagal menghapus data!');

export const toastUpdateSuccess = () => toast.success('Data berhasil diperbarui!');
export const toastUpdateFail = () => toast.error('Gagal memperbarui data!');
