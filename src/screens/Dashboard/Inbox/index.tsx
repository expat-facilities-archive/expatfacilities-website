import { NextPage, NextPageContext } from "next";
import InboxList from "@components/Dashboard/Inbox/List";
import ChannelEmpty from "@components/Dashboard/Inbox/Channel/Empty";
import DashboardProvider from "@components/Dashboard/Provider";
import styled from "styled-components";
import { DashboardPage } from "@typeDefs/auth";
import useTranslation from "@hooks/useTranslation";
import { ParsedUrlQuery } from "querystring";
import Channel from "@components/Dashboard/Inbox/Channel";

interface Props extends DashboardPage {
  query: ParsedUrlQuery;
}

const DashboardInbox: NextPage<Props> = ({ currentUser, query }: Props) => {
  const { t } = useTranslation("dashboard/overview");

  return (
    <DashboardProvider currentUser={currentUser} title={t("sidebar.inbox")}>
      {currentUser && (
        <Container>
          <InboxList />
          {query.channelId ? (
            <Channel id={query.channelId as string} sender={currentUser} />
          ) : (
            <ChannelEmpty />
          )}
        </Container>
      )}
    </DashboardProvider>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

DashboardInbox.getInitialProps = async ({ query }: NextPageContext) => {
  return { query };
};

export default DashboardInbox;
