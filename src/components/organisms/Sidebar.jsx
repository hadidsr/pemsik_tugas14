import { NavLink, useNavigate } from 'react-router-dom';
import { confirmLogout } from '../../helpers/swalHelper';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    const confirm = await confirmLogout();
    if (confirm.isConfirmed) {
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission);
  };

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {user?.role === 'admin' ? 'Admin' : 'User'}
      </h2>
      <nav>
        <ul>
          {/* Dashboard */}
          <li className="mb-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `block p-2 flex items-center rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'}`
              }
            >
              🏠 <span className="ml-2">Dashboard</span>
            </NavLink>
          </li>

          {/* Mahasiswa */}
          {(hasPermission('manage-mahasiswa') || hasPermission('view-mahasiswa')) && (
            <li className="mb-2">
              <NavLink
                to="/admin/mahasiswa"
                className={({ isActive }) =>
                  `block p-2 flex items-center rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'}`
                }
              >
                🎓 <span className="ml-2">Mahasiswa</span>
              </NavLink>
            </li>
          )}

          {/* Dosen */}
          {hasPermission('manage-dosen') && (
            <li className="mb-2">
              <NavLink
                to="/admin/dosen"
                className={({ isActive }) =>
                  `block p-2 flex items-center rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'}`
                }
              >
                👨‍🏫 <span className="ml-2">Dosen</span>
              </NavLink>
            </li>
          )}

          {/* Mata Kuliah */}
          {(hasPermission('manage-matakuliah') || hasPermission('view-matakuliah')) && (
            <li className="mb-2">
              <NavLink
                to="/admin/matakuliah"
                className={({ isActive }) =>
                  `block p-2 flex items-center rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'}`
                }
              >
                📘 <span className="ml-2">Mata Kuliah</span>
              </NavLink>
            </li>
          )}

          {/* Kelas */}
          {hasPermission('manage-kelas') && (
            <li className="mb-2">
              <NavLink
                to="/admin/kelas"
                className={({ isActive }) =>
                  `block p-2 flex items-center rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-800'}`
                }
              >
                🏫 <span className="ml-2">Kelas</span>
              </NavLink>
            </li>
          )}

          {/* Logout */}
          <li className="mt-6 border-t border-blue-700 pt-4">
            <button
              onClick={handleLogout}
              className="w-full text-left p-2 flex items-center rounded hover:bg-red-600"
            >
              🚪 <span className="ml-2">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
