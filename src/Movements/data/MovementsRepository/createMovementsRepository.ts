import movementsClient from "./client";
import { MovementsRepository } from "./types";
import createBuyMovements from "./services/createBuyMovements";
import getAllMovements from "./services/getAllMovements";
import getMovementById from "./services/getMovementById";
import editBuyMovement from "./services/editBuyMovement";

const createMovementsRepository = (userToken: string): MovementsRepository => {
  movementsClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createBuyMovements,
    getAllMovements,
    getMovementById,
    editBuyMovement,
  };
};

export default createMovementsRepository;
