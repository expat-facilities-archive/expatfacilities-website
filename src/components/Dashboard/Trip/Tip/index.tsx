import SuccessBox from "@components/Dashboard/SuccessBox";
import { DashboardButton } from "@components/Layout/Dashboard";
import Icon from "@components/Layout/Icon";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import { TripState } from "@typeDefs/destinations";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface Props {
  tripId: string;
  state: string;
}

const DashboardTripTip: React.FC<Props> = ({ tripId, state }: Props) => {
  const router = useRouter();

  const { t: tTrip } = useTranslation("dashboard/trip");
  const { t: tCommon } = useTranslation("dashboard/common");

  switch (state) {
    case TripState.DRAFTED:
      return (
        <>
          <Title>{tTrip("list.tripnotfilled")}</Title>
          <Content>
            <Icon name={"lightbulb"} />
            <Text>
              {/* TODO reviews this text and do the translate */}
              Lorsque tu sélectionnes ton voyage, tu dois remplir des services
              et certains contiennent des missions. Tu peux gérer en quelques
              clics ces services et nous indiquons leur avancée en fonction de
              deux statuts : Incomplet (il manque des informations nécessaires à
              la validation) et Complété (de ton côté tout est bon, tu peux
              procéder au paiement). Alors, à toi de jouer pour finir ça le plus
              vite !
            </Text>
          </Content>
        </>
      );
    case TripState.COMPLETED:
      return (
        <SuccessBox
          title={
            "Tu as fournis la totalité des informations qu’il nous fallait."
          }
          text={
            "Tu peux désormais procéder au paiement pour continuer les démarches et partir profiter de ton expatriation ! "
          }
          btn={
            <DashboardButton
              onClick={() =>
                router.push(`${ROUTES.DASHBOARD_TRIPS}/${tripId}/checkout`)
              }
              prefix={<Icon name={"check-double"} fill />}
            >
              {tCommon("buttons.gotopayment")}
            </DashboardButton>
          }
        />
      );
    default:
      return null;
  }
};

const Title = styled.h3`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  margin-left: 10px;
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.regular};
  color: ${({ theme }) => theme.colors.text.light};
`;

export default DashboardTripTip;
