import { Aplicator } from "Aplicator/data/AplicatorRepository";
import { User } from "Auth/types";
import { Batch } from "Field/data/FieldRepository";
import { Product } from "Product/data/ProductRepository";
import { Warehouse } from "Warehouse/data/WarehouseRepository";

export interface CreateStockMovementsDetail {
  productId: number;
  quantity: number;
  buyPrice?: number;
}

export interface ViewStockMovementsDetail {
  product: Product;
  quantity: number;
  buyPrice?: number;
}

export interface ViewMovementDto {
  value?: number;
  description: string;
  movementType: "BUY" | "APLICATION" | "MOVEMENT" | string;
  stockMovementDetail?: ViewStockMovementsDetail[];
  voucherDescription?: string;
  date?: Date;
  warehouseOriginId?: number;
  warehouseDestinyId?: number;
  batchId?: number;
  aplicatorId?: number;
}

export interface CreateMovementDto {
  value?: number;
  description: string;
  movementType: "BUY" | "APLICATION" | "MOVEMENT" | string;
  stockMovementDetail?: CreateStockMovementsDetail[];
  voucherDescription?: string;
  date?: Date;
  warehouseOriginId?: number;
  warehouseDestinyId?: number;
  batchId?: number;
  aplicatorId?: number;
}

export interface ViewMovements {
  description: string;
  value: number;
  movementType: string;
  date: Date;
  stockMovementDetail: ViewStockMovementsDetail[];
  warehouseOrigin?: Warehouse;
  warehouseDestiny?: Warehouse;
  aplicator?: Aplicator;
  batch?: Batch;
  id: number;
}

export interface Movements {
  description: string;
  value: number;
  movementType: string;
  date: Date;
  stockMovementDetail?: CreateStockMovementsDetail[];
  warehouseOrigin?: Warehouse;
  warehouseDestiny?: Warehouse;
  aplicator?: Aplicator;
  batch?: Batch;
  id: number;
}

export interface MovementListItem {
  description: string;
  value: number;
  user: User;
  movementType: string;
  createdAt: Date;
  warehouseDestiny: string;
  id: number;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface MovementsRepository {
  createBuyMovements: (body: CreateMovementDto) => Promise<Movements>;
  getAllMovements: () => Promise<MovementListItem[]>;
  getMovementById: (movementId: number) => Promise<Movements>;
  editBuyMovement: (movementId: number, body: CreateMovementDto) => Promise<Movements>;
}
