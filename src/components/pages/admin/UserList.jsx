import { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { toast } from 'react-toastify';

export default function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      setUsers(res.data);
    } catch (error) {
      toast.error('Gagal mengambil data user');
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar User</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2 border">No</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border capitalize">{user.role}</td>
                  <td className="p-2 border">
                    <ul className="list-disc list-inside text-left">
                      {user.permissions?.map((p, i) => (
                        <li key={i}>{p}</li>
                      )) || '-'}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">Tidak ada data user</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
