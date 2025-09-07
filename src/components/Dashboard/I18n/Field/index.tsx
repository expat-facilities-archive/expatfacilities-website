import { DashboardField } from "@components/Layout/Dashboard";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

interface Props {
  rest?: any;
  onChange: (value: { [key: string]: string }) => void;
  value: { [key: string]: any };
}

const DashboardI18nField: React.FC<Props> = ({
  rest,
  onChange,
  value,
}: Props) => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string>("en");
  const [values, setValues] = useState<{ [key: string]: string }>(value);

  const handleChangeKey = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      const key = event.currentTarget.getAttribute("data-key");

      if (key && activeKey !== key) {
        setActiveKey(key);
      }
    },
    [activeKey]
  );

  const handleChangeValue =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [key]: value }));

      onChange(values);
    };

  return (
    <div>
      <Nav>
        <NavList>
          {router.locales &&
            router.locales.map((locale, i: number) => (
              <li key={i}>
                <NavItem
                  data-key={locale}
                  onClick={handleChangeKey}
                  active={activeKey === locale}
                >
                  {locale}
                </NavItem>
              </li>
            ))}
        </NavList>
      </Nav>
      <div>
        <DashboardField
          onChange={handleChangeValue(activeKey)}
          value={values && values[activeKey] ? values[activeKey] : ""}
          {...rest}
        />
      </div>
    </div>
  );
};

const Nav = styled.nav`
  display: flex;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

const NavItem = styled.div<{ active: boolean }>`
  cursor: pointer;
  padding: 5px 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.layout.darker};

  background-color: ${({ active, theme }) =>
    active ? theme.colors.layout.darker : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.colors.text.lightest : theme.colors.text.darker};

  transition: all 0.1s;
  text-transform: uppercase;

  &:hover {
    background-color: ${({ theme }) => theme.colors.layout.darker};
    color: ${({ theme }) => theme.colors.text.lightest};
  }
`;

export default DashboardI18nField;
