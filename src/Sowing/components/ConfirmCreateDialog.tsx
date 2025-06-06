import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";

interface ConfirmCreateDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmCreateDialog = ({
  isOpen,
  isLoading,
  title,
  description,
  onClose,
  onConfirm,
}: ConfirmCreateDialogProps) => {
  const { t } = useTranslation("sowing");
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{description}</ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            {t("modal.button.buttonCancel")}
          </Button>
          <Button colorScheme="main" isLoading={isLoading} onClick={onConfirm}>
            {t("modal.button.buttonConfirm")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmCreateDialog;
