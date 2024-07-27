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
  }
};

export const createItem = async (
  title: string,
  description: string,
  url: string
) => {
  try {
    const response = await axios.post(BASE_URL + apis.create, {
      title,
      url,
      description,
    });
    await fetching();
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
  }
};

export const updateItem = async (
  title: string,
  description: string,
  url: string,
  id: number
) => {
  try {
    const response = await axios.patch(BASE_URL + apis.update + id, {
      title,
      description,
      url,
    });
    await fetching();
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

export const deleteItem = async (id: number) => {
  try {
    const response = await axios.delete(BASE_URL + apis.delete + id);
    await fetching();
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
