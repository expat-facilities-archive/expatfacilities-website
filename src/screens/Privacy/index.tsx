import WordPressPage from "@components/WordPress/Page";
import { getPage } from "@services/wordpress";
import { NextPage } from "next";

interface Props {
  data: any;
}

const Privacy: NextPage<Props> = ({ data }: Props) => {
  return (
    <WordPressPage
      data={data}
      description={
        "Our commitment to privacy is represented in this set of principles that guide us in our decision making."
      }
    />
  );
};

Privacy.getInitialProps = async () => {
  const data = await getPage("privacy");
  return { data };
};

export default Privacy;
