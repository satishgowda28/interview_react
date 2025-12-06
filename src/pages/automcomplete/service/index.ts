import axios from "axios";
import type { RecepiesResponse } from "../types";

const api = axios.create({
  baseURL: "https://dummyjson.com/",
});

export const searchRecepies = async (q: string): Promise<RecepiesResponse> => {
  try {
    const { data } = await api.get("/recipes/search", {
      params: { q, select: "name,image" },
    });
    // return (await response).data;
    return data.recipes || [];
  } catch (err) {
    let errMsg = "Something went wrong";
    if (axios.isAxiosError(err)) {
      errMsg = err.response?.data.message ?? errMsg;
    }
    return Promise.reject(errMsg);
  }
};
