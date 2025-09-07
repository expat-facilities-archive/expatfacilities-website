import Textarea from "@components/Layout/Textarea";

type Props = {
  title: React.ReactNode;
  comment: string;
  disabled?: boolean;
  border?: string;
  background?: string;
};

const TripComment: React.FC<Props> = ({
  title,
  comment,
  disabled,
  border,
  background,
}: Props) => {
  return (
    <>
      {title}
      <Textarea disabled={disabled} border={border} background={background}>
        {comment}
      </Textarea>
    </>
  );
};

export default TripComment;
