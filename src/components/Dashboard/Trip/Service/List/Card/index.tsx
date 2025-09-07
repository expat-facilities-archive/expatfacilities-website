import React from "react";

import styled from "styled-components";

import { formatAmount } from "@utils/formatAmount";

import type { TripService } from "@typeDefs/destinations";
import type { Service } from "@typeDefs/services";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import Icon from "@components/Layout/Icon";
import DashboardTripServiceState from "../../Label";
import { DashboardButton } from "@components/Layout/Dashboard";
import useBreakpoint from "@hooks/useBreakpoint";
import { useRouter } from "next/router";

type Props = {
  tripId: string;
  tripService: TripService;
  service: Service;
};

const TripServiceCard: React.FC<Props> = ({
  tripId,
  tripService,
  service,
}: Props) => {
  const router = useRouter();

  const { t: tData } = useTranslation("data/services");
  const { t: tDetail } = useTranslation("expatriation/country");
  const { t: tTrip } = useTranslation("dashboard/trip");

  const breakpoint = useBreakpoint();

  return (
    <Container>
      <Content>
        <Col autoSize>
          <ThumbnailContainer>
            <Thumbnail src={service.thumbnailUrl} draggable={false} />
          </ThumbnailContainer>
        </Col>

        <Col alignStart>
          <ColDescription>{tData(service.name)}</ColDescription>
          <ColSubtitle>
            <DashboardTripServiceState state={tripService.state} />
          </ColSubtitle>
        </Col>

        {breakpoint.isMobile ? null : (
          <Col>
            <ColTitle>{tDetail("details.description")}</ColTitle>
            <ColContent>{tData(service.description)}</ColContent>
          </Col>
        )}

        <Col>
          {tripService.totalPrice ? (
            <>
              <ColTitle>{tDetail("details.price")}</ColTitle>
              <ColContent>{formatAmount(tripService.totalPrice)}</ColContent>
            </>
          ) : (
            <>
              <ColTitle>{tDetail("details.startingat")}</ColTitle>
              <ColContent>
                {formatAmount(service.startingPrice || 0)}
              </ColContent>
            </>
          )}
        </Col>

        <Col autoSize>
          {
            {
              completed: (
                <FlexContainer>
                  <ColButton
                    mode={"darker"}
                    prefix={<Icon name={"information"} />}
                    responsive={breakpoint.isTablet}
                    onClick={() => {
                      router.push(
                        `${ROUTES.DASHBOARD_TRIPS}/${tripId}/service/${service.type}`
                      );
                    }}
                  >
                    {tTrip("overview.services.buttons.edit")}
                  </ColButton>
                  <ColButton
                    mode={"red"}
                    prefix={<Icon name={"delete-bin-2"} fill />}
                    responsive={breakpoint.isTablet}
                  />
                </FlexContainer>
              ),
              drafted: (
                <ColButton
                  red
                  prefix={<Icon name={"pencil"} fill />}
                  responsive={breakpoint.isTablet}
                  onClick={() => {
                    router.push(
                      `${ROUTES.DASHBOARD_TRIPS}/${tripId}/service/${service.type}`
                    );
                  }}
                >
                  {tTrip("overview.services.buttons.complete")}
                </ColButton>
              ),
              cancelled: null,
              archived: null,
            }[tripService.state]
          }
        </Col>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  margin-top: 5px;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  border-radius: 5px;
  cursor: default;
`;

const FlexContainer = styled.div`
  display: flex;
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

const ColSubtitle = styled.p`
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.regular};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.tiny};
    font-weight: ${({ theme }) => theme.weight.light};
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

export default TripServiceCard;
