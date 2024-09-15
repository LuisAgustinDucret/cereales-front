import movementsClient from "../client";
import { CreateMovementDto, Movements } from "../types";

const editBuyMovement = async (movementId: number, body: CreateMovementDto): Promise<Movements> => {
  const response = await movementsClient.patch<Movements>(`/${movementId}`, body);

  return response.data;
};

export default editBuyMovement;
