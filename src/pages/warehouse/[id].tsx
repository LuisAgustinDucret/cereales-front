import { Heading } from "@chakra-ui/react";
import { withAuth } from "@kushitech/auth-module";
import { User } from "Auth/types";
import { ViewWarehouse } from "Warehouse/data/WarehouseRepository";
import PageLayout from "Base/layout/PageLayout";
import WarehouseDetail from "Warehouse/features/WarehouseDetail";
import createWarehouseRepository from "Warehouse/data/WarehouseRepository/createWarehouseRepository";

interface WarehouseDetailsPageProps {
  warehouse: ViewWarehouse | null;
}

const WarehouseDetailsPage = ({ warehouse }: WarehouseDetailsPageProps) => {
  return (
    <PageLayout>
      {{
        header: warehouse ? (
          <Heading>{"Detalle almacen: " + warehouse.description}</Heading>
        ) : null,
        content: <WarehouseDetail warehouse={warehouse} />,
      }}
    </PageLayout>
  );
};

export const getServerSideProps = withAuth<User>(async (ctx, user) => {
  if (
    user.role === "USER" ||
    user.role === "DEBT_COLLECTOR" ||
    !ctx.req.cookies.token
  ) {
    // eslint-disable-next-line no-console
    console.log("You dont have permission on  :>> ", ctx.resolvedUrl);
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }

  let warehouse;
  const repository = createWarehouseRepository(ctx.req.cookies.token);

  const warehouseId = Number.parseInt(String(ctx.query.id), 10);

  try {
    warehouse = await repository.getWarehouseById(warehouseId);
  } catch (error) {
    warehouse = null;
  }

  return {
    props: {
      user,
      warehouse: warehouse,
    },
  };
});

export default WarehouseDetailsPage;
