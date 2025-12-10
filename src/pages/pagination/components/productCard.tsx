import type { FC } from "react";
import type { ProductObj } from "../_types";

const ProductCard: FC<ProductObj> = ({ images, price, title }) => {
  return (
    <div className="border border-white rounded-3xl">
      <div className="aspect-square border relative">
        <img
          src={images[0]}
          className="absolute w-full h-full object-contain"
        />
      </div>
      <div className="p-1">
        <p>{price}</p>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default ProductCard;
