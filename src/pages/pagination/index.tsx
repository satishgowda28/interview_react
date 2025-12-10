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
        <ul className="flex space-x-2 justify-center">
          {pagesNumber.map((num) => (
            <li
              className="p-2.5 py-1 min-w-[40px] border data-[active=true]:bg-white data-[active=true]:text-black data-[filler=true]:border-0 cursor-pointer data-[filler=true]:cursor-auto"
              data-active={currPage === num}
              data-filler={num < 0}
              key={num}
              onClick={() => {
                if (!(num < 0)) {
                  changePage(num);
                }
              }}
            >
              {num < 0 ? "..." : num}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
