import styled from "styled-components";
import Button from "@components/Layout/Button";
import useTranslation from "@hooks/useTranslation";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import router from "next/router";
import ROUTES from "@constants/routes";

const Ambassador: React.FC = () => {
  const { t } = useTranslation("home/ambassador");

  return (
    <Container>
      <TextCol>
        <Text>
          <Title>
            {t("title.become")}
            <br />
            <strong>{t("title.strong")}</strong>
          </Title>
          <Description>{t("description")}</Description>
          <ButtonContainer>
            <DiscoverButton
              onClick={() => {
                router.push(ROUTES.BECOME_AMBASSADOR);
              }}
            >
              {t("become")}
            </DiscoverButton>
            <DiscoverButton
              mode={"darkest"}
              onClick={() => {
                router.push(ROUTES.AMBASSADOR);
              }}
            >
              {t("button")}
            </DiscoverButton>
          </ButtonContainer>
        </Text>
      </TextCol>
      <ThumbnailCol>
        <ThumbnailImage
          src={"/static/images/backgrounds/ambassador.jpg"}
          alt={"Ambassador"}
          width={840}
          height={400}
        />
        <ThumbnailGradient />
      </ThumbnailCol>
    </Container>
  );
};

const Container = styled.div`
  margin: 60px auto 0;
  display: flex;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 10px;
  overflow: hidden;
  height: 300px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    height: auto;
    background-color: unset;
  }
`;

const TextCol = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
    padding: 30px 0;
    margin-left: 0;
  }
`;

const Text = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    text-align: center;
    background-color: ${({ theme }) => theme.colors.layout.darker};
    border-radius: 10px;
    padding: 30px;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.title};
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    font-size: ${({ theme }) => theme.size.large};
  }

  strong {
    font-weight: ${({ theme }) => theme.weight.bold};
  }
`;

const Description = styled.p`
  line-height: 1.25;
  margin-top: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    align-items: center;
    justify-content: center;
  }
`;

const DiscoverButton = styled(Button)`
  margin-top: 30px;
  display: inline-flex;
  :last-child {
    margin-left: 15px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 50%;
  }
`;

const ThumbnailCol = styled.div`
  width: 60%;
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    display: none;
  }
`;

const ThumbnailImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    border-radius: 10px;
  }
`;

const ThumbnailGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.layout.darker} 0%,
    ${({ theme }) => convertRGBToRGBA(theme.colors.layout.darker, 0)} 100%
  );
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    background: none;
  }
`;

export default Ambassador;
