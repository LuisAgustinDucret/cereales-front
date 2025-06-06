import { isAxiosError } from "axios";
import sowingClient from "../client";
import { Sowing } from "../types";

const getAllSowing = async (): Promise<Sowing[]> => {
  try {
    const response = await sowingClient.get("/");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default getAllSowing;
