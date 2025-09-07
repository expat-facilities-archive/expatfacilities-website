import {
  DashboardSection,
  DashboardSectionHeader,
  DashboardSectionTitle,
} from "@components/Layout/Dashboard";
import themes from "@services/themes";
import styled from "styled-components";
import Box from "./Box";

const DashboardAccountDisplayTheme: React.FC = () => {
  return (
    <DashboardSection>
      <DashboardSectionHeader>
        <DashboardSectionTitle>{"Theme colors"}</DashboardSectionTitle>
      </DashboardSectionHeader>
      <Row>
        <Box theme={themes.light} />
        <Box theme={themes.dark} />
      </Row>
    </DashboardSection>
  );
};

const Row = styled.div`
  margin-top: 15px;
  display: flex;
`;

export default DashboardAccountDisplayTheme;
