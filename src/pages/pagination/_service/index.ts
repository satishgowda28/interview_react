import axios from "axios";
import { apiForDummyJSON } from "../../automcomplete/service";
import type { ProductsResponse } from "../_types";

export const getProducts = async (
  currPage: number
): Promise<ProductsResponse> => {
  const limit = 10;
  try {
    const { data } = await apiForDummyJSON.get<ProductsResponse>(
      "/recipes/search",
      {
        params: { limit, skip: currPage + limit, select: "price,title,image" },
      }
    );
    // return (await response).data;
    return data || [];
  } catch (err) {
    let errMsg = "Something went wrong";
    if (axios.isAxiosError(err)) {
      errMsg = err.response?.data.message ?? errMsg;
    }
    return Promise.reject(errMsg);
  }
};
