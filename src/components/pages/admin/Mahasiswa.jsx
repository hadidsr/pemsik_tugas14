import { useState, useEffect } from 'react'; 
import axios from 'axios';
import Modal from '../../organisms/Modal';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';
import { confirmDelete, confirmSaveChanges } from '../../../helpers/swalHelper';
import {
  toastSaveSuccess,
  toastSaveFail,
  toastDeleteSuccess,
  toastDeleteFail,
  toastUpdateSuccess,
  toastUpdateFail
} from '../../../helpers/toastHelper';

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [formData, setFormData] = useState({ id: '', nama: '', status: true, maksSks: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    axios.get('https://eccd6277-afea-426b-aba1-422b4813e01d-00-2epbxcrcodpzx.sisko.replit.dev/mahasiswa').then((res) => setMahasiswa(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.nama) {
      toastSaveFail();
      return;
    }

    try {
      if (editIndex !== null) {
        const confirm = await confirmSaveChanges();
        if (!confirm.isConfirmed) return;
        await axios.put(`https://eccd6277-afea-426b-aba1-422b4813e01d-00-2epbxcrcodpzx.sisko.replit.dev/mahasiswa/${formData.id}`, formData);
        const updated = [...mahasiswa];
        updated[editIndex] = formData;
        setMahasiswa(updated);
        toastUpdateSuccess();
      } else {
        await axios.post('https://eccd6277-afea-426b-aba1-422b4813e01d-00-2epbxcrcodpzx.sisko.replit.dev/mahasiswa', formData);
        setMahasiswa([...mahasiswa, formData]);
        toastSaveSuccess();
      }

      setIsModalOpen(false);
      setFormData({ id: '', nama: '', status: true, maksSks: '' });
      setEditIndex(null);
    } catch (error) {
      toastSaveFail();
    }
  };

  const handleEdit = (index) => {
    setFormData(mahasiswa[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = async (index) => {
    const confirm = await confirmDelete();
    if (confirm.isConfirmed) {
      try {
        const deleted = mahasiswa[index];
        await axios.delete(`https://eccd6277-afea-426b-aba1-422b4813e01d-00-2epbxcrcodpzx.sisko.replit.dev/mahasiswa/${deleted.id}`);
        setMahasiswa(mahasiswa.filter((_, i) => i !== index));
        toastDeleteSuccess();
      } catch (error) {
        toastDeleteFail();
      }
    }
  };

  const totalPages = Math.ceil(mahasiswa.length / rowsPerPage);
  const paginatedData = mahasiswa.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Daftar Mahasiswa</h2>
        <Button onClick={() => setIsModalOpen(true)}>+ Tambah</Button>
      </div>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">NIM</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Maks SKS</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((mhs, i) => (
            <tr key={mhs.id}>
              <td className="border px-4 py-2">{mhs.id}</td>
              <td className="border px-4 py-2">{mhs.nama}</td>
              <td className="border px-4 py-2">{mhs.status ? 'Aktif' : 'Tidak Aktif'}</td>
              <td className="border px-4 py-2">{mhs.maksSks}</td>
              <td className="border px-4 py-2">
                <button className="text-blue-600 mr-2" onClick={() => handleEdit((currentPage - 1) * rowsPerPage + i)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete((currentPage - 1) * rowsPerPage + i)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <span>Halaman {currentPage} dari {totalPages}</span>
        <div className="space-x-2">
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Sebelumnya</Button>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Berikutnya</Button>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="id">NIM</Label>
              <Input name="id" value={formData.id} onChange={handleChange} required disabled={editIndex !== null} />
            </div>
            <div>
              <Label htmlFor="nama">Nama</Label>
              <Input name="nama" value={formData.nama} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="maksSks">Maks SKS</Label>
              <Input type="number" name="maksSks" value={formData.maksSks} onChange={handleChange} required />
            </div>
            <div>
              <Label>
                <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} /> Aktif
              </Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={() => setIsModalOpen(false)}>Batal</Button>
              <Button type="submit">{editIndex !== null ? 'Update' : 'Tambah'}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
