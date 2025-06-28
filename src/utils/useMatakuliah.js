import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios';

export const useMatakuliah = () => {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ['matakuliah'],
    queryFn: async () => {
      const { data } = await axios.get('/matakuliah');
      return data;
    }
  });

  const tambah = useMutation({
    mutationFn: (data) => axios.post('/matakuliah', data),
    onSuccess: () => qc.invalidateQueries(['matakuliah']),
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => axios.put(`/matakuliah/${id}`, data),
    onSuccess: () => qc.invalidateQueries(['matakuliah']),
  });

  const hapus = useMutation({
    mutationFn: (id) => axios.delete(`/matakuliah/${id}`),
    onSuccess: () => qc.invalidateQueries(['matakuliah']),
  });

  return { query, tambah, update, hapus };
};
