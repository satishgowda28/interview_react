import axios from "axios";
import { apiForDummyJSON } from "../../automcomplete/service";
import type { ProductsResponse } from "../_types";
import { LIMIT } from "../const";

export const getProducts = async (
  currPage: number
): Promise<ProductsResponse> => {
  try {
    const { data } = await apiForDummyJSON.get<ProductsResponse>("/products", {
      params: {
        limit: LIMIT,
        skip: (currPage - 1) * LIMIT,
        select: "price,title,images",
      },
    });
    // return (await response).data;
    return { ...data, limit: LIMIT };
  } catch (err) {
    let errMsg = "Something went wrong";
    if (axios.isAxiosError(err)) {
      errMsg = err.response?.data.message ?? errMsg;
    }
    return Promise.reject(errMsg);
  }
};
