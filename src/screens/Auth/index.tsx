import { NextPage } from "next";
import {
  AuthContainer,
  AuthHeader,
  AuthBrandImage,
  AuthTitle,
  AuthWrapper,
} from "@components/Layout/Auth";
import ROUTES from "@constants/routes";
import React from "react";
import Background from "@components/Background";
import AuthStepEmail from "@components/Auth/Step/Email";
import Link from "@components/Layout/Link";
import AuthStepSignIn from "@components/Auth/Step/SignIn";
import AuthStepSignUpIdentity from "@components/Auth/Step/SignUp/Identity";
import { UserInput } from "@typeDefs/auth";
import AuthStepSignUpPassword from "@components/Auth/Step/SignUp/Password";
import Head from "@components/Head";
import { getRandomNumber } from "@utils/getRandomNumber";
import useTranslation from "@hooks/useTranslation";

interface Props {
  query: any;
  backgroundUrl: string;
}

const Auth: NextPage<Props> = ({ query, backgroundUrl }: Props) => {
  const { t } = useTranslation("auth/common");
  const [welcomeMessage, setWelcomeMessage] = React.useState<string>("");
  const [step, setStep] = React.useState<authStep>(authStep.EMAIL);
  const [user, setUser] = React.useState<UserInput>({
    email: query.email || "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    auth: {
      googleId: "",
    },
  });

  React.useEffect(() => {
    const now = new Date();
    const hrs = now.getHours();
    let helloMessage = "";
    if (hrs >= 0) helloMessage = "header.early";
    if (hrs > 6) helloMessage = "header.morning";
    if (hrs > 12) helloMessage = "header.afternoon";
    if (hrs > 17) helloMessage = "header.evening";
    if (hrs > 22) helloMessage = "header.night";

    if (query.continue) setWelcomeMessage("Login to continue...");
    else setWelcomeMessage(helloMessage);
  }, [query.continue, setWelcomeMessage, user]);

  console.log(step, user);

  return (
    <AuthContainer>
      <Head title={"Auth"} />
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
        <AuthTitle>{t(welcomeMessage)}</AuthTitle>
      </AuthHeader>
      <AuthWrapper>
        {
          {
            [authStep.EMAIL]: (
              <AuthStepEmail setStep={setStep} setUser={setUser} user={user} />
            ),
            [authStep.SIGN_IN]: (
              <AuthStepSignIn setStep={setStep} user={user} />
            ),
            [authStep.SIGN_UP_IDENTITY]: (
              <AuthStepSignUpIdentity
                setUser={setUser}
                user={user}
                setStep={setStep}
              />
            ),
            [authStep.SIGN_UP_PASSWORD]: (
              <AuthStepSignUpPassword user={user} setStep={setStep} />
            ),
          }[step]
        }
      </AuthWrapper>
    </AuthContainer>
  );
};

Auth.getInitialProps = async ({ query }) => {
  return {
    query,
    backgroundUrl: `/static/images/auth/background/background-${getRandomNumber(
      1,
      50
    )}.jpeg`,
  };
};

export enum authStep {
  EMAIL,
  SIGN_IN,
  SIGN_UP_IDENTITY,
  SIGN_UP_PASSWORD,
}

export default Auth;
