import { useCallback, useEffect, useMemo } from "react";
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import getMovementTypeColor from "Movements/utils/getMovementTypeColor";
import {
  MovementListItem,
  useAllMovements,
} from "Movements/data/MovementsRepository";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import formatDate from "Base/utils/formatters/formatDate";
import { EditIcon } from "@chakra-ui/icons";
import formatPrice from "Base/utils/formatters/formatPrice";

interface MovementsListProps {
  navigateToDetails: (movementId: number) => void;
  navigateToEdit: (movementId: number) => void;
}

const MovementsList = ({
  navigateToDetails,
  navigateToEdit,
}: MovementsListProps) => {
  const toast = useToast();
  const { error, loading, movementsList } = useAllMovements();
  const columns: BaseColumn<MovementListItem>[] = useMemo(
    () => [
      {
        label: "Descripcion",
        selector: (row) => row.description,
      },
      {
        label: "Tipo de movimiento",
        selector: (row) => {
          const color = getMovementTypeColor(row.movementType);

          return <Badge colorScheme={color}>{row.movementType}</Badge>;
        },
      },
      {
        label: "Valor",
        selector: (row) => formatPrice(row.value),
      },
      {
        label: "Fecha",
        selector: (row) => formatDate(new Date(row.createdAt)),
      },
      {
        label: "Acciones",
        selector: (row) =>
          row.movementType === "BUY" ? (
            <Flex gap={2}>
              <Tooltip label="Editar movimiento" placement="bottom">
                <IconButton
                  aria-label="Edit icon"
                  colorScheme="gray"
                  icon={<EditIcon />}
                  size="sm"
                  variant="outline"
                  onClick={() => navigateToEdit(row.id)}
                />
              </Tooltip>
            </Flex>
          ) : null,
      },
    ],
    []
  );

  const handleClickMovement = useCallback(
    (row: MovementListItem) => {
      navigateToDetails(row.id);
    },
    [navigateToDetails]
  );

  useEffect(() => {
    if (error) {
      toast({ status: "error", description: error });
    }
  }, [error, toast]);

  return (
    <>
      <Box px={{ base: 3, md: 6 }}>
        <DataTable
          columns={columns}
          data={movementsList}
          loading={loading}
          onClickRow={handleClickMovement}
        />
      </Box>
    </>
  );
};

export default MovementsList;
