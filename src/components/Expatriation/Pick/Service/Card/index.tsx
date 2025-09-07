import React from "react";
import Markdown from "react-markdown";
import Button from "@components/Layout/Button";
import { Service } from "@typeDefs/services";
import styled from "styled-components";
import { formatAmount } from "@utils/formatAmount";
import useTranslation from "@hooks/useTranslation";
import Icon from "@components/Layout/Icon";
import useModal from "@hooks/useModal";
import Modal from "@components/Layout/Modal";
import ServiceIcon from "@components/Service/Icon";

interface Props {
  data: Service;
  selectedServices: number[];
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>;
}

const Card: React.FC<Props> = ({
  data: {
    id,
    name,
    type,
    price,
    startingPrice,
    description,
    details,
    available,
  },
  selectedServices,
  setSelectedServices,
}: Props) => {
  const { t: tData } = useTranslation("data/services");
  const { t: tDetail } = useTranslation("expatriation/country");
  const { t: tExpatriation } = useTranslation("home/expatriation");

  const handleClick = () => {
    if (selectedServices.includes(id))
      setSelectedServices(selectedServices.filter((s) => s !== id));
    else setSelectedServices([...selectedServices, id]);
  };

  const [active, open, close] = useModal();

  return (
    <Container active={selectedServices.includes(id)}>
      <Header>
        <TitleContainer>
          <ServiceIcon serviceType={type} size={60} />
          <Title>{tData(name)}</Title>
        </TitleContainer>
        <PriceContainer>
          {available ? (
            <>
              <PriceTitle>
                {price
                  ? tDetail("details.price")
                  : startingPrice && tDetail("details.startingat")}
              </PriceTitle>
              <Price>
                {price
                  ? formatAmount(price)
                  : startingPrice && formatAmount(startingPrice)}
              </Price>
            </>
          ) : (
            <>
              <Price>{tDetail("details.unavailable")}</Price>
              <PriceTitle>{tDetail("details.thiscountry")}</PriceTitle>
            </>
          )}
        </PriceContainer>
      </Header>
      <Content>
        <Description>{tData(description)}</Description>
      </Content>
      <Footer>
        {available && (
          <Button
            mode={selectedServices.includes(id) ? "alert" : "normal"}
            onClick={handleClick}
            prefix={
              <Icon
                name={selectedServices.includes(id) ? "close" : "shopping-cart"}
                fill={selectedServices.includes(id)}
              />
            }
          >
            {selectedServices.includes(id)
              ? tDetail("details.removebutton")
              : tDetail("details.addbutton")}
          </Button>
        )}
        <Button mode={"darkest"} onClick={open}>
          {tExpatriation("seemore")}
        </Button>
      </Footer>
      <Modal.Modal active={active} onClickOutside={close}>
        <Modal.Body>
          <Details>{tData(details)}</Details>
        </Modal.Body>

        <Modal.Actions>
          <Modal.Action onClick={close}>Close</Modal.Action>
        </Modal.Actions>
      </Modal.Modal>
    </Container>
  );
};

const Container = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 10px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.accent.light : theme.colors.layout.darker};
  width: calc(50% - 15px * 2 - 15px - 1px * 2);
  padding: 15px;
  margin-left: 15px;

  :hover {
    transform: scale(1.005);
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: calc(100% - 15px * 2 - 15px - 1px * 2);
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.medium};
  margin-left: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PriceTitle = styled.h4``;

const Price = styled.h5`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.size.normal};
`;

const Details = styled(Markdown)`
  margin-top: 10px;
  border-radius: 10px;
  line-height: 1.5;
  font-size: ${({ theme }) => theme.size.normal};
  word-wrap: break-word;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 0;
    padding: 30px 0;
  }

  h1 {
    font-size: ${({ theme }) => theme.size.medium};
    font-weight: ${({ theme }) => theme.weight.bold};
    padding-bottom: 15px;
  }
  h2 {
    padding-bottom: 10px;
    font-size: ${({ theme }) => theme.size.medium};
    font-weight: ${({ theme }) => theme.weight.medium};
  }

  ul {
    li {
      margin: 15px 0 10px 25px;

      &::before {
        content: "•";
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }

  br {
    content: " ";
    display: block;
    margin: 20px 0;
  }

  a {
    text-decoration: underline;
  }

  b,
  strong {
    font-weight: ${({ theme }) => theme.weight.bold};
  }

  i,
  em {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  figure figcaption {
    font-style: italic;
    color: ${({ theme }) => theme.colors.text.light};
    font-size: ${({ theme }) => theme.size.small};
  }

  img {
    max-width: 100%;
    max-height: 500px;
    border-radius: 10px;
    object-fit: cover;
    user-select: none;
    pointer-events: none;

    @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
      max-height: 300px;
    }
  }

  p {
    padding: 10px 0;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding-top: 15px;
  display: flex;

  ${Button} {
    flex: 1;
    margin-left: 10px;

    :first-child {
      margin-left: 0;
    }
  }
`;

export default Card;
