import { WarehouseRepository } from "./types";
import createWarehouse from "./services/createWarehouse";
import getAllWarehouse from "./services/getAllWarehouse";
import getWarehouseById from "./services/getWarehouseById";
import warehouseClient from "./client";

const createWarehouseRepository = (userToken: string): WarehouseRepository => {
  warehouseClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createWarehouse,
    getAllWarehouse,
    getWarehouseById,
  };
};

export default createWarehouseRepository;
