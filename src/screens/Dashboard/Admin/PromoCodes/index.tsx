import React from "react";

import { NextPage } from "next";

import DashboardProvider from "@components/Dashboard/Provider";
import { DashboardButton } from "@components/Layout/Dashboard";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { GET_PROMOCODES } from "@queries/promo-code";

import type { DashboardPage } from "@typeDefs/auth";
import type { PromoCode } from "@typeDefs/promo-code";
import { useRouter } from "next/router";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import { ShowBoxColor } from "@components/Dashboard/ShowBoxColor";
import DashboardTable, { Column, IconTable } from "@components/Dashboard/Table";
import Icon from "@components/Layout/Icon";

type Props = DashboardPage & {
  promoCodes: PromoCode[];
};

const DashboardPromoCodes: NextPage<Props> = ({
  currentUser,
  promoCodes,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation("dashboard/promo-code");
  const { t: tCommon } = useTranslation("dashboard/common");
  const { t: tOverview } = useTranslation("dashboard/overview");

  const target = "id";

  const handleDeletePromoCode = (id: string) => {
    console.warn("Try to delete " + id);
  };

  const columns: Column[] = [
    {
      key: 1,
      title: t("table.code"),
      format: ({ code }: PromoCode) => t(code),
      width: 1,
    },
    {
      key: 2,
      title: t("table.active"),
      format: ({ active }: PromoCode) =>
        ShowBoxColor(active, {
          replace_value: [tCommon("status.active"), tCommon("status.disable")],
          isBoolean: true,
          transformMobile: true,
        }),
      width: 1,
    },
    {
      key: 3,
      title: t("table.used"),
      format: ({ used }: PromoCode) => used,
      width: 1,
    },
    {
      key: 4,
      title: t("table.expirationDate"),
      format: ({ expirationDate }: PromoCode) =>
        new Date(expirationDate).toLocaleDateString("fr-FR"),
      width: 1,
    },
    {
      key: 5,
      title: t("table.creationDate"),
      format: ({ createdAt }: PromoCode) =>
        new Date(createdAt).toLocaleDateString("fr-FR"),
      width: 1,
    },
    {
      key: 6,
      title: "",
      format: ({ id }: PromoCode) => (
        <>
          <IconTable
            name={"delete-bin-2"}
            fill
            size={20}
            onClick={() => handleDeletePromoCode(id)}
          />
        </>
      ),
      width: 1,
    },
  ];

  return (
    <DashboardProvider
      title={tOverview("sidebar.promo-codes")}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              router.push("#");
            }}
            prefix={<Icon name={"search-2"} />}
          >
            Search
          </DashboardButton>
          <DashboardButton
            onClick={() => {
              router.push(ROUTES.DASHBOARD_ADMIN_PROMOCODES_ADD);
            }}
            prefix={<Icon name={"add"} fill />}
          >
            Créer un code promo
          </DashboardButton>
        </>
      }
    >
      {promoCodes && promoCodes.length > 0 && (
        <DashboardTable
          header
          columns={columns}
          data={promoCodes}
          tableGap={5}
          target={target}
        />
      )}
    </DashboardProvider>
  );
};

DashboardPromoCodes.getInitialProps = async () => {
  const { cache, query } = await getStandaloneApolloClient();
  const {
    data: { getPromoCodes: promoCodes },
  }: { data: { getPromoCodes: PromoCode[] } } = await query({
    query: GET_PROMOCODES,
  });

  return {
    apolloStaticCache: cache.extract(),
    promoCodes,
  };
};

export default DashboardPromoCodes;
