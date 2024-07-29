import warehouseClient from "../client";

export default async function getWarehouseById(warehouseId: number) {
  const response = await warehouseClient.get(`/${warehouseId}`);

  return response.data;
}
