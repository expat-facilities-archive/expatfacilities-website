import {
  DashboardButton,
  DashboardSection,
  DashboardSectionHeader,
  DashboardSectionTitle,
} from "@components/Layout/Dashboard";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import { User } from "@typeDefs/user";
import { useRouter } from "next/router";
import styled from "styled-components";

interface Props {
  user: User;
}

const DashboardAccountSecurityChangePassword: React.FC<Props> = ({
  user,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation("dashboard/account");

  return (
    <DashboardSection>
      <DashboardSectionHeader>
        <DashboardSectionTitle>{"Change Password"}</DashboardSectionTitle>
      </DashboardSectionHeader>
      <ChangeButton
        onClick={() => {
          router.push({
            pathname: ROUTES.RECOVERY,
            query: { email: user.email },
          });
        }}
        mode={"darker"}
      >
        {t("changepassword")}
      </ChangeButton>
    </DashboardSection>
  );
};

const ChangeButton = styled(DashboardButton)`
  margin-top: 15px;
`;

export default DashboardAccountSecurityChangePassword;
