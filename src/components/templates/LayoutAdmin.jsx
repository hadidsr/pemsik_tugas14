import { Outlet } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';

export default function LayoutAdmin() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}