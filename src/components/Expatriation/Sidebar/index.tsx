import styled from "styled-components";
import { City, Country } from "@typeDefs/destinations";
import Button from "@components/Layout/Button";
import Link from "@components/Layout/Link";
import { APP_URL } from "@constants/main";
import { useRouter } from "next/router";
import Resume from "./Resume";
import { Service } from "@typeDefs/services";
import Icon from "@components/Layout/Icon";
import useTranslation from "@hooks/useTranslation";

interface Props {
  country: Country;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
  selectedCity: City | null;
  checkInDate: {
    value: Date;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
  };
  checkOutDate: {
    value: Date;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
  };
  selectedServices: Array<number>;
  services: Service[];
}

const Sidebar: React.FC<Props> = ({
  country,
  setSelectedCity,
  selectedCity,
  selectedServices,
  checkInDate,
  checkOutDate,
  services,
}: Props) => {
  const router = useRouter();
  const { t: tExpatriation } = useTranslation("home/expatriation");

  return (
    <Container>
      <StickyContainer>
        <Resume
          country={country}
          setSelectedCity={setSelectedCity}
          selectedCity={selectedCity}
          selectedServices={selectedServices}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          services={services}
        />
        <Section>
          <SectionTitleContainer>
            <SectionTitle>{tExpatriation("sharedestination")}</SectionTitle>
          </SectionTitleContainer>
          <SectionContent>
            <SocialRow>
              <SocialButton
                href={`mailto:?subject=Cette%20destination%20pourrait%20t'int%C3%A9resser%20!&body=J'ai%20vu%20cette%20destination%20sur%20${APP_URL}${router.asPath}%0A%0AJettes-y%20un%20coup%20d'%C5%93il%20!%20`}
                title={"Email"}
                normal={{
                  background: "#4b4b4c",
                  border: "#4b4b4c",
                }}
              >
                <Icon name={"mail"} fill size={24} />
              </SocialButton>
              <SocialButton
                href={`https://facebook.com/sharer/sharer.php?u=${APP_URL}${router.asPath}&amp;src=sdkpreparse`}
                title={"Facebook"}
                normal={{
                  background: "#0b65c2",
                  border: "#0b65c2",
                }}
              >
                <Icon name={"facebook"} fill size={24} />
              </SocialButton>
              <SocialButton
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${APP_URL}${router.asPath}`}
                title={"LinkedIn"}
                normal={{
                  background: "#0b65c2",
                  border: "#0b65c2",
                }}
              >
                <Icon name={"linkedin"} fill size={24} />
              </SocialButton>
              <SocialButton
                href={`https://twitter.com/intent/tweet?url=${APP_URL}${router.asPath}&text=J'ai%20trouvé%20cette%20destination%20sur%20:&via=expatfacilities`}
                title={"Twitter"}
                normal={{
                  background: "#1c9bef",
                  border: "#1c9bef",
                }}
              >
                <Icon name={"twitter"} fill size={24} />
              </SocialButton>
            </SocialRow>
          </SectionContent>
        </Section>
      </StickyContainer>
    </Container>
  );
};

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width: 100%;
  max-width: 400px;
  margin-left: 15px;
  margin-top: -15px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-left: 0;
    max-width: 100%;
    padding: 0 15px;
    width: calc(100% - 15px * 2);
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 15px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    top: 0;
    position: static;
  }
`;

const Section = styled.section`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const SectionTitleContainer = styled.div`
  padding-left: 15px;
  border-left: 2px solid ${({ theme }) => theme.colors.accent.light};
  line-height: 1.25;
`;

const SectionTitle = styled.h3`
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.small};
`;

const SectionContent = styled.div`
  display: flex;
  margin-top: 10px;
`;

const SocialRow = styled.div`
  display: flex;
`;

const SocialButton = styled(({ children, ...props }) => (
  <Button forwardedAs={Link} {...props}>
    {children}
  </Button>
))`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  padding: 6px;

  :first-child {
    margin-left: 0;
  }
`;

export default Sidebar;
