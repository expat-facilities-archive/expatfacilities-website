import Avatar from "@components/Avatar";
import Skeleton from "@components/Layout/Skeleton";
import ROUTES from "@constants/routes";
import { AuthContext } from "@context/Auth";
import { Channel } from "@typeDefs/channel";
import { User } from "@typeDefs/user";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface InboxItemProps {
  channel: Channel | undefined;
}

const InboxItem: React.FC<InboxItemProps> = ({ channel }: InboxItemProps) => {
  const router = useRouter();
  const { user: currentUser } = React.useContext(AuthContext);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    if (channel) router.push(`${ROUTES.DASHBOARD_INBOX}/${channel.id}`);
  };

  const user: User | undefined = channel?.interlocutors.find(
    (interlocutor: User) => interlocutor.id !== currentUser?.id
  );

  const title: string | undefined = channel?.interlocutors
    .filter((interlocutor: User) => interlocutor.id !== currentUser?.id)
    .map(
      (interlocutor: User) =>
        `${interlocutor.firstName} ${interlocutor.lastName}`
    )
    .join(", ");

  const description = channel?.description || "";

  return (
    <Container onClick={handleClick} user={!!user}>
      <IconContainer>
        <Avatar user={user} />
      </IconContainer>
      <Content>
        <Skeleton width={150} height={16} show={!title}>
          {title ? <Title>{title}</Title> : null}
        </Skeleton>
        <Skeleton
          width={300}
          height={11}
          style={{ marginTop: 3 }}
          show={!description}
        >
          {description ? <Description>{description}</Description> : null}
        </Skeleton>
      </Content>
    </Container>
  );
};

const Container = styled.li<{ user: boolean }>`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.layout.dark};
  cursor: ${({ user }) => (user ? "pointer" : "default")};
  transition: all 0.2s;
  user-select: none;

  :hover {
    padding-left: 20px;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.layout.darkest};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding-left: 10px;
  overflow: hidden;
`;

const Title = styled.p``;

const Description = styled.p`
  font-size: ${({ theme }) => theme.size.small};
  color: ${({ theme }) => theme.colors.text.light};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default InboxItem;
