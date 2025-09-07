import ROUTES from "@constants/routes";
import router from "next/router";
import React from "react";
import styled from "styled-components";

interface Props {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubMenu: React.FC<Props> = ({ isActive, setIsActive }: Props) => {
  const elRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (link: string) => {
    const internal = /^\/(?!\/)/.test(link);

    if (internal) router.push(link);
    else window.open(link, "_blank");
    setIsActive(false);
  };

  React.useEffect(() => {
    const onClick = (e: any) => {
      // If the active element exists and is clicked outside of
      if (elRef.current !== null && !elRef.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [setIsActive, isActive, elRef]);

  if (isActive)
    return (
      <Wrapper ref={elRef}>
        <Container>
          <NavItem
            onClick={() => handleClick("https://facebook.com/expatfacilities")}
          >
            Facebook
          </NavItem>
          <NavItem
            onClick={() =>
              handleClick("https://instagram.com/expatfacilities/")
            }
          >
            Instagram
          </NavItem>
          <NavItem
            onClick={() =>
              handleClick("https://linkedin.com/company/expatfacilities")
            }
          >
            LinkedIn
          </NavItem>
          <NavItem
            onClick={() => handleClick("https://twitter.com/expatfacilities")}
          >
            Twitter
          </NavItem>
          <NavItem
            onClick={() => handleClick("https://tiktok.com/@expatfacilities")}
          >
            TikTok
          </NavItem>
          <Separator />
          <NavItem onClick={() => handleClick(ROUTES.SUPPORT)}>Help</NavItem>
        </Container>
      </Wrapper>
    );

  return <></>;
};

const Wrapper = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.layout.lighter};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 4px;
  padding: 8px 0;
`;

const NavItem = styled.button`
  outline: none;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px 16px;

  :hover {
    background-color: ${({ theme }) => theme.colors.accent.light};
  }
`;

const Separator = styled.hr`
  display: block;
  margin: 8px 0;
  height: 1px;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.layout.lighter};
`;

export default SubMenu;
