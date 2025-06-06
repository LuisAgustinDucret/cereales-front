import { useCallback } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PageLayout from "Base/layout/PageLayout";
import { CreateSowing } from "Sowing/features";
import { withAuth } from "@kushitech/auth-module";
import { User } from "Auth/types";

const SowingCreatePage = () => {
  const { t } = useTranslation("sowing");
  const router = useRouter();

  const navigateToSowing = useCallback(() => router.push("/sowing"), [router]);
  return (
    <PageLayout>
      {{
        header: <Heading>{t("create.title")}</Heading>,
        content: <CreateSowing navigateToSowing={navigateToSowing} />,
      }}
    </PageLayout>
  );
};

export const getServerSideProps = withAuth<User>(async (ctx, user) => {
  if (user.role === "USER") {
    console.log("You dont have permission on :>> ", ctx.resolvedUrl);
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
});

export default SowingCreatePage;
