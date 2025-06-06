import { useCallback, useMemo } from "react";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import { Sowing, useAllSowingService } from "Sowing/data/SowingRepository";

interface SowingListProps {
  navigateToDetails: (sowingId: number) => void;
}

const SowingList = ({ navigateToDetails }: SowingListProps) => {
  const { loading, sowingList } = useAllSowingService();

  const columns: BaseColumn<Sowing>[] = useMemo(
    () => [
      {
        label: "id",
        selector: (row) => row.id,
      },
      {
        label: "Descripcion",
        selector: (row) => row.description,
      },
      {
        label: "Hectareas",
        selector: (row) => row.hectares,
      },
    ],
    []
  );

  const handleClick = useCallback(
    (row: Sowing) => navigateToDetails(row.id),
    [navigateToDetails]
  );

  return (
    <DataTable
      columns={columns}
      data={sowingList}
      loading={loading}
      onClickRow={handleClick}
    />
  );
};

export default SowingList;
