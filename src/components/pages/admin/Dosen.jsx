import { useState } from 'react';
import Modal from '../../organisms/Modal';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';
import { useDosen } from '../../../utils/useDosen';

export default function Dosen() {
  const { query, tambah, update, hapus } = useDosen();
  const [formData, setFormData] = useState({ id: '', nama: '', maksSks: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      update.mutate({ id: formData.id, data: formData });
    } else {
      tambah.mutate(formData);
    }
    setFormData({ id: '', nama: '', maksSks: '' });
    setEditData(null);
    setIsModalOpen(false);
  };

  const handleEdit = (data) => {
    setFormData(data);
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    hapus.mutate(id);
  };

  if (query.isLoading) return <p>Loading...</p>;
  if (query.error) return <p>Gagal memuat data</p>;

  const totalPages = Math.ceil(query.data.length / rowsPerPage);
  const paginatedData = query.data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Daftar Dosen</h2>
        <Button onClick={() => setIsModalOpen(true)}>+ Tambah</Button>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Maks SKS</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((ds) => (
            <tr key={ds.id}>
              <td className="border px-4 py-2">{ds.id}</td>
              <td className="border px-4 py-2">{ds.nama}</td>
              <td className="border px-4 py-2">{ds.maksSks}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(ds)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(ds.id)} className="text-red-600">Hapus</button>
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
              <Label>ID</Label>
              <Input name="id" value={formData.id} onChange={handleChange} required disabled={!!editData} />
            </div>
            <div>
              <Label>Nama</Label>
              <Input name="nama" value={formData.nama} onChange={handleChange} required />
            </div>
            <div>
              <Label>Maks SKS</Label>
              <Input type="number" name="maksSks" value={formData.maksSks} onChange={handleChange} required />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={() => setIsModalOpen(false)}>Batal</Button>
              <Button type="submit">{editData ? 'Update' : 'Tambah'}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
