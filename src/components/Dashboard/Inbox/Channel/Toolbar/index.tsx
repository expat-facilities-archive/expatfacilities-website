import { DashboardButton } from "@components/Layout/Dashboard";
import Textarea from "@components/Layout/Textarea";
import { UnsentChannelMessage } from "@typeDefs/channel-message";
import { User } from "@typeDefs/user";
import { useState, KeyboardEvent } from "react";
import styled from "styled-components";

interface Props {
  channelId: string;
  sender: User;
  pushMessage: (message: UnsentChannelMessage) => void;
}

const ChannelToolbar: React.FC<Props> = ({
  channelId,
  sender,
  pushMessage,
}: Props) => {
  const [typedMessage, setTypedMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (typedMessage.length > 0) {
      pushMessage({
        channelId,
        sender,
        content: typedMessage,
        attachements: [],
      });
      setTypedMessage("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSendMessage();
    }
  };

  return (
    <Container>
      <ChatTextArea
        name="message"
        placeholder={"Type a message..."}
        value={typedMessage}
        onChange={(e) => setTypedMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <DashboardButton
        type="submit"
        onClick={() => {
          handleSendMessage();
        }}
      >
        Send
      </DashboardButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  padding: 0 20px;
`;

const ChatTextArea = styled(Textarea)`
  display: flex;
  flex: 1;
  height: 40px;
`;

export default ChannelToolbar;
