import { API } from "./config";

export const login = async (email: string, password: string) => {
  const response = await API.post("login", { email, password });
  return response;
};

export const getData = async (token: string) => {
  return await API.get("getData", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
