import { useCallback } from "react";
import { useRouter } from "next/router";

import PageLayout from "Base/layout/PageLayout";
import { SowingHeader, SowingList } from "Sowing/features";

const SowingPage = () => {
  const router = useRouter();

  const navigateToCreateSowing = useCallback(
    () => router.push("/sowing/create"),
    [router]
  );

  const navigateToDetails = useCallback(
    (sowingId: number) => router.push(`/sowing/${sowingId}`),
    [router]
  );

  return (
    <PageLayout>
      {{
        header: (
          <SowingHeader navigateToCreateSowing={navigateToCreateSowing} />
        ),
        content: <SowingList navigateToDetails={navigateToDetails} />,
      }}
    </PageLayout>
  );
};

export default SowingPage;
