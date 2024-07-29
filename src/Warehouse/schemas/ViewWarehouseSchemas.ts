import { z } from "zod";

export const productOptionItem = z.object({
  id: z.number(),
  description: z.string(),
  minimumQuantity: z.number().optional(),
});

export const WarehouseDetailSchema = z.object({
  product: productOptionItem,
  quantity: z.number(),
  buyPrice: z.number().optional(),
  lastUpdate: z.date().optional(),
});

export type WarehouseDetailSchema = z.infer<typeof WarehouseDetailSchema>;

const viewWarehouseSchemas = z.object({
  description: z.string(),
  warehousetDetail: z.array(WarehouseDetailSchema),
});

export type ViewWarehouseSchemas = z.infer<typeof viewWarehouseSchemas>;

export default viewWarehouseSchemas;
