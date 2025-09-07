import DashboardSelect, {
  ActionType,
  SelectOption,
} from "@components/Dashboard/Select";
import {
  DashboardButton,
  FormFieldGroup,
  FormFieldLabel,
  FormService,
} from "@components/Layout/Dashboard";
import Icon from "@components/Layout/Icon";
import Loading from "@components/Layout/Loading";
import { useForm } from "@hooks/useForm";
import useTranslation from "@hooks/useTranslation";
import { formatAmount } from "@utils/formatAmount";
import React from "react";
import styled from "styled-components";
import { ServiceFormProps } from "..";

const domicileCountries = [
  {
    name: "FR",
    label: "France métropolitaine",
  },
  {
    name: "GP",
    label: "Guadeloupe",
  },
  {
    name: "GF",
    label: "Guyane Française",
  },
  {
    name: "MQ",
    label: "Martinique",
  },
  {
    name: "YT",
    label: "Mayotte",
  },
  {
    name: "RE",
    label: "Reunion",
  },
  {
    name: "XB",
    label: "Saint Barthélemy",
  },
];

const InsuranceServiceForm: React.FC<ServiceFormProps> = ({
  handleSubmit,
  service,
  tripService,
  setTotalAmount,
  mode,
}: ServiceFormProps) => {
  const editMode: boolean = mode === "complete";
  editMode;
  tripService;

  const { t: tCommon } = useTranslation("dashboard/common");

  const { values, setValues, onSubmit } = useForm(() => handleSubmit(values));

  const handleOfferChange = (
    name: string,
    value: SelectOption | undefined,
    action: ActionType
  ) => {
    if (action === "select" && value) {
      if (name === "selectedOffer") {
        const offer = service.offers?.find(
          (o) => o.id.toString() === value.value
        );

        if (offer) {
          setTotalAmount(offer.price);

          setValues({
            ...values,
            selectedOffer: offer.id.toString(),
          });
          return;
        }
      }

      setValues({
        ...values,
        [name]: value.value,
      });
    }
  };

  if (!service || !service.offers) {
    return <Loading />;
  }

  return (
    <>
      <FormService onSubmit={onSubmit}>
        <FormFieldGroup>
          <FormFieldLabel htmlFor={"domicileCountry"}>
            {"Lieu de domiciliation"}
          </FormFieldLabel>

          <DashboardSelect
            removeFromMenuOnSelect={false}
            placeHolder={"Indiquez votre lieu de domiciliation (FR)"}
            onChange={(value, action) =>
              handleOfferChange("domicileCountry", value, action)
            }
            clearable={false}
            options={domicileCountries.map((country) => ({
              value: country.name,
              label: country.label,
            }))}
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"selectedOffer"}>
            {"Formule d'assurance"}
          </FormFieldLabel>

          <DashboardSelect
            removeFromMenuOnSelect={false}
            placeHolder={"Choisissez une formule d'assurance"}
            onChange={(value, action) =>
              handleOfferChange("selectedOffer", value, action)
            }
            clearable={false}
            options={service.offers?.map((offer) => ({
              value: offer.id.toString(),
              label: `${offer.name} - ${formatAmount(offer.price)}`,
            }))}
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

export default InsuranceServiceForm;
