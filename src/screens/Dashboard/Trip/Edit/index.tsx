import React from "react";

import { NextPage } from "next";

import { getAuthApolloClient } from "@services/apollo/client";
import { GET_TRIP, STATE_TRANSITION_SEND_TRIP } from "@queries/trips";

import ROUTES from "@constants/routes";

import DashboardProvider from "@components/Dashboard/Provider";
import {
  DashboardButton,
  DashboardSectionTitle,
} from "@components/Layout/Dashboard";

import { Trip, TripState } from "@typeDefs/destinations";
import router from "next/router";
import styled from "styled-components";
import { DashboardPage } from "@typeDefs/auth";
import useTranslation from "@hooks/useTranslation";
import { Service } from "@typeDefs/services";
import { GET_SERVICES } from "@queries/services";
import Gallery from "@components/Dashboard/Gallery";
import TableList, { Column } from "@components/Dashboard/TableList";
import Icon from "@components/Layout/Icon";
import useBreakpoint from "@hooks/useBreakpoint";
import TripServicesList from "@components/Dashboard/Trip/ServicesList";
import DashboardTripTip from "@components/Dashboard/Trip/Tip";
import DashboardTripDetailsCard from "@components/Dashboard/Trip/DetailsCard";
import { useStaticMutation } from "@hooks/useStaticQuery";
import useModal from "@hooks/useModal";
import Modal from "@components/Layout/Modal";
import TripStateProgression from "@components/Dashboard/Trip/StateProgression";

interface Props extends DashboardPage {
  trip: Trip;
  services: Service[];
}

const TripEdit: NextPage<Props> = ({ currentUser, trip }: Props) => {
  const { t } = useTranslation("dashboard/trip");
  const { t: tCountry } = useTranslation("data/countries", false);
  const { t: tCommon } = useTranslation("dashboard/common");
  const { t: tTrip } = useTranslation("dashboard/trip");

  const breakPoint = useBreakpoint();

  const [cancelTripModalActive, cancelTripModalOpen, cancelTripModalClose] =
    useModal();

  // const tripDrafting: boolean = (
  //   [ServiceState.DRAFTED, ServiceState.COMPLETED] as string[]
  // ).includes(trip.state);

  // const [errors, setErrors] = React.useState({
  //   startDate: "",
  //   endDate: "",
  // });

  // const updateTripCallback = () => {
  //   handleUpdateTrip();
  // };

  // const { values, onChange, onSubmit } = useForm(updateTripCallback, {
  //   city: trip.city.id,
  //   startDate: format(new Date(trip.date.start), "yyyy-MM-dd"),
  //   endDate: format(new Date(trip.date.end), "yyyy-MM-dd"),
  //   services: [],
  // });

  const [cancelTripMutation] = useStaticMutation(STATE_TRANSITION_SEND_TRIP);

  const handleCancelTrip = async () => {
    await cancelTripMutation({
      variables: {
        tripId: trip.id,
        transition: "cancel",
      },
    });
    router.push(`${ROUTES.DASHBOARD_TRIPS}/${trip.id}`);
  };

  // const [handleUpdateTrip] = useStaticMutation(UPDATE_TRIP, {
  //   variables: { ...values, tripId: trip.id },
  //   update() {
  //     router.push(`${ROUTES.DASHBOARD_TRIPS}/${trip.id}`);
  //   },
  //   onError(err) {
  //     setErrors(err.graphQLErrors[0].extensions?.exception.errors);
  //   },
  // });

  // const [handleDeleteTrip] = useStaticMutation(DELETE_TRIP, {
  //   variables: { tripId: trip.id },
  //   update() {
  //     router.push(ROUTES.DASHBOARD_TRIPS);
  //   },
  // });

  // const handleFormChange = useCallback(
  //   (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //     onChange(event);
  //   },
  //   [onChange]
  // );

  // if (!trip) {
  //   router.push(ROUTES.DASHBOARD_TRIPS);
  //   return null;
  // }

  // TODO limits at 3 the number of articles
  const articles = [
    {
      id: "1",
      title: "assurance",
      thumbnailUrl: "https://picsum.photos/200/300",
    },
    {
      id: "2",
      title: "payer",
      thumbnailUrl: "https://picsum.photos/200/300",
    },
    {
      id: "3",
      title: "voyager",
      thumbnailUrl: "https://picsum.photos/200/300",
    },
  ];

  const article: Column[] = [
    {
      key: 1,
      title: "",
      format: ({ thumbnailUrl }) => {
        return <CountryPicture imageUrl={thumbnailUrl} />;
      },
      width: 0.4,
    },
    {
      key: 2,
      title: "",
      format: ({ title }) => title,
      width: 1,
      isBold: true,
    },
    {
      key: 3,
      title: "",
      format: ({ id }) => (
        <DashboardButton
          onClick={() => console.info("See article nbº " + id)}
          mode={"red"}
          prefix={<Icon name={"eye"} fill />}
          responsive={breakPoint.isTablet}
        >
          {!breakPoint.isTablet && tCommon("readarticle")}
        </DashboardButton>
      ),
      width: 1,
    },
  ];

  return (
    <DashboardProvider
      currentUser={currentUser}
      title={`${tCommon("trip")} > ${tCountry(trip.city.name)}`}
      buttons={
        <>
          <DashboardButton
            onClick={() => {
              router.push(ROUTES.DASHBOARD_TRIPS);
            }}
            mode={"darker"}
            prefix={<Icon name={"arrow-drop-left"} />}
            responsive={breakPoint.isTablet}
          >
            {!breakPoint.isTablet && tCommon("buttons.back")}
          </DashboardButton>
          <DashboardButton
            onClick={cancelTripModalOpen}
            mode={"red"}
            prefix={<Icon name={"close"} fill />}
            responsive={breakPoint.isTablet}
          >
            {breakPoint.isTablet
              ? !breakPoint.isMobile && tCommon("buttons.delete")
              : tCommon("buttons.deletel")}
          </DashboardButton>
        </>
      }
    >
      <DisplayMain column={4}>
        <GridItem gridArea={"textp"} displayFlex direction={"column"} gap={5}>
          <TextTop>{tTrip("list.preparemytrip")}</TextTop>
          <TitleCity>{trip.city.name}</TitleCity>
          <Text>{trip.city.country.description}</Text>
        </GridItem>

        <GridItem gridArea={"recap"} border>
          <DashboardTripDetailsCard trip={trip} />
        </GridItem>

        <GridItem gridArea={"progress"} padding={20} bgColor border>
          <TripStateProgression tripState={trip.state} />
        </GridItem>

        <GridItem gridArea={"hint"} gap={10} displayFlex direction={"column"}>
          <DashboardTripTip tripId={trip.id} state={trip.state} />
        </GridItem>

        <GridItem gridArea={"tableT"} gap={10} displayFlex direction={"column"}>
          <DashboardSectionTitle>{t("list.services")}</DashboardSectionTitle>
          <TripServicesList trip={trip} />
        </GridItem>

        <GridItem
          gridArea={"article"}
          gap={10}
          displayFlex
          direction={"column"}
        >
          <DashboardSectionTitle>
            {tTrip("list.discoverourguide")}
          </DashboardSectionTitle>
          <TableList columns={article} data={articles} tableGap={5} />
        </GridItem>

        <GridItem
          gridArea={"gallery"}
          gap={10}
          displayFlex
          direction={"column"}
        >
          <TitleBox>
            {tTrip("list.smoverview")} {trip.city.name}
          </TitleBox>
          <Gallery
            list={[
              {
                id: "1",
                thumbnail: "https://picsum.photos/200/300",
              },
              {
                id: "2",
                thumbnail: "https://picsum.photos/200/300",
              },
              {
                id: "3",
                thumbnail: "https://picsum.photos/200/300",
              },
              {
                id: "4",
                thumbnail: "https://picsum.photos/200/300",
              },
              {
                id: "5",
                thumbnail: "https://picsum.photos/200/300",
              },
              {
                id: "6",
                thumbnail: "https://picsum.photos/200/300",
              },
            ]}
          ></Gallery>
        </GridItem>
      </DisplayMain>

      <Modal.Modal
        active={cancelTripModalActive}
        onClickOutside={cancelTripModalClose}
        onEnterKeyPress={handleCancelTrip}
      >
        <Modal.Body>
          <Modal.Header>
            <Modal.Title>{tTrip("canceltrip.title")}</Modal.Title>
          </Modal.Header>

          <Text>{tTrip("canceltrip.text")}</Text>
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action onClick={cancelTripModalClose}>
            {tTrip("canceltrip.actions.cancel")}
          </Modal.Action>

          <Modal.Action onClick={handleCancelTrip}>
            {tTrip("canceltrip.actions.handle")}
          </Modal.Action>
        </Modal.Actions>
      </Modal.Modal>
    </DashboardProvider>
  );
};

const Display = styled.div<{
  column?: number;
  gridArea?: string;
}>`
  display: grid;
  grid-template-columns: repeat(${({ column }) => column}, 1fr);
  grid-template-rows: auto;
  gap: 20px;
  grid-area: ${({ gridArea }) => gridArea};
`;

const DisplayMain = styled(Display)`
  padding: 15px;
  grid-template-areas:
    "textp textp recap recap"
    "progress progress progress progress"
    "hint hint hint hint"
    "tableT tableT tableT tableT"
    "tableS tableS tableS tableS"
    "article article gallery gallery";
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-areas:
      "textp textp textp textp"
      "recap recap recap recap"
      "progress progress progress progress"
      "hint hint hint hint"
      "tableT tableT tableT tableT"
      "tableS tableS tableS tableS"
      "gallery gallery gallery gallery"
      "article article article article";
  }
`;

const GridItem = styled.div<{
  gridArea?: string;
  padding?: number;
  bgColor?: boolean;
  border?: boolean;
  displayFlex?: boolean;
  gap?: number;
  direction?: "row" | "column";
}>`
  display: ${({ displayFlex }) => {
    if (displayFlex) return "flex";
  }};
  flex-direction: ${({ direction = "row" }) => direction};
  flex-wrap: nowrap;
  gap: ${({ gap }) => `${gap}px`};
  grid-area: ${({ gridArea }) => gridArea};
  padding: ${({ padding }) => `${padding}px`};
  background-color: ${({ bgColor, theme }) => {
    if (bgColor) return theme.colors.layout.darker;
    else return "";
  }};
  border: ${({ border, theme }) => {
    if (border) return `1px solid ${theme.colors.text.darker}`;
    else return "";
  }};
  border-radius: 5px;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.regular};
`;

const TextTop = styled.p`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    font-size: ${({ theme }) => theme.size.large};
  }
`;

const TitleCity = styled.p`
  font-size: ${({ theme }) => theme.size.extraTitle};
  font-weight: ${({ theme }) => theme.weight.bold};
  line-height: 90px;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    font-size: ${({ theme }) => theme.size.title};
    line-height: 60px;
  }
`;

const TitleBox = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const CountryPicture = styled.div<{ imageUrl: string }>`
  height: 60px;
  width: 60px;
  border-radius: 10px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    height: 40px;
    width: 40px;
  }
`;

TripEdit.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { tripId } = query;
  const { query: apolloQuery } = await getAuthApolloClient(ctx);
  const {
    data: { getTrip: trip },
  }: { data: { getTrip: Trip } } = await apolloQuery({
    query: GET_TRIP,
    variables: {
      tripId,
    },
  });

  const {
    data: { getServices: services },
  }: { data: { getServices: Service[] } } =
    trip.state === TripState.ARCHIVED
      ? { data: { getServices: [] } }
      : await apolloQuery({
          query: GET_SERVICES,
          variables: {
            countryIso2: trip.city.country.iso2,
            checkInDate: trip.date.start,
            checkOutDate: trip.date.end,
          },
        });

  return { trip, services };
};

export default TripEdit;
