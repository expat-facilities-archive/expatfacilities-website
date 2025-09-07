import Button from "@components/Layout/Button";
import Icon from "@components/Layout/Icon";
import styled from "styled-components";

const DashboardTravelServiceListCard: React.FC = () => {
  return (
    <Container>
      <Col>
        <IconContainer>
          <Icon name={"information"} fill size={25} />
        </IconContainer>
      </Col>
      <Col>
        <Title>Housing</Title>
      </Col>
      <Col flex={1} center>
        ProgressBar
      </Col>
      <Col flex={1} center>
        ProgressInfos
      </Col>
      <Col>
        <Button mode={"darker"}>See History</Button>
      </Col>
      <Col>
        <Button>Add Informations</Button>
      </Col>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 5px;
  display: flex;
  padding: 10px;
  :first-child {
    margin-top: 0;
  }
`;

const Col = styled.div<{ flex?: number; center?: boolean }>`
  display: flex;
  ${({ flex }) => flex && `flex: ${flex}`};
  padding: 0 10px;
  align-items: center;
  ${({ center }) => center && "justify-content: center; text-align: center;"}

  :first-child {
    padding-left: 0;
  }

  :last-child {
    padding-right: 0;
  }
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const IconContainer = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${({ theme }) => theme.colors.layout.dark};
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default DashboardTravelServiceListCard;
