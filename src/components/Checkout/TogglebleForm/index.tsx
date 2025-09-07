import { DashboardButton } from "@components/Layout/Dashboard";
import Loading from "@components/Layout/Loading";
import React, { useState, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  name: string;
  defaultToggled?: boolean;
  submitButtonName: string;
  onSubmit: () => Promise<boolean>;
  loading?: boolean;
  children: (toggled: boolean) => ReactNode | ReactNode;
}

const DashboardCheckoutTogglableForm: React.FC<Props> = ({
  name,
  defaultToggled = false,
  submitButtonName = "submit",
  onSubmit,
  loading = false,
  children,
}: Props) => {
  const [toggled, setToggled] = useState<boolean>(defaultToggled);

  const handleSubmitButtonClick = () => {
    loading = true;

    onSubmit().then((ok: boolean) => {
      if (ok) {
        setToggled(false);
      }
    });
  };

  return (
    <Container>
      <Title>{name}</Title>
      {loading && (
        <FormLoading>
          <Loading />
        </FormLoading>
      )}
      {toggled ? (
        <>
          <FormContent>{children(toggled)}</FormContent>
          <ButtonsList>
            <SubmitButton onClick={handleSubmitButtonClick}>
              {submitButtonName}
            </SubmitButton>
          </ButtonsList>
        </>
      ) : (
        children(toggled)
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 25px 30px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  background-color: ${({ theme }) => theme.colors.layout.darker};
  transition: all 0.3s ease-in-out;
`;

const Title = styled.h4`
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: ${({ theme }) => theme.colors.text.lightest};
`;

const FormLoading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 1;
  border-radius: 10px;
`;

const FormContent = styled.div``;

const ButtonsList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SubmitButton = styled(DashboardButton)`
  margin-top: 20px;
`;

export default DashboardCheckoutTogglableForm;
