// import Checkbox from "@components/Layout/Checkbox";
import DashboardSelect, {
  ActionType,
  SelectOption,
} from "@components/Dashboard/Select";
import {
  FormService,
  FormFieldGroup,
  FormFieldLabel,
  DashboardField,
  DashboardButton,
} from "@components/Layout/Dashboard";
import Icon from "@components/Layout/Icon";
import Radio from "@components/Layout/Radio";
import { useForm } from "@hooks/useForm";
import useTranslation from "@hooks/useTranslation";
import React from "react";
import styled from "styled-components";
import { ServiceFormProps } from "..";

const TransportationServiceForm: React.FC<ServiceFormProps> = ({
  handleSubmit,
  service,
  setTotalAmount,
}: ServiceFormProps) => {
  const { t: tCommon } = useTranslation("dashboard/common");

  const { values, setValues, onChange, onSubmit } = useForm(() =>
    handleSubmit(values)
  );

  const handleInputChange = (
    name: string,
    value: SelectOption | undefined,
    action: ActionType
  ) => {
    if (action === "select" && value) {
      setValues({
        ...values,
        [name]: value.value,
      });
    }
  };

  React.useEffect(() => {
    setTotalAmount(service.price);
  }, [setTotalAmount, service.price]);

  return (
    <>
      <FormService onSubmit={onSubmit}>
        <FormFieldGroup>
          <FormFieldLabel htmlFor={"luggages"}>
            {"Bagages (bagage à main non compris)"}
          </FormFieldLabel>

          <DashboardSelect
            removeFromMenuOnSelect={false}
            onChange={(value, action) =>
              handleInputChange("luggages", value, action)
            }
            placeHolder={"Choisissez une option"}
            clearable={false}
            options={[
              {
                label: "Aucun bagage",
                value: "0",
              },
              {
                label: "1 bagage",
                value: "1",
              },
              {
                label: "2 bagages",
                value: "2",
              },
            ]}
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"airportToResidencePickUp"}>
            {"Prise en charge à l'aéroport jusqu'au domicile"}
          </FormFieldLabel>

          <Radio
            value={values.airportToResidencePickUp}
            setValue={(value) => {
              setValues({
                ...values,
                airportToResidencePickUp: value,
              });
            }}
            options={[
              {
                label: "Oui",
                value: "true",
              },
              {
                label: "Non",
                value: "false",
              },
            ]}
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"groundTransportationModePreference"}>
            {"Préférence de mode de transport terrestre"}
          </FormFieldLabel>

          <DashboardSelect
            multiple
            removeFromMenuOnSelect
            closeMenuOnSelect={false}
            onChange={(value, action) =>
              handleInputChange(
                "groundTransportationModePreference",
                value,
                action
              )
            }
            placeHolder={"Choisissez une option"}
            clearable={false}
            options={[
              {
                label: "Train",
                value: "train",
              },
              {
                label: "Bus",
                value: "bus",
              },
              {
                label: "Chauffeur privé",
                value: "privateDriver",
              },
            ]}
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"planeTicket"}>
            {"Billet d'avion"}
          </FormFieldLabel>

          <DashboardSelect
            multiple
            removeFromMenuOnSelect
            closeMenuOnSelect={false}
            onChange={(value, action) =>
              handleInputChange("planeTicket", value, action)
            }
            placeHolder={"Choisissez une option"}
            clearable={false}
            options={[
              {
                label: "Economique",
                value: "economy",
              },
              {
                label: "Première classe",
                value: "firstClass",
              },
              {
                label: "Business",
                value: "business",
              },
            ]}
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"departureAirportPreference"}>
            {"Préférence de l'aéroport de départ"}
          </FormFieldLabel>

          <DashboardField
            type="text"
            name="departureAirportPreference"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"stopOverPreference"}>
            {"Escales"}
          </FormFieldLabel>

          <DashboardSelect
            removeFromMenuOnSelect={false}
            onChange={(value, action) =>
              handleInputChange("stopOverPreference", value, action)
            }
            placeHolder={"Choisissez une option"}
            clearable={false}
            options={[
              {
                label: "Vol direct",
                value: "direct",
              },
              {
                label: "1 escale maximum",
                value: "1",
              },
              {
                label: "2 escales maximum",
                value: "2",
              },
            ]}
          />
        </FormFieldGroup>

        <SubmitButton type="submit" prefix={<Icon name={"save"} fill />}>
          {tCommon("buttons.save")}
        </SubmitButton>
      </FormService>
    </>
  );
};

const SubmitButton = styled(DashboardButton)`
  width: fit-content !important;
  margin-right: 0 !important;
`;

export default TransportationServiceForm;
