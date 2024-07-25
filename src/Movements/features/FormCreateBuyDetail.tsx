import { Box, Center, IconButton, Stack } from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FormInputText, FormSelect } from "Base/components";
import FormInputNumber from "Base/components/FormInputNumber";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import useCreateBuyContext from "Movements/contexts/CreateBuyContext/hooks/useCreateBuyContext";
import { Controller } from "react-hook-form";
import useProductsOptions from "Movements/hooks/useProductsOptions";
import { OnChangeValue, SingleValue } from "chakra-react-select";
import OptionItem from "Base/types/OptionItem";

interface FormCreateOwnerProps {
  id: string;
  index: number;
}

const FormCreateBuyDetail = ({ index }: FormCreateOwnerProps) => {
  const { options, loading } = useProductsOptions();

  const {
    register,
    control,
    formState: { errors },
    stockMovementDetail: { remove },
  } = useCreateBuyContext();

  return (
    <Center py={16} w="full">
      <Box position="absolute" right={0} top={0}>
        <IconButton
          aria-label="Close button"
          colorScheme="red"
          icon={<TrashIcon height={24} width={24} />}
          onClick={() => remove(index)}
        />
      </Box>
      <Stack
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 8, md: 32 }}
      >
        <FormSectionLayout
          minW={{ lg: "md" }}
          title={`${"Seleccionar retiro"}`}
        >
          <Controller
            control={control}
            name={`stockMovementDetail.${index}.product`}
            render={({ field }) => (
              <FormSelect
                ref={field.ref}
                isRequired
                errorMessage={
                  errors.stockMovementDetail?.message
                    ? "Debe seleccionar un producto"
                    : undefined
                }
                isLoading={loading}
                label={"Seleccionar producto"}
                name={field.name}
                options={options}
                value={
                  field.value && 
                  "id" in field.value && 
                  typeof field.value.id === 'number'
                    ? {
                        label: field.value.description,
                        value: field.value.id,
                      }
                    : null
                }
                onChange={(newValue) => {
                  const optionSelected = newValue as OnChangeValue<
                    OptionItem<number>,
                    false
                  >;
                  field.onChange(
                    optionSelected
                      ? {
                          description: optionSelected.label,
                          id: optionSelected.value,
                        }
                      : null
                  );
                }}
                // Asegúrate de que el componente pueda recibir clicks correctamente
                className="form-select"
              />
            )}
          />

          <FormInputText
            isRequired
            inputProps={register(`stockMovementDetail.${index}.quantity`)}
            label={"Cantidad"}
            name="quantity"
          />
          <FormInputNumber
            isRequired
            control={control}
            errorMessage={
              errors.stockMovementDetail &&
              errors.stockMovementDetail[index]?.buyPrice
                ? `errors.${errors.stockMovementDetail[index]?.buyPrice?.message}`
                : // TODO: Deberia eleminar este casteo: `as string`
                  undefined
            }
            id="value"
            label={"Valor"}
            leftIcon="$"
            name={`stockMovementDetail.${index}.buyPrice`}
          />
        </FormSectionLayout>
      </Stack>
    </Center>
  );
};

export default FormCreateBuyDetail;
