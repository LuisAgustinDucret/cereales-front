import { isAxiosError } from "axios";
import { CreateSowingSchema } from "Sowing/schemas/createSowingSchema";
import sowingClient from "../client";

const createSowing = async (body: CreateSowingSchema) => {
  try {
    const response = await sowingClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createSowing;
