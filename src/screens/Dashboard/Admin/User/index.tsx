import { NextPage } from "next";
import React from "react";
import DashboardProvider from "@components/Dashboard/Provider";
import router from "next/router";
import { DashboardButton, DashboardField } from "@components/Layout/Dashboard";
import { DashboardPage, UserRole } from "@typeDefs/auth";
import { getAuthApolloClient } from "@services/apollo/client";
import { GET_USERS } from "@queries/users";
import useTranslation from "@hooks/useTranslation";
import DashboardTable, { Column, IconTable } from "@components/Dashboard/Table";
import styled from "styled-components";
import { User } from "@typeDefs/user";
import Avatar from "@components/Avatar";
import Icon from "@components/Layout/Icon";

interface Props extends DashboardPage {
  data: { getUsers: User[] };
}

const DashboardUser: NextPage<Props> = ({
  currentUser,
  data: { getUsers: users },
}: Props) => {
  const target = "id";

  const { t: tOverview } = useTranslation("dashboard/overview");
  const { t: tUser } = useTranslation("dashboard/users");

  const handleDeleteUser = (id: string) => {
    console.warn("Try to delete " + id);
  };
  const columns: Column[] = [
    {
      key: 0,
      title: "",
      format: (user: User) => {
        return <Avatar user={user} size={30} />;
      },
      width: 0.4,
    },
    {
      key: 1,
      title: tUser("table.users"),
      format: ({ firstName, lastName }: User) => `${firstName} ${lastName}`,
      width: 1,
    },
    {
      key: 2,
      title: tUser("table.email"),
      format: ({ email }: User) => email,
      width: 2,
      wordBreak: true,
    },
    {
      key: 3,
      title: tUser("table.role"),
      format: ({ roles }: User) => {
        return roles.map((role: UserRole) => role.name).join(", ");
      },
      width: 1,
    },
    {
      key: 4,
      title: tUser("table.phone"),
      format: ({ phoneNumber }: User) => phoneNumber,
      width: 1,
    },
    {
      key: 5,
      title: tUser("table.createdAt"),
      format: ({ createdAt }: User) => new Date(createdAt).toLocaleDateString(),
      width: 1,
    },
    {
      key: 6,
      title: "",
      format: ({ id }: User) => (
        <>
          <IconTable
            name={"delete-bin-2"}
            fill
            size={20}
            onClick={() => handleDeleteUser(id)}
          />
        </>
      ),
      width: 0.4,
    },
  ];
  return (
    <DashboardProvider
      title={`${tOverview("sidebar.users")} (${users.length})`}
      currentUser={currentUser}
      buttons={
        <DashboardButton
          mode={"darker"}
          onClick={() => {
            router.push("#");
          }}
          prefix={<Icon name={"search-2"} />}
        >
          Search
        </DashboardButton>
      }
    >
      <FilterContainer>
        <FilterInput />
      </FilterContainer>
      {users && users.length > 0 && (
        <DashboardTable
          columns={columns}
          data={users}
          tableGap={5}
          target={target}
          header
        />
      )}
    </DashboardProvider>
  );
};

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
`;

const FilterInput = styled(DashboardField)`
  flex: 1;
  height: auto;
  border-radius: 0;
`;

DashboardUser.getInitialProps = async (ctx) => {
  const { query } = await getAuthApolloClient(ctx);
  const { data }: { data: { getUsers: User[] } } = await query({
    query: GET_USERS,
  });

  return {
    data,
  };
};

export default DashboardUser;
