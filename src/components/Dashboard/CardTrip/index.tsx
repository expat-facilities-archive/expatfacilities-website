import router from "next/router";
import React from "react";
import { formatAmount } from "@utils/formatAmount";

import styled from "styled-components";
import useTranslation from "@hooks/useTranslation";
import { ShowBoxColor } from "@components/Dashboard/ShowBoxColor";

type Props = {
  id: string;
  city: string;
  url: string;
  status: string;
  price: number;
  service: number;
  startDate: string;
  endDate: string;
  route: string;
};

const CardTrip: React.FC<Props> = ({
  id,
  city,
  status,
  price,
  service,
  startDate,
  endDate,
  url,
  route,
}: Props) => {
  const { t: tCommon } = useTranslation("dashboard/common");

  const handleClickGoToTrip = () => {
    router.push(`${route}/${id}`);
  };

  return (
    <Container bgUrl={url} onClick={handleClickGoToTrip}>
      <CardElement gridArea={"city"} bold>
        {city}
      </CardElement>
      <CardElementStatuses gridArea={"status"} justify={"end"}>
        {ShowBoxColor(status, {
          replace_value: [
            tCommon("status.paid"),
            tCommon("status.pending"),
            tCommon("status.cancel"),
          ],
          isBoolean: false,
        })}
      </CardElementStatuses>
      <CardElement gridArea={"price"} bold>
        {formatAmount(price)}
      </CardElement>
      <CardElement gridArea={"service"}>
        {service > 1 ? `${service} services` : `${service} service`}
      </CardElement>
      <CardElement gridArea={"date"}>
        {`${new Date(startDate).toLocaleDateString()}
           -  
          ${new Date(endDate).toLocaleDateString()}`}
      </CardElement>
    </Container>
  );
};

const Container = styled.div<{ bgUrl: string }>`
  display: grid;
  grid-template-rows: 1fr 3fr 0.5fr 0.5fr 0.5fr;
  grid-template-areas:
    "city status"
    ". ."
    "price ."
    "service ."
    "date date";
  gap: 5px;
  border-radius: 10px;
  padding: 15px;
  /* TODO change colors for grey  */
  background-image: ${({ bgUrl }) =>
    `url("${bgUrl}"), linear-gradient( 180deg,
      rgb(0, 0, 0) 0%,
    transparent 30%,
    rgb(0, 0, 0) 75%
  );`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-blend-mode: overlay;
  /* TODO change colors for persistent white  */
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.layout.dark};
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.layout.lighter};
  }
  box-sizing: border-box;
`;

const CardElement = styled.p<{
  gridArea: string;
  bold?: boolean;
  justify?: string;
}>`
  grid-area: ${({ gridArea }) => gridArea};
  font-weight: ${({ bold, theme }) => {
    if (bold) return theme.weight.bold;
    else return theme.weight.semiBold;
  }};
  justify-self: ${({ justify }) => {
    if (justify) return justify;
  }};
`;

const CardElementStatuses = styled.div<{
  gridArea: string;
  justify?: string;
}>`
  grid-area: ${({ gridArea }) => gridArea};
  justify-self: ${({ justify }) => {
    if (justify) return justify;
  }};
`;

export default CardTrip;
