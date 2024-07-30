// @ts-nocheck
import { create } from "zustand";
import { Article } from "../types/Article";
import {
  fetching,
  deleteItem,
  createItem,
  updateItem,
  login,
  signup,
  activateAcc,
} from "../api/api";

type Store = {
  articles: Article[];
  errorStore: string | null;
  isAuthenticated: boolean;

  setisAuthenticated: () => void;

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

  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  activateAcc: (token: string) => Promise<void>;
};

export const useStore = create<Store>((set) => ({
  articles: [],
  errorStore: null,

  isAuthenticated: false,

  setisAuthenticated: () => {
    set({ isAuthenticated: true });
  },

  fetch: async () => {
    try {
      const response = await fetching();
      set({ articles: response });
    } catch (err) {
      console.log(err);
    }
  },

  deleteItem: async (id) => {
    try {
      await deleteItem(id);
      set((state) => ({
        articles: state.articles.filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  },

  createItem: async (title, description, url) => {
    try {
      await createItem(title, description, url);
    } catch (err) {
      console.log(err);
    }
  },

  updateItem: async (title, description, url, id) => {
    try {
      await updateItem(title, description, url, id);
    } catch (err) {
      console.log(err);
    }
  },

  login: async (email, password) => {
    try {
      const response = await login(email, password);
      console.log('res', response)
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response.data.error || "Something went wrong :(";
      return { error: errorMessage };
    }
  },

  signup: async (email, password) => {
    try {
      const response = await signup(email, password);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Something went wrong :(";
      return { error: errorMessage };
    }
  },

  activateAcc: async (token) => {
    try {
      const response = await activateAcc(token);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response.data.error || "Something went wrong :(";
      return { error: errorMessage };
    }
  },
}));
