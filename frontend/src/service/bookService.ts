import { API } from "./config";

export const getBooks = async () => {
  return await API.get("books");
};

export const postBook = async (title: string, token: string | null) => {
  try {
    const response = await API.post(
      "book",
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
