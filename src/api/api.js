import axios from "axios";

const apis = {
  articles: "articles",
  create: "create",
  update: "update/",
  delete: "delete/",
};

export const BASE_URL = "http://localhost:5700/";

export const fetching = async () => {
  try {
    const response = await axios.get(BASE_URL + apis.articles);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const createItem = async ({ title, description, url }) => {
  try {
    const response = await axios.post(BASE_URL + apis.create, {
      title,
      url,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export const updateItem = async ({ title, description, url, id }) => {
  try {
    const response = await axios.patch(BASE_URL + apis.update + id, {
      title,
      url,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async ({ id }) => {
  try {
    const response = await axios.delete(BASE_URL + apis.delete + id);
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
