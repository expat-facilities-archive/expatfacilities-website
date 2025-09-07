import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  AuthForm,
  AuthHeader,
  AuthBrandImage,
  AuthTitle,
  FieldContainer,
  FieldGroup,
  AuthButton,
  AuthContainer,
  AuthLink,
  AuthStepHeader,
  AuthStepTitle,
  AuthWrapper,
} from "@components/Layout/Auth";
import ROUTES from "@constants/routes";
import React from "react";
import { useForm } from "@hooks/useForm";
import { useMutation } from "@apollo/react-hooks";
import { RECOVER_USER } from "@queries/auth";
import Field from "@components/Auth/Form/Field";
import REGEX from "@constants/regex";
import Head from "@components/Head";
import Background from "@components/Background";
import Link from "@components/Layout/Link";
import openMailbox from "@utils/openMailbox";
import { getRandomNumber } from "@utils/getRandomNumber";

interface Props {
  query: any;
  backgroundUrl: string;
}

const Recovery: NextPage<Props> = ({ query, backgroundUrl }: Props) => {
  const router = useRouter();
  const [success, setSuccess] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState({
    email: "",
  });

  const recoverCallback = () => {
    recover();
  };

  const { onChange, onSubmit, values, valid } = useForm(recoverCallback, {
    email: query.email || "",
  });

  const [recover, { loading }] = useMutation(RECOVER_USER, {
    update(_, { data }) {
      setSuccess(data?.recoverUser.success);
    },
    onError(err) {
      setErrors({
        email: err.graphQLErrors[0].message,
      });
    },
    variables: values,
  });

  const handleClick = () => {
    openMailbox(values.email);
  };

  return (
    <AuthContainer>
      <Head title={"Auth"} subtitle={"Recovery"} />
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
        <AuthTitle>{"Password Recovery"}</AuthTitle>
      </AuthHeader>
      <AuthWrapper>
        {!success ? (
          <AuthForm onSubmit={onSubmit}>
            <AuthStepHeader>
              <AuthStepTitle>{"What's your email address?"}</AuthStepTitle>
            </AuthStepHeader>
            <FieldGroup>
              <FieldContainer>
                <Field
                  type={"email"}
                  id={"email"}
                  name={"email"}
                  placeholder={"Email"}
                  value={values.email.toLowerCase()}
                  pattern={REGEX.EMAIL}
                  error={errors.email}
                  setErrors={setErrors}
                  errors={errors}
                  required
                  onChange={(event: any) => {
                    router.push(
                      {
                        pathname: router.pathname,
                        query: {
                          ...router.query,
                          [event.target.name]: event.target.value,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
                    onChange(event);
                  }}
                />
              </FieldContainer>
            </FieldGroup>
            <AuthButton type="submit" loading={loading} disabled={!valid}>
              Send Email
            </AuthButton>
            <AuthLink href={{ pathname: ROUTES.SIGN_IN, query: router.query }}>
              {"← Back to Login"}
            </AuthLink>
          </AuthForm>
        ) : (
          <AuthForm>
            <AuthStepHeader>
              <AuthStepTitle>
                {"Check your emails you have received a recovery email!"}
              </AuthStepTitle>
            </AuthStepHeader>
            <AuthButton onClick={handleClick} type={"button"}>
              {"Open your mailbox"}
            </AuthButton>
            <AuthButton
              mode={"darker"}
              onClick={() => setSuccess(false)}
              type={"button"}
            >
              {"I did not get the mail"}
            </AuthButton>
            <AuthLink href={{ pathname: ROUTES.SIGN_IN, query: router.query }}>
              {"← Back to Login"}
            </AuthLink>
          </AuthForm>
        )}
      </AuthWrapper>
    </AuthContainer>
  );
};

Recovery.getInitialProps = async ({ query }) => {
  return {
    query,
    backgroundUrl: `/static/images/auth/background/background-${getRandomNumber(
      1,
      50
    )}.jpeg`,
  };
};

export default Recovery;
