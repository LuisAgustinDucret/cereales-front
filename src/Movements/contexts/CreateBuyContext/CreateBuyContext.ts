import {
  CreateBuyDefaultValues,
  CreateBuySchema,
} from "Movements/schemas/CreateBuySchema";
import { createContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

export type CreateBuyContext = UseFormReturn<
  CreateBuyDefaultValues,
  unknown,
  CreateBuySchema
> & {
  stockMovementDetail: UseFieldArrayReturn<
    CreateBuyDefaultValues,
    "stockMovementDetail"
  >;
};

export default createContext<CreateBuyContext | undefined>(undefined);
