// src/utils/useDosen.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios';

export const useDosen = () => {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ['dosen'],
    queryFn: async () => {
      const { data } = await axios.get('/dosen');
      return data;
    }
  });

  const tambah = useMutation({
    mutationFn: (data) => axios.post('/dosen', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dosen'] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => axios.put(`/dosen/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dosen'] }),
  });

  const hapus = useMutation({
    mutationFn: (id) => axios.delete(`/dosen/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dosen'] }),
  });

  return { query, tambah, update, hapus };
};
