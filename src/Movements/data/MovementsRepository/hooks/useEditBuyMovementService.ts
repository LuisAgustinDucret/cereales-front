import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import createMovementsRepository from "../createMovementsRepository";

const useEditBuyMovementService = () => {
  const repository = useMemo(
    () => createMovementsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { editBuyMovement: repository.editBuyMovement };
};

export default useEditBuyMovementService;
