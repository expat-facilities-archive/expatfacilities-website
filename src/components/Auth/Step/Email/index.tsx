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
import REGEX from "@constants/regex";
import { useForm } from "@hooks/useForm";
import useTranslation from "@hooks/useTranslation";
import { authStep } from "@screens/Auth";
import { UserInput } from "@typeDefs/auth";
import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import type {
  FailResponse,
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import Icon from "@components/Layout/Icon";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<authStep>>;
  user: UserInput;
  setUser: React.Dispatch<React.SetStateAction<UserInput>>;
}

const AuthStepEmail: React.FC<Props> = ({ setStep, setUser, user }: Props) => {
  const { t } = useTranslation("auth/step/email");
  const handleFormCallback = () => {
    handleForm();
  };

  const { onChange, onSubmit, values, setErrors, errors, valid } = useForm(
    handleFormCallback,
    {
      email: user.email,
    }
  );

  const [loading, setLoading] = React.useState(false);

  const handleForm = async (
    external = false,
    token?: {
      accessToken: string;
      type: "google" | "facebook";
    }
  ) => {
    setLoading(true);
    if (!external) {
      // For static demo, simulate user email check
      const mockData = { getUserEmail: { success: false } };
      setLoading(false);

      if (mockData.getUserEmail.success) {
        setStep(authStep.SIGN_IN);
      } else {
        setStep(authStep.SIGN_UP_IDENTITY);
      }
    } else if (external) {
      if (token && token.type === "google") {
        // For static demo, simulate Google login
        console.log("Google login with token:", token.accessToken);
        setLoading(false);
        setStep(authStep.SIGN_UP_IDENTITY);
        return;
      }
    }
  };

  const handleGoogleLogin = (response: any, success: boolean) => {
    if (success) {
      const email = response.profileObj.email;
      values.email = email;

      handleForm(true, { accessToken: response.tokenId, type: "google" });
    } else {
      //TODO: Do anything if login fails
    }
  };

  const handleFacebookSuccess = (response: ProfileSuccessResponse) => {
    console.log("Facebook login success:", response);
  };

  const handleFacebookFailure = (error: FailResponse) => {
    console.log("Facebook login failed:", error);
  };

  return (
    <AuthForm onSubmit={onSubmit}>
      <ButtonContainer>
        <GoogleLogin
          disabled={loading}
          theme="dark"
          accessType={"online"}
          clientId={
            "682103911587-8t88kt2jafc2nbsfqbnt9u30srp6dlfe.apps.googleusercontent.com"
          }
          scope="profile email https://www.googleapis.com/auth/user.phonenumbers.read"
          render={(props) => (
            <SocialButton
              {...props}
              mode={"lightest"}
              size={"small"}
              type={"button"}
              shape={"round"}
              prefix={<Icon name={"google"} fill />}
            >
              {t("connect.google")}
            </SocialButton>
          )}
          onSuccess={(response: any) => handleGoogleLogin(response, true)}
          onFailure={(response: any) => handleGoogleLogin(response, false)}
        />
        <FacebookLogin
          appId="500763888397911"
          onSuccess={handleFacebookSuccess}
          onFail={handleFacebookFailure}
          render={({ onClick }) => (
            <SocialButton
              onClick={onClick}
              mode={"lightest"}
              type={"button"}
              size={"small"}
              shape={"round"}
              disabled
            >
              <Icon name={"facebook"} fill />
              <SocialText>{t("connect.facebook")}</SocialText>
            </SocialButton>
          )}
        />
      </ButtonContainer>
      <AuthSeparator />
      <AuthStepHeader>
        <AuthStepTitle>{t("form.question")}</AuthStepTitle>
      </AuthStepHeader>
      <FieldGroup>
        <FieldContainer>
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoFocus
            onChange={(event: any) => {
              onChange(event);
              setUser({ ...user, email: event.target.value.toLowerCase() });
            }}
            value={values.email.toLowerCase()}
            pattern={REGEX.EMAIL}
            error={errors.email}
            setErrors={setErrors}
            errors={errors}
            required
          />
        </FieldContainer>
      </FieldGroup>
      <FieldGroup>
        <AuthButton type={"submit"} loading={loading} disabled={!valid}>
          {t("form.button")}
        </AuthButton>
      </FieldGroup>
    </AuthForm>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SocialText = styled.span`
  display: none;
`;

const SocialButton = styled(AuthButton)`
  position: relative;
  width: 100%;
  padding: 10px 10px;
  flex: 0;
  margin-left: 5px;
  border-radius: 10px;
  overflow: visible;
  white-space: nowrap;

  :first-child {
    margin-left: 0;
    ${SocialText} {
      display: inline-block;
      margin-left: 5px;
    }
  }

  :hover:not(:first-child) {
    ${SocialText} {
      position: absolute;
      display: inline-block;
      top: -45px;
      border-radius: 5px;
      padding: 10px 14px;
      background-color: ${({ theme }) =>
        convertRGBToRGBA(theme.colors.layout.darker, 0.8)};
      color: ${({ theme }) => theme.colors.text.lightest};
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-name: fadeIn;
      transform: translateX(-50%);

      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  }
`;

export default AuthStepEmail;
