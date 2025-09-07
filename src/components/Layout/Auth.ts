import Image from "@components/Image";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import styled from "styled-components";
import Link from "./Link";
import Button from "./Button";

export const AuthContainer = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  padding: 0 15px;
  width: calc(100% - 15px * 2);
  background-color: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.layout.darkest, 0.8)};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    justify-content: flex-start;
    background-color: transparent;
    flex: none;
  }
`;

export const AuthHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: calc(500px - 60px * 2);
  padding: 60px;
  height: calc(100% - 60px * 2);

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    max-width: 100%;
    height: auto;
    padding: 0;
    align-items: center;
  }
`;

export const AuthBrandImage = styled(Image)`
  height: 50px;
  width: auto;
  object-fit: contain;
`;

export const AuthTitle = styled.h1`
  margin-top: 15px;
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

export const AuthStepHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  align-items: center;
`;

export const AuthStepTitle = styled.h2`
  font-weight: ${({ theme }) => theme.weight.medium};
`;

export const AuthSeparator = styled.div`
  margin-top: 15px;
  padding: 0;
  color: ${({ theme }) => theme.colors.layout.light};
  text-align: center;
  background: ${({ theme }) => theme.colors.layout.light};
  width: 100%;
  height: 1px;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  width: 100%;
  max-width: calc(320px - 15px * 2);

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding-top: 15px;
  }
`;

export const FieldGroup = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-top: 0;
  }
`;

export const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.bold};
  user-select: none;
  pointer-events: none;
`;

export const FieldContainer = styled.div`
  margin-top: 2px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const AuthLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.size.small};
  margin-top: 10px;
`;

export const AuthButton = styled(Button)`
  margin-top: 10px;
`;
