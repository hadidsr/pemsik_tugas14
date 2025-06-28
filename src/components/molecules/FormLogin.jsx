import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';
import Card from './Card';
import { toastLoginSuccess, toastLoginFail } from '../../helpers/toastHelper';

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get('/users', {
        params: {
          email: email.trim(),
          password: password.trim(),
        },
      });

      const user = res.data?.[0];

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        toastLoginSuccess();

        // Arahkan ke layout admin (karena dashboard user juga di dalam /admin)
        setTimeout(() => {
          navigate('/admin'); // fix agar tidak stuck di login
        }, 1000);
      } else {
        toastLoginFail();
      }
    } catch (error) {
      toastLoginFail();
      console.error('Login gagal:', error);
    }
  };

  return (
    <Card>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Button type="submit" className="w-full">Login</Button>
          <Button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full bg-gray-500 hover:bg-gray-600"
          >
            Register
          </Button>
        </div>
      </form>
    </Card>
  );
}
