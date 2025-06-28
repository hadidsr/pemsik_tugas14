import { useEffect, useState } from 'react';
import Modal from '../molecules/Modal';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import axios from '../../api/axios';
import Select from 'react-select';

export default function FormTambahKelas({ open, onClose, onSimpan }) {
  const [namaKelas, setNamaKelas] = useState('');
  const [matakuliahId, setMatakuliahId] = useState('');
  const [dosenId, setDosenId] = useState('');
  const [mahasiswaIds, setMahasiswaIds] = useState([]);

  const [matakuliah, setMatakuliah] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);

  useEffect(() => {
    axios.get('/matakuliah').then(res => setMatakuliah(res.data));
    axios.get('/dosen').then(res => setDosen(res.data));
    axios.get('/mahasiswa').then(res => setMahasiswa(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const kelasBaru = {
      nama: namaKelas,
      matakuliahId,
      dosenId,
      mahasiswaIds,
    };

    try {
      await axios.post('/kelas', kelasBaru);
      console.log('Berhasil tambah kelas');
      onSimpan?.();
      onClose?.();
    } catch (err) {
      console.error('Gagal menyimpan kelas:', err);
    }
  };

  const mahasiswaOptions = mahasiswa.map((mhs) => ({
    value: mhs.id,
    label: `${mhs.nama} (${mhs.id}) - Maks SKS: ${mhs.maksSks}`,
  }));

  return (
    <Modal open={open} onClose={onClose} title="Tambah Kelas Baru">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nama Kelas</label>
          <Input value={namaKelas} onChange={(e) => setNamaKelas(e.target.value)} required />
        </div>

        <div>
          <label className="block mb-1">Mata Kuliah</label>
          <select
            value={matakuliahId}
            onChange={(e) => setMatakuliahId(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">-- Pilih --</option>
            {matakuliah.map((mk) => (
              <option key={mk.id} value={mk.id}>{mk.nama} ({mk.sks} SKS)</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Dosen</label>
          <select
            value={dosenId}
            onChange={(e) => setDosenId(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">-- Pilih --</option>
            {dosen.map((dsn) => (
              <option key={dsn.id} value={dsn.id}>
                {dsn.nama} - Maks SKS: {dsn.maksSks}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Mahasiswa</label>
          <Select
            isMulti
            options={mahasiswaOptions}
            onChange={(selected) => setMahasiswaIds(selected.map((s) => s.value))}
            className="text-black"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Modal>
  );
}
