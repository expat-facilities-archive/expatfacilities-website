import styled from "styled-components";
import Button from "@components/Layout/Button";
import useTranslation from "@hooks/useTranslation";

const Featured: React.FC = () => {
  const { t } = useTranslation("contact/featured");
  return (
    <Container>
      <Title>{t("title")}</Title>
      <Box>
        <BoxTitle>
          {t("need")}
          <br /> {t("info")}
        </BoxTitle>
        <BoxText>
          {t("boxtext.first")}
          {t("boxtext.second")} <br />
          {t("boxtext.third")}
        </BoxText>
        <Choose
          href={
            "mailto:contact@expatfacilities.co?Subject=I%20need%20more%20information%20/%20J'ai%20besoin%20d'un%20renseignement"
          }
        >
          {t("boxtext.button")}
        </Choose>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 455px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 10px 30px 30px 30px;
  border-radius: 25px;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 300px;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.extraTitle};
  font-weight: ${({ theme }) => theme.weight.bold};
  display: flex;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    text-align: center;
  }
`;

const BoxTitle = styled.h4`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-align: center;
  display: flex;
  margin-top: 30px;
`;

const BoxText = styled.p`
  margin-top: 40px;
  line-height: 1.8;
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    text-align: center;
  }
`;

const Choose = styled(({ children, ...props }) => (
  <Button forwardedAs={"a"} {...props}>
    {children}
  </Button>
))`
  width: fit-content;
  padding: 15px 50px 15px 50px;
  margin-top: 40px;
`;

export default Featured;
