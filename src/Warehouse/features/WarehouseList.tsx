import { useCallback, useMemo } from "react";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import {
  Warehouse,
  useAllWarehouseService,
} from "Warehouse/data/WarehouseRepository";

interface WarehouseListProps {
  navigateToDetails: (warehouseId: number) => void;
}

const WarehouseList = ({ navigateToDetails }: WarehouseListProps) => {
  const { loading, warehouseList } = useAllWarehouseService();

  const columns: BaseColumn<Warehouse>[] = useMemo(
    () => [
      {
        label: "id",
        selector: (row) => row.id,
      },
      {
        label: "Descripcion",
        selector: (row) => row.description,
      },
    ],
    []
  );

  const handleClickMovement = useCallback(
    (row: Warehouse) => {
      console.log(row.id)
      navigateToDetails(row.id);
    },
    [navigateToDetails]
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={warehouseList}
        loading={loading}
        onClickRow={handleClickMovement}
      />
    </>
  );
};

export default WarehouseList;
