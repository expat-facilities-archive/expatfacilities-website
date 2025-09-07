import { useStaticMutation } from "@hooks/useStaticQuery";
import Field from "@components/Auth/Form/Field";
import {
  AuthButton,
  AuthForm,
  AuthLink,
  AuthSeparator,
  AuthStepHeader,
  AuthStepTitle,
  FieldContainer,
  FieldGroup,
} from "@components/Layout/Auth";
import ROUTES from "@constants/routes";
import { useForm } from "@hooks/useForm";
import useTranslation from "@hooks/useTranslation";
import { LOGIN_USER } from "@queries/auth";
import { authStep } from "@screens/Auth";
import { UserInput } from "@typeDefs/auth";
import { useRouter } from "next/router";
import React from "react";
import EmailButton from "../../EmailButton";
import Recaptcha from "react-google-invisible-recaptcha";
import { siteKey } from "@services/recaptcha";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<authStep>>;
  user: UserInput;
}

const AuthStepSignIn: React.FC<Props> = ({ setStep, user }: Props) => {
  const { t } = useTranslation("auth/step/signin");
  const { t: tError } = useTranslation("error");
  const router = useRouter();

  const captchaRef = React.useRef<any>(null);

  const handleFormCallback = () => {
    console.log({
      ...values,
      ...user,
    });
    captchaRef.current.execute();
  };

  const onResolved = () => {
    handleForm();
  };

  const { onChange, onSubmit, values, errors, setErrors, valid } = useForm(
    handleFormCallback,
    {
      password: "",
    }
  );

  const [handleForm] = useStaticMutation(LOGIN_USER);
  const [loading] = React.useState(false);

  return (
    <AuthForm onSubmit={onSubmit}>
      <EmailButton user={user} setStep={setStep} />
      <AuthSeparator />
      <AuthStepHeader>
        <AuthStepTitle>{t("form.question")}</AuthStepTitle>
      </AuthStepHeader>
      <FieldGroup>
        <FieldContainer>
          <Field
            type={"password"}
            id={"password"}
            name={"password"}
            placeholder={t("form.placeholder")}
            autoFocus
            required
            errors={errors}
            setErrors={setErrors}
            error={errors.password && tError(errors.password)}
            value={values.password}
            onChange={onChange}
          />
        </FieldContainer>
      </FieldGroup>
      <FieldGroup>
        <Recaptcha
          ref={captchaRef}
          sitekey={siteKey}
          onResolved={onResolved}
          onError={() => {
            setErrors({
              password: tError("recaptcha"),
            });
          }}
        />
        <AuthButton type={"submit"} loading={loading} disabled={!valid}>
          {t("form.button")}
        </AuthButton>
      </FieldGroup>
      <AuthLink
        href={{
          pathname: ROUTES.RECOVERY,
          query: { ...router.query, email: user.email },
        }}
      >
        {t("form.forgot")}
      </AuthLink>
    </AuthForm>
  );
};

export default AuthStepSignIn;
