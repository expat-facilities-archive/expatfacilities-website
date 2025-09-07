import {
  DashboardField,
  DashboardFieldContainer,
  DashboardFieldGroup,
  DashboardFieldLabel,
  DashboardForm,
  DashboardButton,
  DashboardSection,
  DashboardSectionTitle,
  DashboardSectionHeader,
  DashboardFieldRow,
  DashboardSectionContainer,
} from "@components/Layout/Dashboard";
import { useForm } from "@hooks/useForm";
import { useStaticMutation } from "@hooks/useStaticQuery";
import { DEACTIVATE_USER, UPDATE_USER } from "@queries/users";
import styled from "styled-components";
import REGEX from "@constants/regex";
import capitalize from "@utils/capitalize";
import React from "react";
import { User } from "@typeDefs/user";
import useTranslation from "@hooks/useTranslation";
import Avatar from "@components/Avatar";
import Icon from "@components/Layout/Icon";
import Modal from "@components/Layout/Modal";
import useModal from "@hooks/useModal";

interface Props {
  user: User;
}

const AccountGeneral: React.FC<Props> = ({ user }: Props) => {
  const [active, open, close] = useModal();

  const updateUserCallback = () => {
    updateUser({
      variables: values
    });
  };

  const { values, onChange, onSubmit, errors, setErrors } = useForm(
    updateUserCallback,
    {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    }
  );

  const [updateUser, { loading: loadingUpdateUser }] = useStaticMutation(UPDATE_USER);

  const [deactivateUser, { loading: loadingDeactivateUser }] = useStaticMutation(DEACTIVATE_USER);
  const submit = React.useCallback(() => {
    deactivateUser({
      variables: { userId: user.id }
    });
    close();
  }, [close, deactivateUser, user.id]);

  const { t } = useTranslation("dashboard/account");

  return (
    <>
      <DashboardSection>
        <DashboardSectionHeader>
          <DashboardSectionTitle>{"Profile picture"}</DashboardSectionTitle>
        </DashboardSectionHeader>
        <ProfilePictureContainer>
          <Avatar user={user} size={120} />
          <ProfilePictureContent>
            {
              "Télécharge ta photo de profil ou laisse l’icône de base. Utilise une photo carrée, ça marche mieux !"
            }
            <ProfilePictureButton
              prefix={<Icon name={"upload"} fill />}
              mode={"darker"}
            >
              {"Télécharger une image"}
            </ProfilePictureButton>
          </ProfilePictureContent>
        </ProfilePictureContainer>
      </DashboardSection>
      <DashboardSection>
        <DashboardSectionHeader>
          <DashboardSectionTitle>
            {"Personal informations"}
          </DashboardSectionTitle>
        </DashboardSectionHeader>
        <DashboardForm onSubmit={onSubmit}>
          <DashboardFieldRow>
            <DashboardGroup>
              <DashboardFieldLabel htmlFor="email">
                {t("email")}
              </DashboardFieldLabel>
              <DashboardFieldContainer>
                <LabelInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={onChange}
                  value={values.email.toLowerCase()}
                  pattern={REGEX.EMAIL}
                  error={errors.email}
                  setErrors={setErrors}
                  errors={errors}
                  required
                />
              </DashboardFieldContainer>
            </DashboardGroup>
          </DashboardFieldRow>
          <DashboardRow>
            <DashboardGroup>
              <DashboardFieldLabel htmlFor="firstName">
                {t("firstname")}
              </DashboardFieldLabel>
              <DashboardFieldContainer>
                <LabelInput
                  type={"text"}
                  id={"firstName"}
                  name={"firstName"}
                  placeholder={"First Name"}
                  errors={errors}
                  setErrors={setErrors}
                  error={errors?.firstName}
                  onChange={onChange}
                  value={capitalize(values.firstName)}
                  pattern={REGEX.INTERNATIONAL_NAME}
                  required
                />
              </DashboardFieldContainer>
            </DashboardGroup>
            <DashboardGroup>
              <DashboardFieldLabel htmlFor="lastName">
                {t("lastname")}
              </DashboardFieldLabel>
              <DashboardFieldContainer>
                <LabelInput
                  type={"text"}
                  id={"lastName"}
                  name={"lastName"}
                  placeholder={"Last Name"}
                  error={errors?.lastName}
                  value={capitalize(values.lastName)}
                  onChange={onChange}
                  errors={errors}
                  setErrors={setErrors}
                  pattern={REGEX.INTERNATIONAL_NAME}
                  required
                />
              </DashboardFieldContainer>
            </DashboardGroup>
          </DashboardRow>
          <DashboardFieldRow>
            <DashboardGroup>
              <DashboardFieldLabel htmlFor="phoneNumber">
                {t("phonenumber")}
              </DashboardFieldLabel>
              <DashboardFieldContainer>
                <DashboardField
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={onChange}
                  value={values.phoneNumber}
                  error={errors.phoneNumber}
                  setErrors={setErrors}
                  errors={errors}
                  required
                />
              </DashboardFieldContainer>
            </DashboardGroup>
          </DashboardFieldRow>
          <DashboardFieldRow>
            <SubmitButton onClick={onSubmit} loading={loadingUpdateUser}>
              {t("save")}
            </SubmitButton>
          </DashboardFieldRow>
        </DashboardForm>
      </DashboardSection>
      <DashboardSection>
        <DashboardSectionHeader>
          <DashboardSectionTitle>{"Account removal"}</DashboardSectionTitle>
        </DashboardSectionHeader>
        <DashboardSectionContainer>
          <DashboardFieldRow>
            <SubmitButton
              mode={"darker"}
              onClick={open}
              loading={loadingDeactivateUser}
            >
              {"Disable account"}
            </SubmitButton>
            <Modal.Modal
              active={active}
              onClickOutside={close}
              onEnterKeyPress={submit}
            >
              <Modal.Body>
                <Modal.Header>
                  <Modal.Title>Désactiver mon compte</Modal.Title>
                </Modal.Header>
                <ModalMessage>
                  {
                    "Après avoir soumis ta demande de suppression, ton compte sera désactivé pour une durée de 30 jours. Passé ce délai, si tu ne te reconnectes pas, l'ensemble de tes données seront totalement supprimées. Es-tu sur de bien vouloir désactiver ton compte?"
                  }
                </ModalMessage>
              </Modal.Body>
              <Modal.Actions>
                <Modal.Action onClick={close}>Annuler</Modal.Action>

                <Modal.Action onClick={submit}>Désactiver</Modal.Action>
              </Modal.Actions>
            </Modal.Modal>
          </DashboardFieldRow>
        </DashboardSectionContainer>
      </DashboardSection>
    </>
  );
};

const ProfilePictureContainer = styled(DashboardSectionContainer)`
  flex-direction: row;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const ProfilePictureContent = styled.div`
  margin-left: 30px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-left: 0;
    margin-top: 20px;
    align-items: center;
    text-align: center;
  }
`;

const ProfilePictureButton = styled(DashboardButton)`
  margin-top: 10px;
`;

const SubmitButton = styled(DashboardButton)`
  margin-top: 10px;
  width: min(350px, 100%);
  justify-content: flex-start;
`;

const DashboardRow = styled(DashboardFieldRow)`
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    flex-direction: column;
  }
`;

const DashboardGroup = styled(DashboardFieldGroup)`
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 100%;
    box-sizing: border-box;
    &:nth-child(2) {
      margin-left: 0;
      margin-top: 10px;
    }
  }
`;

const LabelInput = styled(DashboardField)`
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: auto;
  }
`;

const ModalMessage = styled.p`
  text-align: center;
`;

export default AccountGeneral;
