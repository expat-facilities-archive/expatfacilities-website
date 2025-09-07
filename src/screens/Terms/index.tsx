import WordPressPage from "@components/WordPress/Page";
import { getPage } from "@services/wordpress";
import { NextPage } from "next";

interface Props {
  data: any;
}

const Terms: NextPage<Props> = ({ data }: Props) => {
  return (
    <WordPressPage
      data={data}
      description={"Read about Expat Facilities' Terms of Service."}
    />
  );
};

Terms.getInitialProps = async () => {
  const data = await getPage("terms");
  return { data };
};

export default Terms;
