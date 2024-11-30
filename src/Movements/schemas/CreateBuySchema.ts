import { z } from "zod";

export const warehouseOptionItem = z.object({
  label: z.string(),
  value: z.number(),
  description: z.string(),
});

export const productOptionItem = z.object({
  id: z.number(),
  description: z.string(),
  minimumQuantity: z.number().optional(),
});

export const StockMovementDetailSchema = z.object({
  product: productOptionItem,
  quantity: z.string().transform((val, ctx) => {
    const parsed = Number.parseFloat(
      val.replaceAll(".", "").replaceAll(",", ".")
    );
    if (Number.isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
      });
      return z.NEVER;
    }
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "mustBePositive",
      });
      return z.NEVER;
    }
    return parsed;
  }),
  buyPrice: z.string().transform((val, ctx) => {
    // Reemplaza la coma con un punto para aceptar números con separador decimal
    const parsed = Number.parseFloat(
      val.replaceAll(".", "").replaceAll(",", ".")
    );
    if (Number.isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
      });
      return z.NEVER;
    }
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "mustBePositive",
      });
      return z.NEVER;
    }
    return parsed;
  }),
});

export type StockMovementDetail = z.infer<typeof StockMovementDetailSchema>;

const createBuySchema = z.object({
  warehouseDestinyId: warehouseOptionItem,
  movementType: z.string(),
  date: z.date(),
  stockMovementDetail: z.array(StockMovementDetailSchema),
  value: z.string().transform((val, ctx) => {
    const parsed = Number.parseFloat(
      val.replaceAll(".", "").replaceAll(",", ".")
    );
    if (Number.isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
      });
      return z.NEVER;
    }
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "mustBePositive",
      });
      return z.NEVER;
    }
    return parsed;
  }),
  description: z.string(),
});

export type CreateBuySchema = z.infer<typeof createBuySchema>;
export type CreateBuyDefaultValues = z.input<typeof createBuySchema>;

export default createBuySchema;
