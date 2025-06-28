import { useState } from 'react';
import Card from '../molecules/Card';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Button from '../atoms/Button';
import axios from '../../api/axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users', { email, password, role });
      alert('Registrasi berhasil!');
      setEmail('');
      setPassword('');
    } catch (err) {
      alert('Gagal mendaftar');
    }
  };

  return (
    <Card>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <Label>Role</Label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <Button type="submit" className="w-full">Daftar</Button>
      </form>
    </Card>
  );
}
