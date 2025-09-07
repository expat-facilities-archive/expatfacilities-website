import ROUTES from "@constants/routes";
import React from "react";
import styled from "styled-components";
import Card from "./Card";

const FooterList: React.FC = () => {
  return (
    <Container>
      <Card link={ROUTES.SUPPORT} emoji={"🆘"} title={"Help"} />
      <Card
        link={"https://twitter.com/expatfacilities"}
        emoji={"🐦"}
        title={"Twitter"}
      />
      <Card
        link={"https://facebook.com/expatfacilities"}
        emoji={"📰"}
        title={"Facebook"}
      />
      <Card
        link={"https://instagram.com/expatfacilities"}
        emoji={"📷"}
        title={"Instagram"}
      />
      <Card
        link={"https://linkedin.com/company/expatfacilities"}
        emoji={"💼"}
        title={"LinkedIn"}
      />
      <Card
        link={"https://tiktok.com/@expatfacilities"}
        emoji={"🎨"}
        title={"TikTok"}
      />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  padding-bottom: 50px;
  flex-direction: column;
  align-items: center;
  padding: 100px 15px 0;
  width: calc(100% - 15px * 2);
`;

export default FooterList;
