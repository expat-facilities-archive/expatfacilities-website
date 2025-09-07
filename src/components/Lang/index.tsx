import Link from "@components/Layout/Link";
import { useRouter } from "next/router";
import styled from "styled-components";

const Lang: React.FC = (props) => {
  const { asPath, locale } = useRouter();
  const reverseLocale = locale == "en" ? "fr" : "en";
  return (
    <Container href={asPath} locale={reverseLocale} {...props}>
      <LangImage
        src={`/static/images/emojis/flag-${locale}.png`}
        alt={"Change language"}
        draggable={false}
        height={30}
        width={30}
      />
    </Container>
  );
};

const Container = styled(Link)`
  display: flex;
  align-items: center;
`;

const LangImage = styled.img`
  max-height: 30px;
  height: auto;
  width: 30px;
`;

export default Lang;
