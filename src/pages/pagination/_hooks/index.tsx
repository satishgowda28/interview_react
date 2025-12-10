import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProducts } from "../_service";

const useGetProducts = (initPage: number = 0) => {
  const [currPage, setPage] = useState(() => initPage);
  const queryProducts = useQuery({
    queryKey: ["getProducts", currPage],
    queryFn: () => getProducts(currPage),
    enabled: !!currPage,
  });

  return { currPage, changePage: setPage, queryProducts };
};

export default useGetProducts;
