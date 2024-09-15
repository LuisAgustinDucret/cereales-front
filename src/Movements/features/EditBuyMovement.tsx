import { useEffect, useMemo, useState } from "react";
import { Controller, FieldErrors, useFormContext } from "react-hook-form";

import { Button, useDisclosure, useToast } from "@chakra-ui/react";

import { useTranslation } from "Base/i18n";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import FormInputNumber from "Base/components/FormInputNumber";
import { FormInputText, FormSelect } from "Base/components";

import useCreateMovementsStates from "Movements/hooks/useCreateMovementsStates";
import ConfirmCreateModal from "Movements/components/ConfirmCreateDialog";
import { CreateBuySchema } from "Movements/schemas/CreateBuySchema";
import useWareHouseOptions from "Movements/hooks/useWareHouseOptions";
import useCreateBuyContext from "Movements/contexts/CreateBuyContext/hooks/useCreateBuyContext";
import useEditBuyMovementService from "Movements/data/MovementsRepository/hooks/useEditBuyMovementService";

import FormCreateBuyDetails from "./FormCreateBuyDetails";

interface EditBuyMovementProps {
  movementId: number;
  navigateToMovements: () => void;
}
const EditBuyMovement = ({
  movementId,
  navigateToMovements,
}: EditBuyMovementProps) => {
  const toast = useToast();
  const { t } = useTranslation("movements");
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useCreateBuyContext();
  const { options: warehouseOptions, loading: warehouseLoading } =
    useWareHouseOptions();

  const { loading, error, startFetch, successFetch, failureFetch } =
    useCreateMovementsStates();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const { editBuyMovement } = useEditBuyMovementService();

  const handleCreateMovements = (data: CreateBuySchema) => {
    console.log("startFetch :>> ", data);
    startFetch();

    console.log(data);
    editBuyMovement(movementId, {
      stockMovementDetail: data.stockMovementDetail.map((detail) => ({
        productId: detail.product.id,
        quantity: detail.quantity,
        buyPrice: detail.buyPrice,
      })),
      warehouseDestinyId: data.warehouseDestinyId.value,
      date: new Date(),
      description: data.description,
      movementType: data.movementType,
      value: data.value,
    })
      .then((movementsCreated) => {
        reset();
        successFetch(movementsCreated);
        toast({
          status: "success",
          description: ` ${t("createMovement.message.success.create")} `,
        });
        onClose();
        navigateToMovements();
      })
      .catch((e) => {
        const errorMessage = e.response.data.message;
        failureFetch(errorMessage);
      });
  };

  const handleSubmitError = (errors: FieldErrors<CreateBuySchema>) => {
    console.log("errors :>> ", errors);
  };

  useEffect(() => {
    if (error) {
      toast({ status: "error", description: error });
    }
  }, [error, toast]);

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateMovements)}>
      <FormContainerLayout>
        <FormSectionLayout>
          <Controller
            control={control}
            name="warehouseDestinyId"
            render={({ field }) => (
              <FormSelect
                ref={field.ref}
                isRequired
                errorMessage={
                  errors.warehouseDestinyId?.message
                    ? "Debe seleccionar un deposito de destino"
                    : undefined
                }
                isLoading={warehouseLoading}
                label={"Deposito destino productos"}
                name={field.name}
                options={warehouseOptions}
                value={
                  field.value &&
                  "value" in field.value &&
                  field.value.value !== null
                    ? field.value
                    : null
                }
                onChange={field.onChange}
              />
            )}
          />

          <FormInputNumber
            isRequired
            control={control}
            errorMessage={
              errors.value
                ? (t(`errors.${errors.value.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="value"
            label={"Valor aproximado total de la compra"}
            leftIcon="$"
            name="value"
            thousandSeparator="."
            // type=""
          />

          <FormInputText
            isRequired
            errorMessage={
              errors.description
                ? (t(`errors.${errors.description.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="description"
            label={"Descripcion de la compra"}
            name="description"
            inputProps={{ ...register("description") }}
          />
        </FormSectionLayout>

        <FormCreateBuyDetails />

        <Button colorScheme="main" isLoading={loading} onClick={onOpen}>
          {"Confirmar compra"}
        </Button>
        <ConfirmCreateModal
          description={"confirm button"}
          isLoading={loading}
          isOpen={isOpen}
          title={"Confirmar"}
          onClose={onClose}
          onConfirm={handleSubmit(handleCreateMovements, handleSubmitError)}
        />
      </FormContainerLayout>
    </FormPageLayout>
  );
};

export default EditBuyMovement;
