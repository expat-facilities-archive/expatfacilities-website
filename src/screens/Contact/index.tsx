import Wrapper from "@components/Wrapper";
import { NextPage } from "next";
import LayoutMain from "@components/Layout/Main";
import LayoutContainer from "@components/Layout/Container";
import Head from "@components/Head";
import Background from "@components/Background";
import Featured from "@components/Contact/Featured";
import FollowUs from "@components/Contact/FollowUs";
import SocialList from "@components/Contact/SocialList";
import useTranslation from "@hooks/useTranslation";

const Contact: NextPage = () => {
  const { t } = useTranslation("contact/common");
  return (
    <Wrapper>
      <LayoutMain>
        <Head title={t("head.title")} description={t("head.description")} />
        <LayoutContainer>
          <Background src={"/static/images/backgrounds/contact.jpg"} />
          <Featured />
          <FollowUs />
          <SocialList />
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

export default Contact;
