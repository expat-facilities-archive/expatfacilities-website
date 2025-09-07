import Icon from "@components/Layout/Icon";
import Link from "@components/Layout/Link";
import LINKS from "@constants/links";
import styled from "styled-components";

const AmbassadorSocial: React.FC = () => {
  return (
    <Container>
      <SocialLink href={LINKS.INSTAGRAM}>
        <Icon name={"instagram"} size={24} fill />
      </SocialLink>
      <SocialLink href={LINKS.LINKEDIN}>
        <Icon name={"linkedin-box"} size={24} fill />
      </SocialLink>
      <SocialLink href={LINKS.FACEBOOK}>
        <Icon name={"facebook"} size={24} fill />
      </SocialLink>
      <SocialLink href={LINKS.TWITTER}>
        <Icon name={"twitter"} size={24} fill />
      </SocialLink>
    </Container>
  );
};

const Container = styled.section`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialLink = styled(Link)`
  margin-left: 30px;

  :first-child {
    margin-left: 0;
  }
`;

export default AmbassadorSocial;
