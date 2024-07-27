import { create } from 'zustand';
import { Article } from '../types/Article';
import { fetching } from '../api/api';

type Store = {
  articles: Article[],
  loading: boolean,
  error: string,
  fetch: () => Promise<void>,
};

export const useStore = create<Store>(set => ({
  articles: [],
  loading: false,
  error: '',

  fetch: async () => {
    set({ loading: true });
    try {
      const response = await fetching();
      set({ articles: response });
    } catch {
      set({ error: 'Error fetching' });
    } finally {
      set({ loading: false });
    }
  },
}));
