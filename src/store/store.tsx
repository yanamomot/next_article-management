import { create } from "zustand";
import { Article } from "../types/Article";
import { fetching, deleteItem, createItem, updateItem } from "../api/api";

type Store = {
  articles: Article[];
  error: string;
  fetch: () => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  createItem: (
    title: string,
    description: string,
    url: string
  ) => Promise<void>;
  updateItem: (
    title: string,
    description: string,
    url: string,
    id: number
  ) => Promise<void>;
};

export const useStore = create<Store>((set) => ({
  articles: [],
  error: "",

  fetch: async () => {
    try {
      const response = await fetching();
      set({ articles: response });
    } catch {
      set({ error: "Error fetching" });
    }
  },

  deleteItem: async (id) => {
    try {
      await deleteItem(id);
      set((state) => ({
        articles: state.articles.filter((item) => item.id !== id),
      }));
    } catch {
      set({ error: "Error deleting" });
    }
  },

  createItem: async (title, description, url) => {
    try {
      await createItem(title, description, url);
    } catch {
      set({ error: "Error creating" });
    }
  },

  updateItem: async (title, description, url, id) => {
    try {
      await updateItem(title, description, url, id);
    } catch {
      set({ error: "Error updating" });
    }
  },
}));
