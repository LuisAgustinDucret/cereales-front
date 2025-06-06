import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface SowingHeaderProps {
  navigateToCreateSowing: () => void;
}

const SowingHeader = ({ navigateToCreateSowing }: SowingHeaderProps) => {
  const { t } = useTranslation(["sowing", "appLayout"]);

  return (
    <Flex justify="space-between">
      <Heading>{t("sidebar.menu.sowing", { ns: "appLayout" })}</Heading>
      <Button
        leftIcon={<Icon as={PlusIcon} />}
        variant="outline"
        onClick={navigateToCreateSowing}
      >
        {t("actions.create")}
      </Button>
    </Flex>
  );
};

export default SowingHeader;
