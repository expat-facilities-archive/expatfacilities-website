import { useStaticQuery } from "@hooks/useStaticQuery";
import { GET_USER_CHANNELS } from "@queries/channels";
import { Channel } from "@typeDefs/channel";
import React from "react";
import styled from "styled-components";

import InboxItem from "./Item";

const InboxList: React.FC = () => {
  const { data } = useStaticQuery(GET_USER_CHANNELS);

  const channels: Channel[] | undefined[] =
    data?.getUserChannels || Array(50).fill(undefined);

  return (
    <Container data={!!data}>
      {channels.map((channel, i: number) => {
        return <InboxItem key={i} channel={channel} />;
      })}
    </Container>
  );
};

const Container = styled.div<{ data: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  width: 300px;
  border-right: 1px solid ${({ theme }) => theme.colors.layout.dark};
  overflow: ${({ data }) => (data ? "auto" : "hidden")};
  height: 100%;
`;

export default InboxList;
