import React from "react";

import { NextPage } from "next";

import DashboardProvider from "@components/Dashboard/Provider";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { GET_SERVICES } from "@queries/services";

import type { DashboardPage } from "@typeDefs/auth";
import type { Service } from "@typeDefs/services";
import { formatAmount } from "@utils/formatAmount";
import { ShowBoxColor } from "@components/Dashboard/ShowBoxColor";
import DashboardTable, { Column } from "@components/Dashboard/Table";
import useTranslation from "@hooks/useTranslation";

type Props = DashboardPage & {
  data: {
    getServices: Service[];
  };
};

const DashboardServicesPage: NextPage<Props> = ({
  currentUser,
  data: { getServices: services },
}: Props) => {
  const { t } = useTranslation("data/services");
  const { t: tCommon } = useTranslation("dashboard/common");
  const { t: tservice } = useTranslation("dashboard/services");

  const columns: Column[] = [
    {
      key: 1,
      title: tservice("table.serviceName"),
      format: ({ name }: Service) => t(name),
      width: 1,
    },
    {
      key: 2,
      title: tservice("table.price"),
      format: ({ price }: Service) => formatAmount(price),
      width: 1,
    },
    {
      key: 3,
      title: tservice("table.nbOffer"),
      format: ({ offers }: Service) => offers?.length,
      width: 1,
    },
    {
      key: 4,
      title: tservice("table.commission"),
      format: ({ commission }: Service) => `${commission} %`,
      width: 1,
    },
    {
      key: 5,
      title: tservice("table.state"),
      format: ({ available }: Service) =>
        ShowBoxColor(available, {
          replace_value: [
            tCommon("status.available"),
            tCommon("status.unavailable"),
          ],
          isBoolean: true,
        }),
      width: 1,
    },
  ];

  return (
    <DashboardProvider title={"Services"} currentUser={currentUser}>
      {services && services.length > 0 && (
        <DashboardTable columns={columns} data={services} tableGap={5} header />
      )}
    </DashboardProvider>
  );
};

DashboardServicesPage.getInitialProps = async () => {
  const { cache, query } = await getStandaloneApolloClient();
  const { data }: { data: { getServices: Service[] } } = await query({
    query: GET_SERVICES,
  });

  return {
    apolloStaticCache: cache.extract(),
    data,
  };
};

export default DashboardServicesPage;
