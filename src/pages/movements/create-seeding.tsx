import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@chakra-ui/react";

import createAplicationSchema, {
  CreateAplicationSchema,
} from "Movements/schemas/CreateAplicationSchema";
import PageLayout from "Base/layout/PageLayout";
import CreateAplicationProvider from "Movements/contexts/CreateBuyContext/CreateAplicationProvider";
import CreateSeedingMovement from "Movements/features/CreateSeedingMovement";

const SeedingCreatePage = () => {
  const router = useRouter();
  const methods = useForm<CreateAplicationSchema>({
    resolver: zodResolver(createAplicationSchema),
    //remover hardcodeo
    defaultValues: {
      movementType: "SEEDING",
      stockMovementDetail: [],
      warehouseOriginId: {},
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
    <FormProvider {...methods}>
      <CreateAplicationProvider
        {...methods}
        stockMovementDetail={stockMovementsArrayMethods}
      >
        <PageLayout>
          {{
            header: (
              <Heading>{"Completar los datos para la siembra"}</Heading>
            ),
            content: (
              <CreateSeedingMovement navigateToMovements={navigateToMovements} />
            ),
          }}
        </PageLayout>
      </CreateAplicationProvider>
    </FormProvider>
  );
};

export default SeedingCreatePage;
