import { CreateProductSchema } from "Product/schemas/createProductSchema";

export interface Product {
  description: string;
  minimumQuantity?: number;
  id: number;
}
export interface ProductRepository {
  createProduct: (body: CreateProductSchema) => Promise<Product>;
  getAllProduct: () => Promise<Product[]>;
}
