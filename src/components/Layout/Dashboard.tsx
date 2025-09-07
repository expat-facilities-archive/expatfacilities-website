import styled from "styled-components";
import Button from "@components/Layout/Button";
import Field, { Error } from "@components/Auth/Form/Field";

export const DashboardButtonContainer = styled.div`
  display: flex;
  ${Button} {
    margin: 0 5px;
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
`;

export const DashboardSubTitle = styled.h2`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

export const DashboardButton = styled(({ ...props }) => {
  return <Button shape={"square"} {...props} />;
})``;

export const DashboardSection = styled.section`
  margin-top: 15px;
  padding: 0 15px;
  width: calc(100% - 15px * 2);

  :first-child {
    margin-top: 0;
  }
`;

export const DashboardSectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DashboardSectionTitle = styled.h1`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.semiBold};
`;

export const DashboardSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const DashboardForm = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DashboardFieldRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const DashboardFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    padding: 0;
  }
`;

export const DashboardFieldLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  pointer-events: none;
  margin-bottom: 4px;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 40%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

export const DashboardFieldContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${Error} {
    margin-left: 10px;
  }
`;

export const DashboardField = styled(Field)`
  width: calc(350px - 14px * 2 - 1px * 2);
  text-align: left;
  font-size: ${({ theme }) => theme.size.normal};
  border-radius: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
  }
`;

export const DashboardSelect = styled.select`
  color: ${({ theme }) => theme.colors.text.lightest};
  transition: all 0.2s;
  border: 1px solid ${({ theme }) => theme.colors.layout.dark};
  outline: none;
  border-radius: 4px;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.layout.darker} !important;
  font-size: ${({ theme }) => theme.size.normal};
  padding: 10px 14px;
  width: 100%;
  max-width: calc(350px - 14px * 2 - 1px * 2);

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.accent.light};
    color: ${({ theme }) => theme.colors.text.lightest};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
  }
`;

export const DashboardFormThumbnailImage = styled.img`
  margin-top: 10px;
  height: 300px;
  max-width: 500px;
  width: 100%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.layout.darker};
  border-radius: 10px;
`;

export const DashboardFormSubmitButton = styled(DashboardButton)`
  margin-top: 10px;
`;

export const DashboardList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  gap: 0.5rem;
`;

export const DashboardListCard = styled.li`
  display: flex;
  padding: 16px 32px;
  border: 1px solid ${({ theme }) => theme.colors.layout.light};
  transition: all 0.2s;
  border-radius: 5px;

  :hover {
    padding: 16px 48px;
  }
`;

export const DashboardListCol = styled.div<{
  autoSize?: boolean;
  width?: string;
  tabletHidden?: boolean;
  mobileHidden?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
  wordBreak?: boolean;
}>`
  flex: ${({ autoSize }) => (autoSize ? 0 : 1)};
  display: flex;
  flex-direction: column;
  align-items: ${({ alignCenter }) => {
    if (alignCenter) return "center";
    if (alignCenter) return "flex-end";
    return "flex-start";
  }};
  justify-content: center;
  text-align: center;
  line-height: 1.2;
  padding: 0 10px;
  word-break: ${({ wordBreak }) => {
    if (wordBreak) return "break-word";
    return "none";
  }};

  :first-child {
    padding-left: 0;
  }

  :last-child {
    padding-right: 0;
  }

  ${({ tabletHidden }) =>
    tabletHidden && "@media (max-width: 1224px) {display: none;}"}
  ${({ mobileHidden }) =>
    mobileHidden && "@media (max-width: 768px) {display: none;}"}
    @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: 0 5px;
  }
`;

export const DashboardListColTitle = styled.h1<{ bold?: boolean }>`
  ${({ bold, theme }) => bold && `font-weight: ${theme.weight.bold}`};
`;

export const Icon = styled.i<{ isTablet?: boolean; isMobile?: boolean }>`
  font-size: ${({ theme }) => theme.size.normal};
  margin-right: 10px;
  ${({ isTablet, theme }) =>
    isTablet &&
    `@media (max-width: ${theme.breakpoint.tablet}) {
        margin-right: 0;
      }`}
  ${({ isMobile, theme }) =>
    isMobile &&
    `@media (max-width: ${theme.breakpoint.mobile}) {
        margin-right: 0;
      }`}
`;

// Form Service;

export const FormService = styled.form`
  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    grid-template-columns: 1fr;
  } */
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
  & > * {
    width: calc(100% / 2 - 10px);
  }
  & > *:nth-child(odd) {
    margin-right: 20px;
  }
  & > *:nth-child(n + 3) {
    margin-top: 20px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    & > * {
      width: 100%;
    }
    & > *:nth-child(odd) {
      margin-right: 0;
    }
    & > *:nth-child(n + 2) {
      margin-top: 20px;
    }
  }
`;

export const FormFieldGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const FormFieldLabel = styled.label`
  user-select: none;
  pointer-events: none;
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

export const FormFieldInput = styled(Field)`
  margin-top: 5px;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  font-size: ${({ theme }) => theme.size.normal};
  border-radius: 5px;
  /* TODO change with theme update */
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
`;

export const FormSelect = styled.select`
  color: ${({ theme }) => theme.colors.text.lightest};
  transition: all 0.2s;
  /* TODO change with theme update */
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  outline: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  font-size: ${({ theme }) => theme.size.normal};
  padding: 10px 14px;
  width: 100%;

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.accent.light};
    color: ${({ theme }) => theme.colors.text.lightest};
  }
`;
