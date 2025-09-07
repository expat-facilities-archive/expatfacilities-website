import { useStaticMutation } from "@hooks/useStaticQuery";
import EmailButton from "@components/Auth/EmailButton";
import Field from "@components/Auth/Form/Field";
import {
  AuthButton,
  AuthForm,
  AuthSeparator,
  AuthStepHeader,
  AuthStepTitle,
  FieldContainer,
  FieldGroup,
} from "@components/Layout/Auth";
import Link from "@components/Layout/Link";
import REGEX from "@constants/regex";
import ROUTES from "@constants/routes";
import { useForm } from "@hooks/useForm";
import useTranslation from "@hooks/useTranslation";
import { REGISTER_USER } from "@queries/auth";
import { authStep } from "@screens/Auth";
import { UserInput } from "@typeDefs/auth";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Recaptcha from "react-google-invisible-recaptcha";
import { siteKey } from "@services/recaptcha";
import capitalize from "@utils/capitalize";

interface Props {
  user: UserInput;
  setStep: React.Dispatch<React.SetStateAction<authStep>>;
}

const AuthStepSignUpPassword: React.FC<Props> = ({ user, setStep }: Props) => {
  const { t } = useTranslation("auth/step/signup");
  const { t: tError } = useTranslation("error");
  const router = useRouter();

  const captchaRef = React.useRef<any>(null);

  const handleFormCallback = () => {
    captchaRef.current.execute();
  };

  const onResolved = () => {
    handleForm({
      variables: {
        ...values,
        ...user,
      },
    });
  };

  const { onChange, onSubmit, values, errors, setErrors, valid } = useForm(
    handleFormCallback,
    {
      password: "",
    }
  );

  const [handleForm, { loading }] = useStaticMutation(REGISTER_USER);

  console.log(errors.password, tError("auth.invalid", ["password"]));

  return (
    <AuthForm onSubmit={onSubmit}>
      <EmailButton user={user} setStep={setStep} />
      <AuthSeparator />
      <AuthStepHeader>
        <AuthStepTitle>{`${user.firstName}, ${t(
          "password.form.question"
        )}`}</AuthStepTitle>
      </AuthStepHeader>
      <FieldGroup>
        <FieldContainer>
          <Field
            type={"password"}
            id={"password"}
            name={"password"}
            placeholder={t("password.form.placeholder")}
            onChange={onChange}
            autoFocus
            error={
              errors &&
              errors.password &&
              errors.password.includes(
                capitalize(tError("auth.invalid", ["password"]))
              )
                ? `${t("password.form.error")}`
                : errors?.password
            }
            value={values.password}
            pattern={REGEX.PASSWORD}
            setErrors={setErrors}
            errors={errors}
            required
          />
        </FieldContainer>
      </FieldGroup>
      <FieldGroup>
        <Recaptcha
          ref={captchaRef}
          sitekey={siteKey}
          onResolved={onResolved}
          locale={router.locale}
          onError={() => {
            setErrors({
              password: tError("recaptcha"),
            });
          }}
        />
        <AuthButton type="submit" loading={loading} disabled={!valid}>
          {t("password.form.submit")}
        </AuthButton>
      </FieldGroup>
      <Disclaimer>
        {t("password.form.disclaimer.bypressing") + " "}
        <Link href={ROUTES.TERMS} target={"_blank"}>
          {t("password.form.disclaimer.terms") + " "}
        </Link>
        {t("password.form.disclaimer.and") + " "}
        <Link href={ROUTES.PRIVACY} target={"_blank"}>
          {t("password.form.disclaimer.privacy")}
        </Link>
        {"."}
      </Disclaimer>
    </AuthForm>
  );
};

const Disclaimer = styled.div`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.size.tiny};
  color: ${({ theme }) => theme.colors.text.light};

  a {
    font-weight: ${({ theme }) => theme.weight.bold};
  }
`;

export default AuthStepSignUpPassword;
