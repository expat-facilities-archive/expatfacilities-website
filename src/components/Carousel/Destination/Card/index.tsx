import Button from "@components/Layout/Button";
import Link from "@components/Layout/Link";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import { Country } from "@typeDefs/destinations";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import styled from "styled-components";

interface Props {
  country: Country;
}

const DestinationCard: React.FC<Props> = ({ country }: Props) => {
  const { t } = useTranslation("carousels/common");
  const { t: tCountries } = useTranslation("data/countries");
  return (
    <Container
      itemScope
      itemType="https://schema.org/Place"
      thumbnailUrl={country.thumbnailUrl}
    >
      <Content>
        <ContentRow>
          <TextContainer>
            <Title itemProp="name">{tCountries(country.name)}</Title>
            <SubTitle itemProp="keywords">
              {country.cities.map((city) => city.name).join(", ")}
            </SubTitle>
          </TextContainer>
          <Button
            forwardedAs={Link}
            href={ROUTES.EXPATRIATION + "/" + country.slug}
          >
            {t("discoverBtn")}
          </Button>
          <meta itemProp="latitude" content={country.latitude.toString()} />
          <meta itemProp="longitude" content={country.longitude.toString()} />
        </ContentRow>
      </Content>
    </Container>
  );
};

const Container = styled.div<{ thumbnailUrl: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 500px;
  height: 300px;
  background: ${({ theme }) => theme.colors.layout.darkest};
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      ${({ theme }) => convertRGBToRGBA(theme.colors.layout.darkest, 0.9)} 100%
    ),
    url(${({ thumbnailUrl }) => thumbnailUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: auto;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px;
  height: calc(100% - 30px * 2);
  width: calc(100% - 30px * 2);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 1s;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  width: calc(100% - 15px);
  overflow: hidden;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const SubTitle = styled.div`
  font-size: ${({ theme }) => theme.size.small};
  color: ${({ theme }) => theme.colors.text.light};
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default DestinationCard;
