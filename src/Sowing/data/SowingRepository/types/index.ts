import { CreateSowingSchema } from "Sowing/schemas/createSowingSchema";

export interface Sowing {
  description: string;
  hectares: number;
  id: number;
}

export interface SowingRepository {
  createSowing: (body: CreateSowingSchema) => Promise<Sowing>;
  getAllSowing: () => Promise<Sowing[]>;
}
