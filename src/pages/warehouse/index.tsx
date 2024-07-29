import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import WarehouseHeader from "Warehouse/features/WarehouseHeader";
import WarehouseList from "Warehouse/features/WarehouseList";

const WarehousePage = () => {
  const router = useRouter();

  const navigateToCreateWarehouse = useCallback(
    () => router.push("/warehouse/create"),
    [router]
  );

  const navigateToDetails = useCallback(
    (warehouseId: number) => router.push(`/warehouse/${warehouseId}`),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <WarehouseHeader
            navigateToCreateWarehouse={navigateToCreateWarehouse}
          />
        ),
        content: <WarehouseList navigateToDetails={navigateToDetails} />,
      }}
    </PageLayout>
  );
};


export default WarehousePage;
