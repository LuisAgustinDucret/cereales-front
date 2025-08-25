import { Heading } from "@chakra-ui/react";
import { withAuth } from "@kushitech/auth-module";

import { User } from "Auth/types";

import { ViewMovements } from "Movements/data/MovementsRepository";
import createMovementsRepository from "Movements/data/MovementsRepository/createMovementsRepository";
import PageLayout from "Base/layout/PageLayout";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createBuySchema, {
  CreateBuyDefaultValues,
  CreateBuySchema,
} from "Movements/schemas/CreateBuySchema";
import CreateBuyProvider from "Movements/contexts/CreateBuyContext/CreateBuyProvider";
import EditBuyMovement from "Movements/features/EditBuyMovement";
import { useCallback } from "react";
import { useRouter } from "next/router";

interface MovementDetailsPageProps {
  movement: ViewMovements | null;
}

const MovementDetailsPage = ({ movement }: MovementDetailsPageProps) => {
  console.log("movement", movement);
  console.log("movement date", movement?.date);
  const router = useRouter();
  const methods = useForm<CreateBuyDefaultValues, unknown, CreateBuySchema>({
    resolver: zodResolver(createBuySchema),
    defaultValues: {
      movementType: movement?.movementType,
      date: movement?.date ? new Date(movement?.date) : new Date(),
      stockMovementDetail: movement?.stockMovementDetail.map((smDetails) => ({
        ...smDetails,
        buyPrice: String(smDetails.buyPrice),
        quantity: String(smDetails.quantity),
      })),
      warehouseDestinyId: {
        label: movement?.warehouseDestiny?.description,
        value: movement?.warehouseDestiny?.id,
        description: movement?.warehouseDestiny?.description,
      },
      description: movement?.description,
      value: String(movement?.value),
    },
  });

  const stockMovementsArrayMethods = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "stockMovementDetail", // unique name for your Field Array
  });

  const navigateToMovements = useCallback(
    () => router.push("/movements"),
    [router]
  );

  return (
    <CreateBuyProvider
      {...methods}
      stockMovementDetail={stockMovementsArrayMethods}
    >
      <PageLayout>
        {{
          header:
            movement !== null ? (
              <Heading>{"Detalle movimiento: " + movement.description}</Heading>
            ) : null,
          // content: <MovementDetails movement={movement} />,
          content: (
            <EditBuyMovement
              movementId={movement?.id ?? -1}
              navigateToMovements={navigateToMovements}
            />
          ),
        }}
      </PageLayout>
    </CreateBuyProvider>
  );
};

export const getServerSideProps = withAuth<User>(async (ctx, user) => {
  let movement;
  const repository = createMovementsRepository(ctx.req.cookies.token ?? "");
  const movementId = Number.parseInt(String(ctx.query.id), 10);

  try {
    movement = await repository.getMovementById(movementId);
  } catch (error) {
    movement = null;
  }

  console.log("movement date", movement?.date);

  return {
    props: {
      user,
      movement,
    },
  };
});

export default MovementDetailsPage;
