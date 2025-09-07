import { NextPage } from "next";
import {
  AuthForm,
  AuthHeader,
  AuthBrandImage,
  AuthTitle,
  FieldContainer,
  FieldGroup,
  AuthButton,
  AuthContainer,
  AuthStepHeader,
  AuthStepTitle,
  AuthWrapper,
} from "@components/Layout/Auth";
import ROUTES from "@constants/routes";
import React from "react";
import { useForm } from "@hooks/useForm";
import { useStaticMutation } from "@hooks/useStaticQuery";
import { UPDATE_USER_PASSWORD } from "src/queries/auth";
import Field from "@components/Auth/Form/Field";
import REGEX from "@constants/regex";
import Background from "@components/Background";
import Link from "@components/Layout/Link";
import Head from "@components/Head";
import { getRandomNumber } from "@utils/getRandomNumber";

interface Props {
  query: any;
  backgroundUrl: string;
}

const RecoveryChange: NextPage<Props> = ({ query, backgroundUrl }: Props) => {

  const token = query?.token;
  const email = query?.email;

  const changePasswordCallback = () => {
    changePassword({
      variables: { ...values, token, email }
    });
  };

  const { onChange, onSubmit, values, errors, setErrors, valid } = useForm(
    changePasswordCallback,
    {
      password: "",
      confirmPassword: "",
    }
  );

  const [changePassword, { loading }] = useStaticMutation(UPDATE_USER_PASSWORD);

  return (
    <AuthContainer>
      <Head title={"Auth"} subtitle={"Password Change"} />
      <Background src={backgroundUrl} />
      <AuthHeader>
        <Link href={ROUTES.HOME}>
          <AuthBrandImage
            src={"/static/images/logo/logo.svg"}
            alt={"Expat Facilities Logo"}
            width={50}
            height={50}
          />
        </Link>
        <AuthTitle>{"Password Change"}</AuthTitle>
      </AuthHeader>
      <AuthWrapper>
        {email && token ? (
          <AuthForm onSubmit={onSubmit}>
            <AuthStepHeader>
              <AuthStepTitle>{"Change your password"}</AuthStepTitle>
            </AuthStepHeader>
            <FieldGroup>
              <FieldContainer>
                <Field
                  type={"password"}
                  id={"password"}
                  name={"password"}
                  placeholder={"Password"}
                  onChange={onChange}
                  autoFocus
                  error={
                    errors &&
                    errors.password &&
                    errors.password.includes("Invalid")
                      ? "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number"
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
              <FieldContainer>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={onChange}
                  error={errors?.confirmPassword}
                  setErrors={setErrors}
                  errors={errors}
                  value={values.confirmPassword}
                  required
                />
              </FieldContainer>
            </FieldGroup>
            <AuthButton type={"submit"} loading={loading} disabled={!valid}>
              Change Password
            </AuthButton>
          </AuthForm>
        ) : (
          <div>Email or token is missing</div>
        )}
      </AuthWrapper>
    </AuthContainer>
  );
};

RecoveryChange.getInitialProps = async ({ query }) => {
  return {
    query,
    backgroundUrl: `/static/images/auth/background/background-${getRandomNumber(
      1,
      50
    )}.jpeg`,
  };
};

export default RecoveryChange;
