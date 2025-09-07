import Wrapper from "@components/Wrapper";
import { NextPage } from "next";
import LayoutContainer from "@components/Layout/Container";
import LayoutMain from "@components/Layout/Main";
import Head from "@components/Head";
import Link from "@components/Layout/Link";
import styled from "styled-components";
import React from "react";
import colorsData from "@data/colors";
import Button from "@components/Layout/Button";
import { Color } from "@typeDefs/colors";
import useTranslation from "@hooks/useTranslation";

const Branding: NextPage = () => {
  const { t } = useTranslation("branding/common");
  return (
    <Wrapper>
      <LayoutMain>
        <Head title={t("head.title")} description={t("head.description")} />
        <LayoutContainer>
          <BrandSection>
            <BrandCol>
              <BrandTitle>Brand</BrandTitle>
              <BrandText>
                {`Expat’s Facilities est une startup spécialisée dans
            l’expatriation des jeunes à l’international. Notre image de marque:
            jeune, dynamique, professionnel, reflétant le désir de voyager, tout
            en gardant un design global trendy, épuré et simpliste.`}
              </BrandText>
            </BrandCol>
            <LogoCol>
              <BrandLogo
                src={"/static/images/logo/logo.png"}
                alt={"Expat Facilities logo"}
              />
            </LogoCol>
          </BrandSection>

          <Section>
            <SectionTitle>Our Logo</SectionTitle>
            <SectionText>
              {
                "Please do not edit, change, distort, recolor, or reconfigure the Expat’s Facilities logo."
              }
            </SectionText>
            <LogoContainer>
              <LogoCard>
                <LogoImage
                  src={"/static/images/logo/logo.png"}
                  alt={"Expat Facilities logo"}
                />
              </LogoCard>
              <LogoCard light>
                <LogoImage
                  src={"/static/images/logo/logo-black.png"}
                  alt={"Expat Facilities logo"}
                />
              </LogoCard>
            </LogoContainer>
            <SectionTitle>Alternate Logos</SectionTitle>
            <SectionText>
              {`Use these only when the Expat’s Facilities brand is clearly visible or has been well established elsewhere
on the page or in the design. (When in doubt, use the other one.)`}
            </SectionText>
            <LogoContainer>
              <LogoCard>
                <LogoImage
                  src={"/static/images/logo/logo.png"}
                  alt={"Expat Facilities logo"}
                />
              </LogoCard>
              <LogoCard light>
                <LogoImage
                  src={"/static/images/logo/logo-black.png"}
                  alt={"Expat Facilities logo"}
                />
              </LogoCard>
            </LogoContainer>
            <SectionTitle>Spacing</SectionTitle>
            <SectionText></SectionText>
          </Section>

          <Section>
            <SectionTitle>Typography</SectionTitle>
            <SectionText>
              {
                "Most of the time we use Plus Jakarta Sans for its clear and beautiful shapes."
              }
              <TypographyText>{"Write text to try :"}</TypographyText>
            </SectionText>
            <TypographyFont contentEditable>
              {"Almost before we knew it, we had left the ground."}
            </TypographyFont>
          </Section>

          <Section>
            <SectionTitle>Colors</SectionTitle>
            <ColorContainer>
              {colorsData.map(
                (
                  { hex, rgb, textColor, backgroundColor }: Color,
                  i: number
                ) => {
                  return (
                    <ColorCard
                      key={i}
                      textColor={textColor}
                      backgroundColor={backgroundColor}
                    >
                      <ColorHexCode>{hex}</ColorHexCode>
                      <ColorRgbCode>{rgb}</ColorRgbCode>
                    </ColorCard>
                  );
                }
              )}
            </ColorContainer>
            <MoreContainer>
              <MoreTitle>Looking for more?</MoreTitle>
              <MoreText>
                {
                  "Download the full Expat’s Facilities media kit and get: app icons, banners, logos and more."
                }
              </MoreText>
              <MediaKitButton href={"#"}>{"Download media kit"}</MediaKitButton>
            </MoreContainer>
          </Section>
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

const BrandSection = styled.div`
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  color: ${({ theme }) => theme.colors.text.lightest};
  padding-bottom: 90px;
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column-reverse;
  }
`;

const BrandCol = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    text-align: center;
  }
`;

const LogoCol = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
`;

const BrandTitle = styled.h1`
  font-size: calc(${({ theme }) => theme.size.large} * 2);
  font-weight: ${({ theme }) => theme.weight.bold};
  margin-bottom: 30px;
`;

const BrandText = styled.p`
  max-width: 678px;
  line-height: 1.25;
`;

const BrandLogo = styled.img`
  display: flex;
  height: 175px;
  width: 175px;
`;

const Section = styled.div`
  padding: 60px 0;
  :first-child {
    padding-top: 120px;
  }
  :last-child {
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 30px;
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
  :first-child {
    margin-top: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    text-align: center;
  }
`;

const SectionText = styled.p`
  margin-top: 10px;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
  line-height: 1.25;
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;

const LogoCard = styled.div<{ light?: boolean }>`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  /* background-color: transparent; */
  background-image: ${({ light }) =>
    light
      ? "linear-gradient(45deg,#f6f6f6 25%,transparent 0,transparent 75%,#f6f6f6 0,#f6f6f6),linear-gradient(45deg,#f6f6f6 25%,transparent 0,transparent 75%,#f6f6f6 0,#f6f6f6)"
      : "linear-gradient(45deg,#222427 25%,transparent 0,transparent 75%,#222427 0,#222427),linear-gradient(45deg,#222427 25%,transparent 0,transparent 75%,#222427 0,#222427)"};
  background-size: 30px 30px;
  background-position: 0 0, 45px 45px;
  background-color: ${({ light }) => (light ? "#ffffff" : "transparent")};
  align-items: center;
  margin-left: 15px;
  width: calc(300px - 10px * 2);
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  :first-child {
    margin-left: 0;
  }
`;

const LogoImage = styled.img`
  display: flex;
  height: 100px;
  width: 100px;
`;

const TypographyText = styled.span`
  margin-top: 15px;
`;

const TypographyFont = styled.span`
  resize: none;
  border: none;
  outline: none;
  border-radius: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.lightest};
  transition: all 0.2s;
  width: 100%;
  overflow: hidden;
  min-height: 40px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  font-size: calc(${({ theme }) => theme.size.large} * 2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  &[contenteditable]:empty::before {
    content: "Write...";
    color: ${({ theme }) => theme.colors.text.light};
    pointer-events: none;
    user-select: none;
  }
`;

const ColorContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-left: -10px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    align-items: center;
    justify-content: initial;
  }
`;

const ColorCard = styled.div<{
  backgroundColor: string;
  textColor: string;
}>`
  width: calc(33.3% - 10px - 10px * 2 - 2px * 2);
  height: calc(175px - 10px * 2 - 2px * 2);
  padding: 10px;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: ${({ textColor }) => textColor};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: calc(calc(100% - 10px - 10px * 2 - 2px * 2));
  }
`;

const ColorHexCode = styled.div``;

const ColorRgbCode = styled.div``;

const MoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MoreTitle = styled.h1`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
  margin-top: 30px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin: 0 auto;
    margin-top: 30px;
  }
`;

const MoreText = styled.p`
  margin-top: 5px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 15px;
  }
`;

const MediaKitButton = styled(({ children, ...props }) => (
  <Button forwardedAs={Link} {...props}>
    {children}
  </Button>
))`
  font-weight: ${({ theme }) => theme.weight.regular};
  margin: 25px 0 70px 0;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin: 0 auto;
    margin-top: 25px;
  }
`;

export default Branding;
