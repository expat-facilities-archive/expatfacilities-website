import React from "react";
import { Trip } from "@typeDefs/destinations";
import { formatAmount } from "@utils/formatAmount";

import styled from "styled-components";
import Link from "@components/Layout/Link";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import { calculateWithoutCommission } from "@utils/calculateWithoutCommission";
import { getNbDaysBetweenTwoDate } from "@utils/getNbDaysBetweenTwoDate";

type Props = {
  trip: Trip;
};

const BoxRecap = styled.div`
  border-radius: 10px;
  padding: 34px;
  width: clamp(280px, 350px + 3vw, 500px);
  height: max-content;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  color: ${({ theme }) => theme.colors.text.lightest};
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  gap: 20px;
`;
const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text.lighter};
`;
const TitlePrice = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.semiBold};
`;
const SubTitlePrice = styled.span`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.regular};
  color: ${({ theme }) => theme.colors.text.lighter};
`;
const Display = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    cursor: default;
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
  }
`;
const DisplayRecap = styled(Display)`
  gap: 10px;
  grid-template-areas:
    "depart return"
    "city city";
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    grid-template-areas:
      "depart "
      "return"
      "city";
  }
`;
const DisplayRecapElement = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text.lightest};
  display: flex;
  flex-flow: column nowrap;
  padding: 10px 12px;
`;
const ElementTitles = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.medium};
`;
const ElementContent = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.regular};
  color: ${({ theme }) => theme.colors.text.lighter};
`;
const RecapBtn = styled.button`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.semiBold};
  padding: 15px 24px;
  text-align: center;
  border-radius: 10px;
  border: none;
  background-color: ${({ theme }) => theme.colors.accent.light};
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1;
  user-select: none;
  :hover {
    filter: brightness(0.8);
  }
`;
const SubText = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: ${({ theme }) => theme.colors.text.lighter};
`;
const ListServices = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: 3px;
`;
const ItemServices = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
const DisplayPriceTotal = styled(Display)`
  gap: 5px;
  grid-template-areas:
    "title price"
    "condition condition";
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    grid-template-areas:
      "title "
      "price"
      "condition";
  }
`;
const ElementPriceTotal = styled(TitlePrice)<{
  gridArea: string;
  position: string;
}>`
  grid-area: ${({ gridArea }) => gridArea};
  justify-self: ${({ position }) => position};
`;
const ElementCondition = styled.p<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: ${({ theme }) => theme.colors.text.lighter};
`;
const ConfirmForm: React.FC<Props> = ({ trip }: Props) => {
  const { t: tService } = useTranslation("data/services");
  const { t: tCheckout } = useTranslation("about/aboutus");
  return (
    <>
      <BoxRecap key={trip.id}>
        <Separator />
        <TitlePrice>
          {formatAmount(trip.totalPrice)}{" "}
          <SubTitlePrice>
            {tCheckout("for")}{" "}
            {getNbDaysBetweenTwoDate(trip.date.start, trip.date.end)}{" "}
            {tCheckout("days")}{" "}
          </SubTitlePrice>
        </TitlePrice>
        <DisplayRecap>
          <DisplayRecapElement gridArea={"depart"}>
            <ElementTitles>{tCheckout("departure")}</ElementTitles>
            <ElementContent>
              {new Date(trip.date.start).toLocaleDateString("fr-FR")}
            </ElementContent>
          </DisplayRecapElement>
          <DisplayRecapElement gridArea={"return"}>
            <ElementTitles>{tCheckout("return")}</ElementTitles>
            <ElementContent>
              {new Date(trip.date.end).toLocaleDateString("fr-FR")}
            </ElementContent>
          </DisplayRecapElement>
          <DisplayRecapElement gridArea={"city"}>
            <ElementTitles>{tCheckout("city")}</ElementTitles>
            <ElementContent>{trip.city.name}</ElementContent>
          </DisplayRecapElement>
        </DisplayRecap>
        <RecapBtn
          onClick={() => {
            console.log("Pay " + formatAmount(trip.totalPrice));
          }}
        >
          {tCheckout("placeorder")}
        </RecapBtn>
        <SubText>
          {tCheckout("byplacing")}{" "}
          <Link href={ROUTES.TERMS} target={"_blank"}>
            {tCheckout("tos")}
          </Link>
          {tCheckout("acceptall")}
        </SubText>
        <Separator />
        <ListServices>
          {trip.services.map((services) => {
            return (
              <>
                <ItemServices>
                  <ElementTitles>
                    {tService(services.service.name)}
                  </ElementTitles>
                  <ElementTitles>
                    {formatAmount(services.totalPrice)}
                  </ElementTitles>
                </ItemServices>
              </>
            );
          })}
        </ListServices>
        <DisplayPriceTotal>
          <ElementPriceTotal gridArea={"title"} position={"start"}>
            {tCheckout("totalamount")}
          </ElementPriceTotal>
          <ElementPriceTotal gridArea={"price"} position={"end"}>
            {formatAmount(trip.totalPrice)}{" "}
          </ElementPriceTotal>
          <ElementCondition gridArea={"condition"}>
            {tCheckout("withvat")}{" "}
            {formatAmount(calculateWithoutCommission(trip.totalPrice, 20))}
          </ElementCondition>
        </DisplayPriceTotal>
      </BoxRecap>
    </>
  );
};

export default ConfirmForm;
