import DashboardSelect, {
  ActionType,
  SelectOption,
} from "@components/Dashboard/Select";
import {
  DashboardButton,
  FormFieldGroup,
  FormFieldInput,
  FormFieldLabel,
  FormService,
} from "@components/Layout/Dashboard";
import Icon from "@components/Layout/Icon";
import Radio from "@components/Layout/Radio";
import Textarea from "@components/Layout/Textarea";
import { useForm } from "@hooks/useForm";
import useTranslation from "@hooks/useTranslation";
import React from "react";
import styled, { useTheme } from "styled-components";
import { ServiceFormProps } from "..";

const HousingServiceForm: React.FC<ServiceFormProps> = ({
  handleSubmit,
  service,
  setTotalAmount,
}: ServiceFormProps) => {
  const theme = useTheme();

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
          <FormFieldLabel htmlFor={"birthDate"}>
            {"Date de naissance"}
          </FormFieldLabel>

          <FormFieldInput
            type="date"
            name="birthDate"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"university"}>
            {"Université d'accueil"}
          </FormFieldLabel>

          <FormFieldInput
            type="text"
            name="university"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"studentId"}>
            {"Student ID (Matricule indiqué sur la carte étudiant)"}
          </FormFieldLabel>

          <FormFieldInput
            type="text"
            name="studentId"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"healthSituation"}>
            {"Situation sanitaire"}
          </FormFieldLabel>

          <DashboardSelect
            removeFromMenuOnSelect={false}
            placeHolder={"Choisissez une option"}
            onChange={(value, action) =>
              handleInputChange("healthSituation", value, action)
            }
            clearable={false}
            options={[
              {
                label: "Non vacciné",
                value: "nonVaccinated",
              },
              {
                label: "Vacciné(e), une injection",
                value: "oneInjection",
              },
              {
                label: "Vacciné(e), deux injections",
                value: "twoInjections",
              },
              {
                label: "Vacciné(e), trois ou plus injections",
                value: "threeInjections",
              },
            ]}
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"semesterNumber"}>
            {"Nombre de semestres (1, 2, autre...)"}
          </FormFieldLabel>

          <FormFieldInput
            type="text"
            name="semesterNumber"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"firstDaySchool"}>
            {"Date de début des cours"}
          </FormFieldLabel>

          <FormFieldInput
            type="text"
            name="firstDaySchool"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"typeOfHousing"}>
            {"Type de logement souhaité"}
          </FormFieldLabel>

          <DashboardSelect
            multiple
            closeMenuOnSelect={false}
            removeFromMenuOnSelect
            placeHolder={"Choisissez une option"}
            onChange={(value, action) =>
              handleInputChange("typeOfHousing", value, action)
            }
            clearable={false}
            options={[
              {
                label: "Appartement",
                value: "flat",
              },
              {
                label: "Chambre chez l'habitant",
                value: "homestay",
              },
              {
                label: "Chambre en résidence étudiante",
                value: "studentResidenceRoom",
              },
              {
                label: "Studio en résidence étudiante",
                value: "studentResidenceStudio",
              },
            ]}
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"flatShare"}>
            {"Possibilité de colocation"}
          </FormFieldLabel>

          <Radio
            value={values.flatShare}
            setValue={(value) => {
              setValues({
                ...values,
                flatShare: value,
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
          <FormFieldLabel htmlFor={"location"}>
            {"Localisation souhaitée"}
          </FormFieldLabel>

          <FormFieldInput
            type="text"
            name="location"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"surfaceArea"}>
            {"Superficie souhaitée"}
          </FormFieldLabel>

          <FormFieldInput
            type="text"
            name="surfaceArea"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"budget"}>
            {"Budget, précisez la monnaie"}
          </FormFieldLabel>

          <FormFieldInput
            type="text"
            name="budget"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"criteria"}>
            {"Critères spécifiques : meublé, équipement et services"}
          </FormFieldLabel>

          <FormFieldInput
            type="text"
            name="criteria"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup>
          <FormFieldLabel htmlFor={"comment"}>{"Commentaire"}</FormFieldLabel>

          <Textarea
            border={theme.colors.text.darker}
            background={theme.colors.layout.darkest}
            name="comment"
            onChange={onChange}
            required
          />
        </FormFieldGroup>

        <FormFieldGroup />

        <SubmitButton type="submit" prefix={<Icon name={"save"} fill />}>
          {tCommon("buttons.save")}
        </SubmitButton>
      </FormService>
    </>
  );
};

const SubmitButton = styled(DashboardButton)`
  width: fit-content !important;
  height: fit-content !important;
  margin-right: 0 !important;
`;

export default HousingServiceForm;
