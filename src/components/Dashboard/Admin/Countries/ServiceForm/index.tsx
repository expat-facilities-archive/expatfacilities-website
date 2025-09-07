import React, { useCallback } from "react";

import type { CountryService } from "@typeDefs/destinations";
import { useForm } from "@hooks/useForm";
import { useStaticMutation } from "@hooks/useStaticQuery";
import { UPDATE_COUNTRY_SERVICES } from "@queries/countries";
import {
  DashboardField,
  DashboardFieldContainer,
  DashboardFieldGroup,
  DashboardFieldLabel,
  DashboardForm,
  DashboardFormSubmitButton,
} from "@components/Layout/Dashboard";

type Props = {
  data: CountryService[];
};

const DestinationServiceForm: React.FC<Props> = ({ data }: Props) => {
  const updateCountryServiceCallback = () => {
    updateCountryService({
      variables: { ...values }
    });
  };

  const { values, onChange, onSubmit } = useForm(
    updateCountryServiceCallback,
    data
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      // const value = e.target.value;
      // const name = e.target.name;

      onChange(e);
    },
    [onChange]
  );

  const [updateCountryService] = useStaticMutation(UPDATE_COUNTRY_SERVICES);

  return (
    <DashboardForm onSubmit={onSubmit}>
      {data &&
        data.map((service: CountryService, index: number) => (
          <DashboardFieldGroup key={index}>
            <DashboardFieldLabel htmlFor={index.toString()}>
              {service.serviceId}
            </DashboardFieldLabel>
            <DashboardFieldContainer>
              <DashboardField
                type={"text"}
                id={index.toString()}
                name={service.serviceId.toString()}
                onChange={handleChange}
                defaultValue={service.price}
              />
              <DashboardFormSubmitButton type="submit">
                Save services
              </DashboardFormSubmitButton>
            </DashboardFieldContainer>
          </DashboardFieldGroup>
        ))}
      <DashboardFormSubmitButton type="submit">
        Save services
      </DashboardFormSubmitButton>
    </DashboardForm>
  );
};

export default DestinationServiceForm;
