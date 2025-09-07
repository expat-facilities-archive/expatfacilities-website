import { TripService } from "@typeDefs/destinations";
import React from "react";
import { formatAmount } from "src/utils/formatAmount";
import styled from "styled-components";

type Props = {
  service: TripService;
};

const TripServiceListCard: React.FC<Props> = ({ service }: Props) => {
  return (
    <Container>
      <Col>
        <ColTitle>
          {service.service.name} - {formatAmount(service.service.price)}
        </ColTitle>
      </Col>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 16px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.layout.light};
`;

const Col = styled.div<{
  autoSize?: boolean;
  width?: string;
  tabletHidden?: boolean;
  mobileHidden?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
}>`
  flex: ${({ autoSize }) => (autoSize ? 0 : 1)};
  display: flex;
  flex-direction: column;
  align-items: ${({ alignCenter }) => {
    if (alignCenter) return "center";
    if (alignCenter) return "flex-end";
    return "flex-start";
  }};
  justify-content: center;
  text-align: center;
  line-height: 1.2;
  padding: 0 10px;

  :first-child {
    padding-left: 0;
  }

  :last-child {
    padding-right: 0;
  }

  ${({ tabletHidden }) =>
    tabletHidden && "@media (max-width: 1224px) {display: none;}"}
  ${({ mobileHidden }) =>
    mobileHidden && "@media (max-width: 768px) {display: none;}"}
    @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: 0 5px;
  }
`;

const ColTitle = styled.h1<{ bold?: boolean }>`
  ${({ bold, theme }) => bold && `font-weight: ${theme.weight.bold}`};
`;

export default TripServiceListCard;
