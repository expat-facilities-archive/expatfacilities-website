import EmailButton from "@components/Auth/EmailButton";
import {
  AuthButton,
  AuthForm,
  AuthSeparator,
  AuthStepHeader,
  AuthStepTitle,
  FieldContainer,
  FieldGroup,
} from "@components/Layout/Auth";
import REGEX from "@constants/regex";
import { useForm } from "@hooks/useForm";
import { authStep } from "@screens/Auth";
import { UserInput } from "@typeDefs/auth";
import React from "react";
import capitalize from "@utils/capitalize";
import useTranslation from "@hooks/useTranslation";
import ReactTelephoneInput from "react-telephone-input";
import styled from "styled-components";
import "react-telephone-input/css/default.css";
import Field, { Error } from "@components/Auth/Form/Field";

interface Props {
  user: UserInput;
  setUser: React.Dispatch<React.SetStateAction<UserInput>>;
  setStep: React.Dispatch<React.SetStateAction<authStep>>;
}

const AuthStepSignUpIdentity: React.FC<Props> = ({
  user,
  setUser,
  setStep,
}: Props) => {
  const { t } = useTranslation("auth/step/signup");
  const { t: tError } = useTranslation("error");
  const handleFormCallback = () => {
    handleForm();
  };

  const { onChange, onSubmit, values, errors, setErrors, valid, setValues } =
    useForm(handleFormCallback, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    });

  const handleForm = () => {
    setUser({
      ...user,
      ...values,
    });
    setStep(authStep.SIGN_UP_PASSWORD);
  };

  if (!errors["phoneNumber"] && !values.phoneNumber) {
    setErrors({
      ...errors,
      phoneNumber: tError("auth.empty", ["phoneNumber"]),
    });
  }

  return (
    <AuthForm onSubmit={onSubmit}>
      <EmailButton user={user} setStep={setStep} />
      <AuthSeparator />
      <AuthStepHeader>
        <AuthStepTitle>{t("identity.form.question")}</AuthStepTitle>
      </AuthStepHeader>
      <FieldGroup>
        <FieldContainer>
          <Field
            type={"text"}
            id={"firstName"}
            name={"firstName"}
            placeholder={t("identity.form.firstname")}
            errors={errors}
            setErrors={setErrors}
            error={errors?.firstName}
            onChange={onChange}
            value={capitalize(values.firstName)}
            pattern={REGEX.INTERNATIONAL_NAME}
            autoFocus
            required
          />
        </FieldContainer>
      </FieldGroup>
      <FieldGroup>
        <FieldContainer>
          <Field
            type={"text"}
            id={"lastName"}
            name={"lastName"}
            placeholder={t("identity.form.lastname")}
            error={errors?.lastName}
            value={capitalize(values.lastName)}
            onChange={onChange}
            errors={errors}
            setErrors={setErrors}
            pattern={REGEX.INTERNATIONAL_NAME}
            required
          />
        </FieldContainer>
      </FieldGroup>
      <FieldGroup>
        <FieldContainer>
          <TelField
            value={values.phoneNumber}
            type={"tel"}
            id={"phoneNumber"}
            name={"phoneNumber"}
            defaultCountry={"fr"}
            preferredCountries={["fr", "de", "es", "it", "gb", "us", "ca"]}
            flagsImagePath={"/static/images/flags.png"}
            onChange={(value: string) => {
              setValues({ ...values, phoneNumber: value });

              if (values.phoneNumber) {
                delete errors["phoneNumber"];
                setErrors(errors);
              }
            }}
            required
          />

          {errors?.phoneNumber === tError("auth.empty", ["phoneNumber"])
            ? false
            : true && <Error>{errors?.phoneNumber}</Error>}
        </FieldContainer>
      </FieldGroup>
      <FieldGroup>
        <AuthButton type="submit" disabled={!valid}>
          {t("identity.form.button")}
        </AuthButton>
      </FieldGroup>
    </AuthForm>
  );
};

const TelField = styled(ReactTelephoneInput)`
  background-color: ${({ theme }) => theme.colors.layout.darker};
  width: 100%;
  border-radius: 10px !important;
  height: auto;

  .flag-dropdown {
    border: none;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.layout.darker} !important;
    top: 1px;
    bottom: 1px;

    .selected-flag {
      background-color: ${({ theme }) => theme.colors.layout.darker};
      border: none;
      border-radius: 10px;
      transition: all 0.2s;
      height: 100%;
      margin-left: 1px;

      :hover {
      }
    }

    .country-list {
      width: 300px !important;
      max-width: 300px;
      background-color: ${({ theme }) => theme.colors.layout.darker} !important;
      font-size: ${({ theme }) => theme.size.small};
      border: 1px solid ${({ theme }) => theme.colors.layout.darker};

      .country {
        height: auto !important;
        text-align: initial;
        transition: all 0.2s;
        &.highlight {
          background-color: ${({ theme }) => theme.colors.accent.light};
        }
        :hover {
          background-color: ${({ theme }) => theme.colors.layout.darkest};
        }
      }
    }

    :hover,
    &.open-dropdown {
      .selected-flag {
        background-color: ${({ theme }) => theme.colors.layout.darkest};
        border-radius: 10px;
      }
    }
  }

  .form-control {
    background-color: ${({ theme }) => theme.colors.layout.darker} !important;
    color: ${({ theme }) => theme.colors.text.lightest};
    transition: all 0.2s;
    outline: none;
    font-size: ${({ theme }) => theme.size.small};
    box-shadow: none !important;
    border-radius: 10px !important;
    width: 100% !important;
    height: 100% !important;
    padding: 10px 14px 10px 44px !important;
    border: 1px solid ${({ theme }) => theme.colors.layout.dark} !important;

    :focus {
      border: 1px solid ${({ theme }) => theme.colors.accent.light} !important;
      color: ${({ theme }) => theme.colors.text.lightest};
    }

    ::placeholder {
      color: ${({ theme }) => theme.colors.text.light};
    }
  }
`;

export default AuthStepSignUpIdentity;
