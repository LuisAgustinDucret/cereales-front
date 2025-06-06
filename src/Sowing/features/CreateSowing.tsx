import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import { useForm } from "react-hook-form";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText, FormInputNumber, StatusCard } from "Base/components";
import ConfirmCreateModal from "Sowing/components/ConfirmCreateDialog";
import createSowingSchema, {
  CreateSowingSchema,
} from "Sowing/schemas/createSowingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateSowingService from "Sowing/data/SowingRepository/hooks/useCreateSowingService";

interface CreateSowingProps {
  navigateToSowing: () => void;
}

const CreateSowing = ({ navigateToSowing }: CreateSowingProps) => {
  const { t } = useTranslation("sowing");
  const toast = useToast();
  const { handleSubmit, register, watch } = useForm<CreateSowingSchema>({
    resolver: zodResolver(createSowingSchema),
    defaultValues: { description: "", hectares: 0 },
  });

  const { createSowing, loading, error, startFetch, failureFetch } =
    useCreateSowingService();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onSubmit = (data: CreateSowingSchema) => {
    startFetch();
    createSowing(data)
      .then(() => {
        toast({ status: "success", description: t("toast.create.success") });
        navigateToSowing();
      })
      .catch((e) => failureFetch(e.message));
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(onSubmit)}>
      <FormContainerLayout>
        <FormSectionLayout>
          <FormInputText
            isRequired
            id="description"
            label={t("create.label.description")}
            name="description"
            inputProps={register("description")}
          />
          <FormInputNumber
            isRequired
            id="hectares"
            label={t("create.label.hectares")}
            name="hectares"
            inputProps={register("hectares", { valueAsNumber: true })}
          />
        </FormSectionLayout>
        <FormSectionLayout>
          {watch("description") && (
            <StatusCard
              label={watch("description")}
              value={<>{watch("hectares")} ha</>}
            />
          )}
        </FormSectionLayout>
        <Button
          colorScheme="main"
          isLoading={loading}
          onClick={onOpen}
          type="button"
        >
          {t("create.button.submit")}
        </Button>
        <ConfirmCreateModal
          description={t("modal.description")}
          isLoading={loading}
          isOpen={isOpen}
          title={t("modal.title")}
          onClose={onClose}
          onConfirm={handleSubmit(onSubmit)}
        />
      </FormContainerLayout>
    </FormPageLayout>
  );
};

export default CreateSowing;
