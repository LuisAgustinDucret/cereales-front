import { Product } from "Product/data/ProductRepository";
import { CreateWarehouseSchema } from "Warehouse/schemas/createWarehouseSchema";

export interface Warehouse {
  description: string;
  id: number;
}

export interface ViewWarehouseDetail {
  product: Product;
  quantity: number;
  buyPrice?: number;
}

export interface ViewWarehouse {
  id: number;
  description: string;
  warehouseDetails: ViewWarehouseDetail[];
}

export interface WarehouseRepository {
  createWarehouse: (body: CreateWarehouseSchema) => Promise<Warehouse>;
  getAllWarehouse: () => Promise<Warehouse[]>;
  getWarehouseById: (warehouseId: number) => Promise<Warehouse>;
}
