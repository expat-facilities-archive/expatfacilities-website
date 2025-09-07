import Button from "@components/Layout/Button";
import Icon from "@components/Layout/Icon";
import { authStep } from "@screens/Auth";
import { UserInput } from "@typeDefs/auth";
import React from "react";
import styled from "styled-components";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<authStep>>;
  user: UserInput;
}

const EmailButton: React.FC<Props> = ({ setStep, user: { email } }: Props) => {
  const handleEmailButton = () => {
    setStep(authStep.EMAIL);
  };
  return (
    <Container
      mode={"darker"}
      onClick={handleEmailButton}
      type={"button"}
      suffix={<Icon name={"arrow-down-s"} />}
    >
      {email}
    </Container>
  );
};

const Container = styled(Button)`
  font-weight: ${({ theme }) => theme.weight.regular};
  align-self: center;
`;

export default EmailButton;
