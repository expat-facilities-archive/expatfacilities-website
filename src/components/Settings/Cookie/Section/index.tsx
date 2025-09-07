import React from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import Toggle from "@components/Layout/Toggle";

interface Props {
  title: string;
  name: string;
  description: string;
}

const CookieSection: React.FC<Props> = ({
  title,
  name,
  description,
}: Props) => {
  const [state, setState] = React.useState(false);

  React.useEffect(() => {
    const cookieParams: any = JSON.parse(Cookies.get("cookie_params") || "{}");
    setState(cookieParams[name] || false);
  }, [name]);

  const handleClick = () => {
    const cookieParams: any = JSON.parse(Cookies.get("cookie_params") || "{}");
    cookieParams[name] = !state;
    Cookies.set("cookie_params", JSON.stringify(cookieParams), {
      expires: 365,
    });
    setState(!state);
  };

  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
      <Selector onClick={handleClick}>
        <Label state={state}>{state ? "Enable" : "Disable"}</Label>
        <Toggle checked={state} large />
      </Selector>
    </Container>
  );
};

const Container = styled.section`
  padding: 60px 0;
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.semiBold};
`;

const Description = styled.p`
  margin-top: 10px;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
`;

const Selector = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 10px;
    width: 100%;
  }
`;

const Label = styled.label<{ state: boolean }>`
  color: ${({ state, theme }) =>
    state ? theme.colors.accent.light : theme.colors.text.lightest};
  margin-right: 10px;
`;

export default CookieSection;
