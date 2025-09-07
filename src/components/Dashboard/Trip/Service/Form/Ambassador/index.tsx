import FormFieldInput, {
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
import { useForm } from "@hooks/useForm";
import useTranslation from "@hooks/useTranslation";
import React from "react";
import styled from "styled-components";
import { ServiceFormProps } from "..";

const missions = [
  {
    value: "createVisa",
    label: "Finalisation du visa sur place",
  },
  {
    value: "fillUniversityDocuments",
    label: "Finalisation des documents universitaires",
  },
  {
    value: "createBankAccount",
    label: "Accompagnement lors de la création d’un compte bancaire local",
  },
  {
    value: "createPhonePlan",
    label: "Accompagnement lors de la création d'une ligne téléphonique",
  },
  {
    value: "createTransportationServicePass",
    label:
      "Accompagnement lors de la création d'un pass/abonnement aux services de transports en commun locaux",
  },
  {
    value: "preliminaryAccomodationVerification",
    label: "Vérification préalable du logement",
  },
  {
    value: "accomodationFixturesInventoryAccompagny",
    label: "Accompagner lors de l’état des lieux du logement",
  },
];

const maxSelections = [
  {
    forOffer: 1,
    value: 2,
  },
  {
    forOffer: 2,
    value: 4,
  },
  {
    forOffer: 3,
    value: missions.length,
  },
];

const AmbassadorServiceForm: React.FC<ServiceFormProps> = ({
  handleSubmit,
  service,
  tripService,
  setTotalAmount,
  mode,
}: ServiceFormProps) => {
  const [missionSelection, setMissionSelection] = React.useState<number>(-1);
  const [missionSelected, setMissionSelected] = React.useState<SelectOption[]>(
    []
  );
  const [errors, setErrors] = React.useState<{ [field: string]: string }>({
    selectedMission: "",
  });

  const { t: tCommon } = useTranslation("dashboard/common");

  tripService;

  const editMode: boolean = mode === "complete";
  editMode;

  const { values, setValues, onSubmit } = useForm(() => handleSubmit(values));

  const handleOfferChange = (
    value: SelectOption | undefined,
    action: ActionType
  ) => {
    setErrors({
      ...errors,
      selectedMission: "",
    });

    if (action !== "clear" && value) {
      const offer = service.offers?.find((o) => o.id.toString() == value.value);

      if (offer) {
        setMissionSelection(
          maxSelections.find((m) => m.forOffer === offer.id)?.value || -1
        );
        setTotalAmount(offer.price);

        setValues({
          ...values,
          ["selectedOffer"]: offer.id.toString(),
        });
      }
    }
  };

  const handleMissionChange = (
    value: SelectOption | undefined,
    action: ActionType
  ) => {
    setErrors({
      ...errors,
      selectedMission: "",
    });

    if (action === "select" && value) {
      setMissionSelected([...missionSelected, value]);
      setValues({
        ...values,
        ["missionType"]: [...(values.missionType || []), value.value],
      });
    } else if (action === "unselect" && value) {
      setMissionSelected(
        missionSelected.filter((m) => m.value !== value.value)
      );
      setValues({
        ...values,
        ["missionType"]: values.missionType?.filter(
          (m: string) => m !== value.value
        ),
      });
    } else if (action === "clear") {
      setValues({ ...values, ["missionType"]: [] });
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (missionSelected.length !== missionSelection) {
      setErrors({
        ...errors,
        selectedMission: `Tu dois sélectionner ${missionSelection} missions`,
      });

      event.stopPropagation();
      return;
    }

    onSubmit(event);
  };

  return (
    <>
      <FormService onSubmit={handleFormSubmit}>
        <FormFieldGroup>
          <FormFieldLabel htmlFor={"selectedOffer"}>
            {"Offre d'ambassadeur"}
          </FormFieldLabel>
          <FormFieldInput
            onChange={handleOfferChange}
            error={errors.selectedOffer}
            clearable={false}
            removeFromMenuOnSelect={false}
            options={
              service.offers?.map((offer) => ({
                value: offer.id.toString(),
                label: offer.name,
              })) || []
            }
            placeHolder={"Choisissez une offre"}
            required
          />
        </FormFieldGroup>
        <FormFieldGroup>
          <FormFieldLabel htmlFor={"missionTypes"}>
            {"Choix des missions"}
          </FormFieldLabel>
          <FormFieldInput
            options={missions}
            error={errors.selectedMission}
            placeHolder={
              missionSelection <= 0
                ? "Séléctionnez une offre"
                : "Choisissez vos missions"
            }
            closeMenuOnSelect={false}
            onChange={handleMissionChange}
            disabled={missionSelection <= 0}
            maxSelections={missionSelection}
            multiple={true}
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

export default AmbassadorServiceForm;
