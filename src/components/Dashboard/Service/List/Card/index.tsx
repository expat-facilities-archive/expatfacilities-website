import React from "react";

import styled from "styled-components";

import { formatAmount } from "@utils/formatAmount";

import type { Service } from "@typeDefs/services";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import Icon from "@components/Layout/Icon";
import { DashboardButton } from "@components/Layout/Dashboard";
import useBreakpoint from "@hooks/useBreakpoint";
import { useRouter } from "next/router";

type Props = {
  tripId: string;
  service: Service;
};

const ServiceListCard: React.FC<Props> = ({
  tripId,
  service: {
    type,
    name,
    thumbnailUrl,
    available,
    description,
    price,
    startingPrice,
  },
}: Props) => {
  const router = useRouter();

  const { t: tData } = useTranslation("data/services");
  const { t: tDetail } = useTranslation("expatriation/country");

  const breakpoint = useBreakpoint();

  return (
    <Container disabled={!available}>
      <Content>
        <Col autoSize>
          <ThumbnailContainer>
            <Thumbnail src={thumbnailUrl} draggable={false} />
          </ThumbnailContainer>
        </Col>

        <Col alignStart>
          <ColDescription>{tData(name)}</ColDescription>
        </Col>

        {breakpoint.isMobile ? null : (
          <Col>
            <ColTitle>{tDetail("details.description")}</ColTitle>
            <ColContent>{tData(description)}</ColContent>
          </Col>
        )}

        <Col>
          {available ? (
            price ? (
              <>
                <ColTitle>{tDetail("details.price")}</ColTitle>
                <ColContent>{formatAmount(price)}</ColContent>
              </>
            ) : (
              <>
                <ColTitle>{tDetail("details.startingat")}</ColTitle>
                <ColContent>{formatAmount(startingPrice!)}</ColContent>
              </>
            )
          ) : (
            <>
              <ColDescription>{tDetail("details.unavailable")}</ColDescription>
              <ColDescription>{tDetail("details.thiscountry")}</ColDescription>
            </>
          )}
        </Col>
        <Col autoSize>
          {available && (
            <ColButton
              prefix={<Icon name={"add"} fill />}
              responsive={breakpoint.isTablet}
              onClick={() => {
                router.push(
                  `${ROUTES.DASHBOARD_TRIPS}/${tripId}/service/${type}`
                );
              }}
            >
              {tDetail("details.addbutton")}
            </ColButton>
          )}
        </Col>
      </Content>
    </Container>
  );
};

const Container = styled.div<{ disabled?: boolean }>`
  position: relative;
  margin-top: 5px;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  border-radius: 5px;
  cursor: default;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.2s;
  height: 65px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
`;

const Col = styled.div<{
  autoSize?: boolean;
  width?: string;
  tabletHidden?: boolean;
  mobileHidden?: boolean;
  alignStart?: boolean;
}>`
  flex: ${({ autoSize }) => (autoSize ? 0 : 1)};
  display: flex;
  flex-direction: column;
  align-items: ${({ alignStart }) => (alignStart ? "flex-start" : "center")};
  justify-content: center;
  text-align: center;
  padding: 0 10px;

  :first-child {
    padding-left: 0;
  }

  :last-child {
    padding-right: 0;
  }

  ${({ tabletHidden, theme }) =>
    tabletHidden &&
    `@media (max-width: ${theme.breakpoint.tablet}) {display: none;}`}
  ${({ mobileHidden, theme }) =>
    mobileHidden &&
    `@media (max-width: ${theme.breakpoint.mobile}) {display: none;}`}
    @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: 0 5px;
  }
`;

const ColTitle = styled.p<{ uppercase?: boolean }>`
  color: ${({ theme }) => theme.colors.layout.lighter};
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.medium};
  ${({ uppercase }) => uppercase && "text-transform: uppercase"};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.small};
    font-weight: ${({ theme }) => theme.weight.semiBold};
  }
`;

const ColContent = styled.p`
  color: ${({ theme }) => theme.colors.layout.lightest};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(255, 255, 255);
`;

const ColDescription = styled.p`
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.small};
  }
`;

const ThumbnailContainer = styled.div`
  overflow: hidden;
  border-radius: 10px;
  width: 60px;
  height: 60px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 30px;
    height: 30px;
  }
`;

const Thumbnail = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
  border-radius: 10px;
`;

const ColButton = styled(DashboardButton)`
  white-space: nowrap;
`;

export default ServiceListCard;
