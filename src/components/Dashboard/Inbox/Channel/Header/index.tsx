import Avatar from "@components/Avatar";
import { User } from "@typeDefs/user";
import React from "react";
import styled from "styled-components";

interface ChannelHeaderProps {
  user: User;
  interlocutors: User[];
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({
  user,
  interlocutors,
}: ChannelHeaderProps) => {
  const interlocutorsWithoutUser: User[] = interlocutors.filter(
    (interlocutor: User) => interlocutor.id !== user.id
  );

  return (
    <Container>
      <Content>
        <IconContainer>
          <Avatar user={interlocutorsWithoutUser[0]} />
        </IconContainer>
        <ReceiverContent>
          <Title>{`${interlocutorsWithoutUser
            .map(
              (interlocutor: User) =>
                `${interlocutor.firstName} ${interlocutor.lastName}`
            )
            .join(", ")}`}</Title>
        </ReceiverContent>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  pointer-events: none;
`;

const ReceiverContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  line-height: 1.2;
`;

const Title = styled.h4`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
  color: ${({ theme }) => theme.colors.text.lightest};
`;

export default ChannelHeader;
