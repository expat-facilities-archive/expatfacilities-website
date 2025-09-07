import {
  DashboardButton,
  FormFieldGroup,
  FormService,
} from "@components/Layout/Dashboard";
import Icon from "@components/Layout/Icon";
import useTranslation from "@hooks/useTranslation";
import React from "react";
import styled from "styled-components";
import { ServiceFormProps } from "..";

const VisaServiceForm: React.FC<ServiceFormProps> = ({
  service,
  handleSubmit,
  setTotalAmount,
}: ServiceFormProps) => {
  const { t: tCommon } = useTranslation("dashboard/common");

  React.useEffect(() => {
    setTotalAmount(service.price);
  }, [setTotalAmount, service.price]);

  return (
    <FormService onSubmit={handleSubmit}>
      <FormFieldGroup>
        <Content>
          <Icon name={"lightbulb"} />
          <Text>
            {
              "Les informations personnelles concernant ce service te seront demandées plus tard lors du processus de validation du voyage."
            }
          </Text>
        </Content>
      </FormFieldGroup>

      <SubmitButton type="submit" prefix={<Icon name={"save"} fill />}>
        {tCommon("buttons.save")}
      </SubmitButton>
    </FormService>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.p`
  text-align: center;
  margin-top: 10px;
`;

const SubmitButton = styled(DashboardButton)`
  width: fit-content !important;
  height: fit-content !important;
  margin-right: 0 !important;
`;

export default VisaServiceForm;
