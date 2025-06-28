import { useMahasiswa } from '../../../utils/useMahasiswa';
import { useDosen } from '../../../utils/useDosen';
import { useMatakuliah } from '../../../utils/useMatakuliah';
import { useKelas } from '../../../utils/useKelas';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { query: queryMahasiswa } = useMahasiswa();
  const { query: queryDosen } = useDosen();
  const { query: queryMatakuliah } = useMatakuliah();
  const { query: queryKelas } = useKelas();

  if (queryMahasiswa.isLoading || queryDosen.isLoading || queryMatakuliah.isLoading || queryKelas.isLoading) {
    return <p>Loading...</p>;
  }

  const totalAktif = queryMahasiswa.data.filter((m) => m.status).length;
  const totalTidakAktif = queryMahasiswa.data.length - totalAktif;

  const pieData = [
    { name: 'Aktif', value: totalAktif },
    { name: 'Tidak Aktif', value: totalTidakAktif }
  ];

  const barData = queryMatakuliah.data.map((mk) => ({
    name: mk.nama,
    sks: mk.sks
  }));

  const lineData = queryKelas.data.map((kls) => ({
    nama: kls.nama,
    jumlahMahasiswa: kls.mahasiswaIds?.length || 0
  }));

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Status Mahasiswa</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">SKS Mata Kuliah</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Jumlah Mahasiswa per Kelas</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nama" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="jumlahMahasiswa" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
