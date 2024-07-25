import movementsClient from "./client";
import { MovementsRepository } from "./types";
import createBuyMovements from "./services/createBuyMovements";
import getAllMovements from "./services/getAllMovements";
import getMovementById from "./services/getMovementById";

const createMovementsRepository = (userToken: string): MovementsRepository => {
  movementsClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createBuyMovements,
    getAllMovements,
    getMovementById,
  };
};

export default createMovementsRepository;
