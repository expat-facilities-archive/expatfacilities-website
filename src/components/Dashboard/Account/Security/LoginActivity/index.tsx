import {
  DashboardSection,
  DashboardSectionHeader,
  DashboardSectionTitle,
} from "@components/Layout/Dashboard";

const DashboardAccountSecurityLoginActivity: React.FC = () => {
  return (
    <DashboardSection>
      <DashboardSectionHeader>
        <DashboardSectionTitle>{"Login activity"}</DashboardSectionTitle>
      </DashboardSectionHeader>
    </DashboardSection>
  );
};

export default DashboardAccountSecurityLoginActivity;
