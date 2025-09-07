import Button from "@components/Layout/Button";
import { ToastContext } from "@context/Toast";
import useTranslation from "@hooks/useTranslation";
import { Country } from "@typeDefs/destinations";
import React from "react";
import { elementScrollIntoView } from "seamless-scroll-polyfill";
import styled from "styled-components";

interface Props {
  data: Country;
}

const Featured: React.FC<Props> = ({ data: { name, description } }: Props) => {
  const { t: tCountry } = useTranslation("data/countries", false);
  const { t: tExpatriation } = useTranslation("home/expatriation");
  const { t: tError } = useTranslation("error");
  const { toast } = React.useContext(ToastContext);

  const handleClickToOffers = () => {
    const el = document.getElementById("pick");
    if (el) {
      elementScrollIntoView(el, {
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  };

  return (
    <Container>
      <Title>{tCountry(name)}</Title>
      <Description>{description}</Description>
      <ButtonContainer>
        <Button onClick={handleClickToOffers}>
          {tExpatriation("seeoffers")}
        </Button>
        <Button
          mode={"darker"}
          onClick={() => {
            toast(`${tError("unavailablefeature")}`);
          }}
        >
          {tExpatriation("seedetails")}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.size.extraTitle};
  font-weight: ${({ theme }) => theme.weight.bold};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.title};
  }
`;

const Description = styled.p`
  margin-top: 15px;
  max-width: ${({ theme }) => theme.breakpoint.tablet};
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 60px;
  width: ${({ theme }) => theme.breakpoint.mobile};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    width: unset;
  }

  ${Button} {
    margin-left: 15px;
    flex: 1;

    :first-child {
      margin-left: 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
      flex: unset;
      margin-left: 0;
      margin-top: 5px;

      :first-child {
        margin-top: 0;
      }
    }
  }
`;

export default Featured;
