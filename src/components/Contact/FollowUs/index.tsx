import useTranslation from "@hooks/useTranslation";
import React from "react";
import styled from "styled-components";

const FollowUs: React.FC = () => {
  const { t } = useTranslation("contact/followus");
  return (
    <Container>
      <Row>
        <Col>
          <Content>
            <Title>{t("description.title")}</Title>
            <Description>
              {t("description.first")}
              <br />
              {t("description.second")}
              <br />
              {t("description.third")}
            </Description>
          </Content>
        </Col>
        <Col>
          <PhonesImage
            src={"/static/images/phones.png"}
            alt={"Social media previews"}
          />
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  margin-top: 60px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Col = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  :last-child {
    margin-right: 0px;
  }
`;

const Title = styled.h4`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  display: flex;
  margin-top: 30px;
  justify-content: center;
`;

const Description = styled.p`
  margin-top: 40px;
  line-height: 1.5;
  text-align: center;
`;

const PhonesImage = styled.img`
  max-width: 100%;
`;

export default FollowUs;
