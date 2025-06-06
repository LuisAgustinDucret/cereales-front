import sowingClient from "./client";
import createSowing from "./services/createSowing";
import getAllSowing from "./services/getAllSowing";
import { SowingRepository } from "./types";

const createSowingRepository = (userToken: string): SowingRepository => {
  sowingClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createSowing,
    getAllSowing,
  };
};

export default createSowingRepository;
