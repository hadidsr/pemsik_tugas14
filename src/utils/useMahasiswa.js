import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios';

export const useMahasiswa = () => {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ['mahasiswa'],
    queryFn: async () => {
      const { data } = await axios.get('/mahasiswa');
      return data;
    }
  });

  const tambah = useMutation({
    mutationFn: (data) => axios.post('/mahasiswa', data),
    onSuccess: () => qc.invalidateQueries(['mahasiswa']),
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => axios.put(`/mahasiswa/${id}`, data),
    onSuccess: () => qc.invalidateQueries(['mahasiswa']),
  });

  const hapus = useMutation({
    mutationFn: (id) => axios.delete(`/mahasiswa/${id}`),
    onSuccess: () => qc.invalidateQueries(['mahasiswa']),
  });

  return { query, tambah, update, hapus };
};
