import Button from "@components/Layout/Button";
import Icon from "@components/Layout/Icon";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import { User } from "@typeDefs/user";
import Avvvatars from "avvvatars-react";
import router from "next/router";

import styled from "styled-components";

type Props = {
  user: User;
};

const Profile: React.FC<Props> = ({ user }: Props) => {
  const { t: tCommon } = useTranslation("dashboard/common");

  return (
    <Card>
      <Section>
        <ProfileImg bgUrl={user.imageUrl}>
          {!user.imageUrl?.length && (
            <Avvvatars
              value={(user.firstName + " " + user.lastName)
                .split(" ")
                .map((word: string) => word.charAt(0))
                .join("")}
              radius={10}
              size={121}
            />
          )}
        </ProfileImg>
      </Section>
      <Section>
        <Text semiBold>{`${user.firstName}  ${user.lastName}`}</Text>
        <Text>
          <Icon name={"ri-at-line"} />
          {user.email}
        </Text>
        <Text>
          <Icon name={"ri-phone"} fill />
          {user.phoneNumber}
        </Text>
        <ActionBtn>
          <Btn
            onClick={() => {
              router.push(`${ROUTES.DASHBOARD_ADMIN_USERS}/${user.id}/edit`);
            }}
          >
            <Icon name={"ri-add"} fill />
            {tCommon("buttons.edit")}
          </Btn>
          <Btn
            onClick={() => {
              console.warn(
                `Try to delete ${user.id} : ${user.firstName} ${user.lastName}`
              );
            }}
          >
            <Icon name={"ri-close"} fill />
            {tCommon("buttons.delete")}
          </Btn>
        </ActionBtn>
      </Section>
    </Card>
  );
};

const Card = styled.div`
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  color: ${({ theme }) => theme.colors.text.light};
  display: flex;
  flex-flow: row nowrap;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-flow: column nowrap;
  }
`;

const Section = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-self: center;
  &:nth-child(1) {
    margin-right: 10px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    &:nth-child(1) {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`;

const ProfileImg = styled.div<{ bgUrl?: string }>`
  width: 121px;
  height: 121px;
  border-radius: 10px;
  background: ${({ bgUrl }) => {
    if (bgUrl) return ({ bgUrl }) => `url("${bgUrl}"), no-repeat center/ cover`;
  }};
`;

const Text = styled.p<{ semiBold?: boolean }>`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ semiBold }) => {
    if (semiBold) return ({ theme }) => theme.weight.semiBold;
    else return ({ theme }) => theme.weight.regular;
  }};
`;

const ActionBtn = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  margin-top: 1rem;
`;

const Btn = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  :last-child {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.accent.light};
    border: 1px solid ${({ theme }) => theme.colors.accent.light};
  }
`;

export default Profile;
