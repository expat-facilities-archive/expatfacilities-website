import {
  DashboardSection,
  DashboardSectionHeader,
  DashboardSectionTitle,
  DashboardSelect,
} from "@components/Layout/Dashboard";
import { useRouter } from "next/router";
import styled from "styled-components";

const DashboardAccountDisplayLanguage: React.FC = () => {
  const router = useRouter();
  const { locales, locale } = router;

  return (
    <DashboardSection>
      <DashboardSectionHeader>
        <DashboardSectionTitle>{"Display language"}</DashboardSectionTitle>
      </DashboardSectionHeader>
      <LangSelector
        value={locale}
        onChange={(event) => {
          router.push(router.asPath, router.asPath, {
            locale: event.target.value,
            shallow: true,
            scroll: false,
          });
        }}
      >
        {locales &&
          locales.map((l: string, i: number) => {
            let translation: any;
            try {
              translation = require(`../../../../../locales/${l}/common.json`);
            } catch (err) {
              console.error(
                "An error occurred while loading the translation file: common.json"
              );
            }

            return (
              <option key={i} value={l}>
                {translation.locale.name || l}
              </option>
            );
          })}
      </LangSelector>
    </DashboardSection>
  );
};

const LangSelector = styled(DashboardSelect)`
  margin-top: 15px;
`;

export default DashboardAccountDisplayLanguage;
