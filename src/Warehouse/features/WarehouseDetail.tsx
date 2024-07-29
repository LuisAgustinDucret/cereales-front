import { useMemo } from "react";
import { Badge, Card, Heading, Stack, Text } from "@chakra-ui/react";

import { DataTable } from "Base/components";
import { BaseColumn } from "Base/components/DataTable";
import formatPrice from "Base/utils/formatters/formatPrice";
import { WarehouseDetailSchema } from "Warehouse/schemas/ViewWarehouseSchemas";
import { ViewWarehouse } from "Warehouse/data/WarehouseRepository";

interface WarehouseDetailProps {
  warehouse: ViewWarehouse | null;
}

const WarehouseDetail = ({ warehouse }: WarehouseDetailProps) => {
  console.log("data", warehouse);

  const WarehouseDetailColumns: BaseColumn<WarehouseDetailSchema>[] = useMemo(
    () => [
      {
        label: "Producto",
        selector: (row) => row.product?.description,
      },
      {
        label: "Precio de compra",
        selector: (row) =>
          row.buyPrice != null ? formatPrice(row.buyPrice) : 0,
      },
      {
        label: "Cantidad",
        selector: (row) => row.quantity,
      },
    ],
    []
  );

  if (warehouse === null) {
    return <>No existe el movimiento que intentas buscar</>;
  }

  // Verificación antes de renderizar DataTable
  const data = warehouse.warehouseDetails || [];

  return (
    <Stack>
      <Card px={6} py={6}>
        <Heading size="md">
          {"Datos del almacen"}
          <Badge colorScheme={"green"} fontSize={{ md: "md" }}>
            {warehouse.description}
          </Badge>
        </Heading>
      </Card>
      <Card px={6} py={6}>
        <Stack spacing={6}>
          <DataTable
            columns={WarehouseDetailColumns}
            data={data}
          />
        </Stack>
      </Card>
    </Stack>
  );
};

export default WarehouseDetail;
