import Button from '../../atoms/Button';
import FormTambahKelas from '../../organisms/FormTambahKelas';
import { useKelas } from '../../../utils/useKelas';
import { useMatakuliah } from '../../../utils/useMatakuliah';
import { useMahasiswa } from '../../../utils/useMahasiswa';
import { useDosen } from '../../../utils/useDosen';
import { useState } from 'react';

export default function Kelas() {
  const { query: queryKelas, tambah } = useKelas();
  const { query: queryMatkul } = useMatakuliah();
  const { query: queryMhs } = useMahasiswa();
  const { query: queryDosen } = useDosen();

  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  if (queryKelas.isLoading || queryMatkul.isLoading || queryDosen.isLoading || queryMhs.isLoading) {
    return <p>Loading...</p>;
  }

  const matakuliah = queryMatkul.data;
  const dosen = queryDosen.data;
  const mahasiswa = queryMhs.data;

  const getMatkul = (id) => matakuliah.find((m) => m.id === id);
  const getDosen = (id) => dosen.find((d) => d.id === id);
  const getMahasiswaList = (ids) => mahasiswa.filter((m) => ids.includes(m.id));

  const handleSubmitKelas = (dataBaru) => {
    tambah.mutate(dataBaru);
    setIsOpen(false);
  };

  const totalPages = Math.ceil(queryKelas.data.length / rowsPerPage);
  const paginatedData = queryKelas.data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Kelas</h1>
        <Button onClick={() => setIsOpen(true)}>+ Tambah Kelas</Button>
      </div>

      {paginatedData.length === 0 ? (
        <p>Tidak ada kelas.</p>
      ) : (
        paginatedData.map((kls) => {
          const mk = getMatkul(kls.matakuliahId);
          const dsn = getDosen(kls.dosenId);
          const mhsList = getMahasiswaList(kls.mahasiswaIds || []);

          return (
            <div key={kls.id} className="border rounded p-4 mb-4 bg-white shadow">
              <h2 className="text-lg font-semibold">{kls.nama}</h2>
              <p><strong>Mata Kuliah:</strong> {mk?.nama || '-'} ({mk?.sks || 0} SKS)</p>
              <p><strong>Dosen:</strong> {dsn?.nama || '-'}</p>
              <p><strong>Mahasiswa:</strong> {mhsList.length > 0 ? mhsList.map((m) => m.nama).join(', ') : '-'}</p>
            </div>
          );
        })
      )}

      <div className="flex justify-between items-center mt-4">
        <span>Halaman {currentPage} dari {totalPages}</span>
        <div className="space-x-2">
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Sebelumnya</Button>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Berikutnya</Button>
        </div>
      </div>

      {isOpen && (
        <FormTambahKelas
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmitSuccess={handleSubmitKelas}
          matakuliah={matakuliah}
          dosen={dosen}
          mahasiswa={mahasiswa}
        />
      )}
    </div>
  );
}
