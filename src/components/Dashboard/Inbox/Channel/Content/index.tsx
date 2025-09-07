import { AuthContext } from "@context/Auth";
import {
  ChannelMessage,
  UnsentChannelMessage,
} from "@typeDefs/channel-message";
import React from "react";
import styled from "styled-components";
import ChannelContentMessage from "./Message";

interface Props {
  messages: ChannelMessage[];
  unsentMessages: UnsentChannelMessage[];
}

const ChannelContent: React.FC<Props> = ({
  messages,
  unsentMessages,
}: Props) => {
  const { user } = React.useContext(AuthContext);

  return (
    <Container>
      {unsentMessages.map((message: UnsentChannelMessage, index: number) => (
        <ChannelContentMessage
          key={index}
          user={message.sender}
          content={message.content}
          self={true}
          sent={false}
        />
      ))}
      {messages.map((message: ChannelMessage) => (
        <ChannelContentMessage
          key={message.id}
          user={message.sender}
          content={message.content}
          self={user && user.id === message.sender.id}
          sent={true}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  padding: 0 10px;
  overflow-y: auto;
`;

export default ChannelContent;
