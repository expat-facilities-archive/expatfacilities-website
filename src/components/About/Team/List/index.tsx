import useTranslation from "@hooks/useTranslation";
import React from "react";
import styled from "styled-components";
import TeamListCard from "./Card";

const TeamList: React.FC = () => {
  const { t } = useTranslation("about/team");

  return (
    <Container>
      <TitleContainer>
        <Title>
          {t("title")} <span>#Expat</span>
        </Title>
        <SubTitle>{t("catchphrase")}</SubTitle>
      </TitleContainer>
      <Content>
        <TitleContainer>
          <Title>{t("founders.title")}</Title>
        </TitleContainer>
      </Content>
      <List>
        <TeamListCard
          link={"https://linkedin.com/in/dylan-de-sousa-10760b176"}
          thumbnailUrl={"/static/images/about/founders/dylan.jpg"}
          title={"Dylan De Sousa"}
          subtitle={t("founders.dylan")}
          mail={"dylan@expatfacilities.co"}
        />
        <TeamListCard
          link={"https://linkedin.com/in/maxence-chalaux-7046a3171"}
          thumbnailUrl={"/static/images/about/founders/maxence.jpg"}
          title={"Maxence Chalaux"}
          subtitle={t("founders.maxence")}
          mail={"maxence@expatfacilities.co"}
        />
        <TeamListCard
          link={"https://linkedin.com/in/jules-ghinozzi-68b3921ab"}
          thumbnailUrl={"/static/images/about/founders/jules.jpg"}
          title={"Jules Ghinozzi"}
          subtitle={t("founders.jules")}
          mail={"jules@expatfacilities.co"}
        />
      </List>
      <TeamContent>
        <TitleContainer>
          <Title>{t("team.title")}</Title>
        </TitleContainer>
      </TeamContent>
      <List>
        <TeamListCard
          link={"https://www.linkedin.com/in/antoinekm"}
          thumbnailUrl={"/static/images/about/team/antoine.jpg"}
          title={"Antoine Kingue"}
          subtitle={t("team.antoine")}
          mail={"antoine@expatfacilities.co"}
        />
        <TeamListCard
          link={"https://www.linkedin.com/in/marc-lambert-"}
          thumbnailUrl={"/static/images/about/team/marc.jpg"}
          title={"Marc Lambert"}
          subtitle={t("team.marc")}
          mail={"marc@expatfacilities.co"}
        />
        <TeamListCard
          link={"https://www.linkedin.com/in/l%C3%A9na-diallo-861641161"}
          thumbnailUrl={"/static/images/about/team/lena.jpg"}
          title={"Léna Diallo"}
          subtitle={t("team.lena")}
          mail={"lena@expatfacilities.co"}
        />
        <TeamListCard
          link={"https://www.linkedin.com/in/jeremybdn"}
          thumbnailUrl={"/static/images/about/team/jeremy.jpg"}
          title={"Jérémy Baudrin"}
          subtitle={t("team.jeremy")}
          mail={"jeremy@expatfacilities.co"}
        />
        <TeamListCard
          link={"https://www.linkedin.com/in/alexis-mouchon/"}
          thumbnailUrl={"/static/images/about/team/alexis.jpg"}
          title={"Alexis Mouchon"}
          subtitle={t("team.alexis")}
          mail={"alexis@expatfacilities.co"}
        />
        <TeamListCard
          link={"https://www.linkedin.com/in/evan-lefrancois-581070206"}
          thumbnailUrl={"/static/images/about/team/evan.jpg"}
          title={"Evan Lefrançois"}
          subtitle={t("team.evan")}
          mail={"evan@expatfacilities.co"}
        />
        <TeamListCard
          link={"https://www.linkedin.com/in/lucasbdn/"}
          thumbnailUrl={"/static/images/about/team/lucas.jpg"}
          title={"Lucas Bodin"}
          subtitle={t("team.lucas")}
          mail={"lucas@expatfacilities.co"}
        />
      </List>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
  }
`;

const TeamContent = styled(Content)`
  margin-top: 50px;
`;

const TitleContainer = styled.div`
  line-height: 1.25;

  :first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h2`
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.large};

  span {
    color: ${({ theme }) => theme.colors.accent.light};
  }
`;

const SubTitle = styled.p`
  font-weight: ${({ theme }) => theme.weight.medium};
  font-size: ${({ theme }) => theme.size.normal};
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-left: -10px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin: 0 auto;
  }
`;

export default TeamList;
