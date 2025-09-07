import Avatar from "@components/Avatar";
import { User } from "@typeDefs/user";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

interface Props {
  user?: User;
  content: string;
  self?: boolean;
  sent: boolean;
}

const ChannelContentMessage: React.FC<Props> = ({
  user,
  content,
  self = false,
  sent = false,
}: Props) => {
  if (!user) {
    return null;
  }

  return (
    <Container self={self}>
      <PictureContainer>
        <SenderPicture user={user} />
      </PictureContainer>
      <Content>
        <Sender>{`${user.firstName} ${user.lastName}`}</Sender>
        <Message sent={sent}>{content}</Message>
      </Content>
    </Container>
  );
};

const Container = styled.div<{ self: boolean }>`
  margin-top: 10px;
  display: flex;
  line-height: 1.2;
`;

const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  pointer-events: none;
`;

const SenderPicture = styled(Avatar)`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  object-fit: center;
`;

const Sender = styled.div`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 5px;
`;

const Message = styled(ReactMarkdown)<{ sent: boolean }>`
  color: ${({ theme, sent }) =>
    sent ? theme.colors.text.lightest : theme.colors.text.light};

  h1 {
    font-size: ${({ theme }) => theme.size.medium};
    font-weight: ${({ theme }) => theme.weight.bold};
    padding-bottom: 15px;
  }
  h2 {
    padding-bottom: 10px;
    font-size: ${({ theme }) => theme.size.medium};
    font-weight: ${({ theme }) => theme.weight.medium};
  }

  ul {
    li {
      margin: 15px 0 10px 25px;

      &::before {
        content: "•";
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }

  br {
    content: " ";
    display: block;
    margin: 20px 0;
  }

  a {
    text-decoration: underline;
  }

  b,
  strong {
    font-weight: ${({ theme }) => theme.weight.bold};
  }

  i,
  em {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  figure figcaption {
    font-style: italic;
    color: ${({ theme }) => theme.colors.text.light};
    font-size: ${({ theme }) => theme.size.small};
  }

  img {
    max-width: 100%;
    max-height: 500px;
    border-radius: 10px;
    object-fit: cover;
    user-select: none;
    pointer-events: none;

    @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
      max-height: 300px;
    }
  }

  p {
    padding: 10px 0;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }
  }
`;

export default ChannelContentMessage;
