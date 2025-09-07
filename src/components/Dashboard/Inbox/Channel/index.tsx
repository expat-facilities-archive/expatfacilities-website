import { useStaticMutation, useStaticQuery } from "@hooks/useStaticQuery";
import Head from "@components/Head";
import Loading from "@components/Layout/Loading";
import {
  GET_CHANNEL,
  RETRIEVE_CHANNEL_MESSAGES,
  SEND_CHANNEL_MESSAGE,
} from "@queries/channels";
import {
  ChannelMessage,
  UnsentChannelMessage,
} from "@typeDefs/channel-message";
import { User } from "@typeDefs/user";
import React from "react";
import styled from "styled-components";
import ChannelContent from "./Content";
import ChannelHeader from "./Header";
import ChannelToolbar from "./Toolbar";

interface ChannelProps {
  id: string;
  sender: User;
}

const Channel: React.FC<ChannelProps> = ({ id, sender }: ChannelProps) => {
  const [messages, setMessages] = React.useState<ChannelMessage[]>([]);
  const [unsentMessages, setUnsentMessages] = React.useState<
    UnsentChannelMessage[]
  >([]);

  const channelContentContainerRef = React.useRef<HTMLDivElement>(null);

  const pushMessage = (unsentMessage: UnsentChannelMessage) => {
    scrollToBottom();
    setUnsentMessages([unsentMessage, ...unsentMessages]);

    sendChannelMessage({
      variables: {
        channelMessageInput: {
          channelId: unsentMessage.channelId,
          senderId: unsentMessage.sender.id,
          content: unsentMessage.content,
          attachements: unsentMessage.attachements,
        },
      },
    }).then(({ data: { sendChannelMessage: message } }) => {
      setMessages([{ ...message }, ...messages]);
      setUnsentMessages(
        unsentMessages.filter(
          (message) => message.content !== unsentMessage.content
        )
      );
    });
  };

  const [sendChannelMessage] = useStaticMutation(SEND_CHANNEL_MESSAGE);

  const getChannelQuery = useStaticQuery(GET_CHANNEL, {
    variables: {
      channelId: id,
    },
  });

  const retrieveChannelMessagesQuery = useStaticQuery(
    RETRIEVE_CHANNEL_MESSAGES,
    {
      variables: {
        channelId: id,
        limit: 30,
      },
    }
  );

  const scrollToBottom = () => {
    if (channelContentContainerRef.current) {
      channelContentContainerRef.current.scrollTop =
        channelContentContainerRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    if (
      retrieveChannelMessagesQuery.data &&
      retrieveChannelMessagesQuery.data.retrieveChannelMessages
    ) {
      const sentMessages: ChannelMessage[] =
        retrieveChannelMessagesQuery.data.retrieveChannelMessages.map(
          (message: ChannelMessage) => ({
            ...message,
            sent: true,
          })
        );

      setMessages(sentMessages);
    }
    scrollToBottom();

    //TODO: Connect to websocket and listen to new messages to add to ChannelMessage state
  }, [retrieveChannelMessagesQuery.data]);

  if (getChannelQuery.loading || retrieveChannelMessagesQuery.loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (getChannelQuery.error || retrieveChannelMessagesQuery.error) {
    // TOAST MESSAGE ERROR
  }

  return (
    <>
      <Head
        title={"Messages"}
        subtitle={`${sender.firstName} ${sender.lastName}`}
      />
      <Container>
        <ChannelHeader
          user={sender}
          interlocutors={getChannelQuery.data.getChannel.interlocutors}
        />
        {messages && (
          <ChannelContent messages={messages} unsentMessages={unsentMessages} />
        )}
        <ChannelToolbar
          channelId={id}
          sender={sender}
          pushMessage={pushMessage}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
`;

export default Channel;
