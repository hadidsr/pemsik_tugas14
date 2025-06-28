import { useParams } from 'react-router-dom';

export default function MahasiswaDetail() {
  const { id } = useParams();
  return <div>Detail Mahasiswa dengan NIM: {id}</div>;
}
