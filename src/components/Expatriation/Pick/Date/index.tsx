import DatePicker from "@components/DatePicker";
import useTranslation from "@hooks/useTranslation";
import React from "react";
import styled from "styled-components";

interface Props {
  checkInDate: {
    value: Date;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
  };
  checkOutDate: {
    value: Date;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
  };
}

const PickDate: React.FC<Props> = ({ checkInDate, checkOutDate }: Props) => {
  const { t } = useTranslation("expatriation/country");

  const containerRef = React.useRef<HTMLParagraphElement>(null);
  const [focus, setFocus] = React.useState(false);

  const handleClick = () => {
    setFocus(!focus);
  };

  React.useEffect(() => {
    const onClick = (e: any) => {
      // If the active element exists and is clicked outside of
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocus(false);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (focus) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [containerRef, focus]);

  return (
    <Container ref={containerRef}>
      {t("details.tripfrom")}{" "}
      <CheckDate onClick={handleClick}>
        {checkInDate.value.toLocaleDateString()}
      </CheckDate>{" "}
      {t("details.tripto")}{" "}
      <CheckDate onClick={handleClick}>
        {checkOutDate.value.toLocaleDateString()}
      </CheckDate>
      {focus && (
        <CustomDatePicker
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
        />
      )}
    </Container>
  );
};

const Container = styled.p`
  position: relative;
`;

const CheckDate = styled.span`
  padding: 0.25rem 0.5rem;
  border: 1px solid rgba(168, 179, 207, 0.2);
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.layout.darker};
  white-space: nowrap;
  line-height: 2;
  font-size: 90%;
  cursor: pointer;
  user-select: none;
`;

const CustomDatePicker = styled(DatePicker)`
  z-index: 1;
  top: calc(100% + 8px);
  padding-top: 8px;
  border-radius: 1rem;
  border: 1px solid rgba(168, 179, 207, 0.2);
  max-width: 500px;
`;

export default PickDate;
