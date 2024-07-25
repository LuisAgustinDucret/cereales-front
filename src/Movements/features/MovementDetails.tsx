import { useMemo } from "react";
import { Badge, Card, Heading, Stack, Text } from "@chakra-ui/react";

import { ViewMovements } from "Movements/data/MovementsRepository";
import getMovementTypeColor from "Movements/utils/getMovementTypeColor";
import { DataTable } from "Base/components";
import { BaseColumn } from "Base/components/DataTable";
import formatPrice from "Base/utils/formatters/formatPrice";
import formatDatetime from "Base/utils/formatters/formatDatetime";
import { StockMovementDetail } from "Movements/schemas/ViewMovementSchemas";

interface MovementDetailsProps {
  movement: ViewMovements | null;
}

const MovementDetails = ({ movement }: MovementDetailsProps) => {
  const movementDetailsColumns: BaseColumn<StockMovementDetail>[] = useMemo(
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

  if (movement === null) {
    return <>No existe el movimiento que intentas buscar</>;
  }

  return (
    <Stack>
      <Card px={6} py={6}>
        <Heading size="md">
          {"Datos del movimiento"}
          <Badge
            colorScheme={getMovementTypeColor(movement?.movementType)}
            fontSize={{ md: "md" }}
          >
            {movement?.movementType == "BUY" ? " COMPRA " : " APLICACION "}
          </Badge>
        </Heading>
        <Stack direction={{ base: "column" }} mt={4} spacing={2}>
          {movement?.warehouseOrigin ? (
            <Text>
              <>
                <strong>{"Deposito origen"}:</strong>{" "}
                {movement?.warehouseOrigin?.description}
              </>
            </Text>
          ) : null}
          {movement?.warehouseDestiny ? (
            <Text>
              <>
                <strong>{"Deposito destino"}:</strong>{" "}
                {movement?.warehouseDestiny?.description}
              </>
            </Text>
          ) : null}
          <Text>
            <strong>{"Fecha"}:</strong> {formatDatetime(movement?.date)}
          </Text>
        </Stack>
      </Card>
      <Card px={6} py={6}>
        <Stack spacing={6}>
          <DataTable
            columns={movementDetailsColumns}
            data={movement.stockMovementDetail}
          />
        </Stack>
      </Card>
    </Stack>
  );
};

export default MovementDetails;
