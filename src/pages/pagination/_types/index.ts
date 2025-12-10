export interface ProductObj {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export type ProductsResponse = {
  products: ProductObj[];
  total: number;
  skip: number;
  limit: number;
};
