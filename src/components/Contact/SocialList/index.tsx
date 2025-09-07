import styled from "styled-components";
import Card from "@components/Contact/SocialList/SocialCard";
import useTranslation from "@hooks/useTranslation";

const List: React.FC = () => {
  const { t } = useTranslation("contact/sociallist");
  return (
    <Container>
      <Card
        data={{
          link: "https://www.instagram.com/expatfacilities",
          image: "instagram",
          title: "Instagram",
          subtitle: "@expatfacilities",
        }}
      />
      <Card
        data={{
          link: "https://www.facebook.com/expatfacilities",
          image: "facebook-box",
          title: "Facebook",
          subtitle: "@expatfacilities",
        }}
      />
      <Card
        data={{
          link: "https://www.linkedin.com/company/expat-s-facilities/",
          image: "linkedin",
          title: "LinkedIn",
          subtitle: "@expatfacilities",
        }}
      />
      <Card
        data={{
          link: "tel:+33 7 56 85 66 85",
          image: "phone",
          title: t("data.telephone"),
          subtitle: "+33 7 56 85 66 85",
        }}
      />
      <Card
        data={{
          link: "https://twitter.com/expatfacilities",
          image: "twitter",
          title: "Twitter",
          subtitle: "@expatfacilities",
        }}
      />
      <Card
        data={{
          link: "https://tiktok.com/@expatfacilities",
          image: "music",
          title: "TikTok",
          subtitle: "@expatfacilities",
        }}
      />
      <Card
        data={{
          link: "mailto:contact@expatfacilities.co",
          image: "mail",
          title: t("data.email"),
          subtitle: "contact@expatfacilities.co",
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-wrap: wrap;
  }
`;

export default List;
