import { Notification } from "@typeDefs/notification";
import styled from "styled-components";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { fr } from "date-fns/locale";
import Icon from "@components/Layout/Icon";

interface Props {
  notification: Notification;
}

const DashboardNotification: React.FC<Props> = ({ notification }: Props) => {
  const { locale } = useRouter();

  return (
    <Container>
      <Col>
        <NotificationIcon
          name={
            notification.type === "ticket"
              ? "coupon-3"
              : notification.type === "message"
              ? "chat-3"
              : notification.type === "validation"
              ? "bookmark-3"
              : notification.type === "document"
              ? "file-zip"
              : "bookmark-3"
          }
          fill
          size={18}
          color={
            notification.type === "ticket"
              ? "#4F9EE8"
              : notification.type === "message"
              ? "#F49B14"
              : notification.type === "validation"
              ? "#26BE19"
              : notification.type === "document"
              ? "#D8481B"
              : "#FFFFFF"
          }
          background={
            notification.type === "ticket"
              ? "rgba(79, 158, 232, 0.2)"
              : notification.type === "message"
              ? "rgba(244, 155, 20, 0.2)"
              : notification.type === "validation"
              ? "rgba(38, 190, 25, 0.2)"
              : notification.type === "document"
              ? "rgba(216, 72, 27, 0.2)"
              : "rgba(255,255,255,0.2)"
          }
        />
        <NotificationsContent>{notification.content}</NotificationsContent>
      </Col>
      <Col>
        {" "}
        {formatDistanceToNowStrict(new Date(notification.createdAt), {
          locale: locale === "fr" ? fr : undefined,
          addSuffix: true,
        })}
      </Col>
    </Container>
  );
};

const NotificationsContent = styled.div`
  /* max-width: 50ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
`;

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 3px 20px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border: 1px solid ${({ theme }) => theme.colors.layout.dark};
  margin-bottom: 5px;
  user-select: none;
  text-overflow: ellipsis;
  transition: all 0.2s;
  min-height: 30px;
  border-radius: 5px;

  :hover {
    background-color: ${({ theme }) => theme.colors.layout.darkest};
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  ${({ color }) => color && `color: ${color}`};
  padding: 0 10px;
  min-height: 50px;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.size.small};

  :first-child {
    padding-left: 0;
  }

  :last-child {
    padding-right: 0;
    white-space: nowrap;
  }
`;

const NotificationIcon = styled(Icon)<{ background: string }>`
  width: 30px;
  flex-shrink: 0;
  height: 30px;
  ${({ background }) => background && `background: ${background}`};
  border-radius: 5px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
`;

export default DashboardNotification;
