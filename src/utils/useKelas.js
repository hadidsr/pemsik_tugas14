import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios';

export const useKelas = () => {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ['kelas'],
    queryFn: async () => {
      const { data } = await axios.get('/kelas');
      return data;
    }
  });

  const tambah = useMutation({
    mutationFn: (data) => axios.post('/kelas', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['kelas'] }),
  });

  const hapus = useMutation({
    mutationFn: (id) => axios.delete(`/kelas/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['kelas'] }),
  });

  return { query, tambah, hapus };
};
