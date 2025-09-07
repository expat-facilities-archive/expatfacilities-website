import DashboardNotification from "@components/Dashboard/Notification";
import { Notification } from "@typeDefs/notification";
import styled from "styled-components";

interface Props {
  notifications: Notification[];
}

const DashboardOverviewNotification: React.FC<Props> = ({
  notifications,
}: Props) => {
  return (
    <Container>
      <Title>Notifications</Title>
      <Content>
        {notifications.map((notification: Notification, key: number) => (
          <DashboardNotification key={key} notification={notification} />
        ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    margin-top: 15px;
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Content = styled.div`
  margin-top: 10px;
`;

export default DashboardOverviewNotification;
