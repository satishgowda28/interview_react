import { useMemo } from "react";
import useGetProducts from "./_hooks";
import { generatePages } from "./_utils";
import ProductCard from "./components/productCard";

const Pagination = () => {
  const { changePage, queryProducts, currPage } = useGetProducts(1);
  const { data, isFetching, isLoading, isError } = queryProducts;
  const pagesNumber = useMemo(() => {
    if (data?.total && data?.limit && currPage) {
      const totalPages = Math.ceil(data.total / data.limit);
      return generatePages(currPage, totalPages);
    }
    return [];
  }, [data?.total, data?.limit, currPage]);

  console.log(pagesNumber);
  console.log(data);

  return (
    <div className="p-[50px]">
      <div className="grid grid-cols-4 gap-5">
        {data?.products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div className="mt-10">
        <button onClick={() => changePage((prev) => prev + 1)}>NEXT</button>
      </div>
    </div>
  );
};

export default Pagination;
