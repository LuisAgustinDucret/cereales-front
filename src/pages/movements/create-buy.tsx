import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@chakra-ui/react";

import createBuySchema, {
  CreateBuyDefaultValues,
  CreateBuySchema,
} from "Movements/schemas/CreateBuySchema";
import { CreateBuyMovement } from "Movements/features";
import PageLayout from "Base/layout/PageLayout";
import CreateBuyProvider from "Movements/contexts/CreateBuyContext/CreateBuyProvider";

const MovementCreatePage = () => {
  const router = useRouter();
  const methods = useForm<CreateBuyDefaultValues, unknown, CreateBuySchema>({
    resolver: zodResolver(createBuySchema),
    defaultValues: {
      movementType: "BUY",
      date: new Date(),
      stockMovementDetail: [],
      warehouseDestinyId: {},
    },
  });

  const navigateToMovements = useCallback(
    () => router.push("/movements"),
    [router]
  );

  const stockMovementsArrayMethods = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "stockMovementDetail", // unique name for your Field Array
  });

  return (
    <CreateBuyProvider
      {...methods}
      stockMovementDetail={stockMovementsArrayMethods}
    >
      <PageLayout>
        {{
          header: (
            <Heading>{"Completar los datos de compra de productos"}</Heading>
          ),
          content: (
            <CreateBuyMovement navigateToMovements={navigateToMovements} />
          ),
        }}
      </PageLayout>
    </CreateBuyProvider>
  );
};

export default MovementCreatePage;
