import React from "react";
import styled from "styled-components";
import { NextPage } from "next";

import DashboardProvider from "@components/Dashboard/Provider";
import LINKS from "@constants/links";

import type { DashboardPage } from "@typeDefs/auth";
import Navigator from "@components/Navigator";

const DashboardAdminBlog: NextPage<DashboardPage> = ({
  currentUser,
}: DashboardPage) => {
  return (
    <DashboardProvider title={"Blog"} currentUser={currentUser}>
      <Container defaultUrl={LINKS.BLOG_ADMIN} />
    </DashboardProvider>
  );
};

const Container = styled(Navigator)`
  position: absolute;
  top: 0;
  left: 0;
`;

export default DashboardAdminBlog;
