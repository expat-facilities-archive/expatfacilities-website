import React from "react";
import styled, { useTheme } from "styled-components";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useTranslation from "@hooks/useTranslation";
import { addDays } from "date-fns";
import useBreakpoint from "@hooks/useBreakpoint";

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

const DatePicker: React.FC<Props> = ({
  checkInDate,
  checkOutDate,
  ...rest
}: Props) => {
  const { t } = useTranslation("home/featured");

  const theme = useTheme();
  const breakPoint = useBreakpoint();

  const selectionRange = {
    startDate: checkInDate.value,
    endDate: checkOutDate.value,
    key: "selection",
    color: theme.colors.accent.light,
  };

  const handleSelect = (ranges: any) => {
    checkInDate.setValue(ranges.selection.startDate);
    checkOutDate.setValue(ranges.selection.endDate);
  };

  const options = {
    rangeColors: [theme.colors.accent.light],
    ranges: [selectionRange],
    minDate: addDays(new Date(), 7 * 2),
    months: breakPoint.isMobile ? 1 : 2,
    onChange: handleSelect,
  };

  return (
    <Container {...rest}>
      <Header>
        <Title>{t("searchbar.picker.title")}</Title>
      </Header>
      <DateRange direction={"horizontal"} {...options} />
    </Container>
  );
};

DatePicker.displayName = "DatePicker";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  padding: 50px 8px 8px;
  width: calc(100% - 8px * 2);
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  overflow: hidden;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  .rdrDateRangePickerWrapper {
    display: flex;
    justify-content: space-between;
  }
  .rdrDateDisplayWrapper {
    background: none;
  }
  .rdrDayDisabled {
    background-color: ${({ theme }) => theme.colors.layout.darker};
  }
  .rdrDateDisplayItem {
    border-radius: 99px;
    background-color: ${({ theme }) => theme.colors.layout.darker};
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.25);

    &.rdrDateDisplayItemActive {
      border: 1px solid ${({ theme }) => theme.colors.accent.light};
    }
    input {
      color: ${({ theme }) => theme.colors.text.lightest};
    }
  }
  .rdrDefinedRangesWrapper {
    border: none;
    border-radius: 1rem;
  }
  .rdrCalendarWrapper {
    background: none;
    color: ${({ theme }) => theme.colors.layout.lightest};
  }
  .rdrStaticRange {
    border: none;
    background: none;
    &:hover,
    &:focus {
      .rdrStaticRangeLabel {
        background: ${({ theme }) => theme.colors.layout.darkest};
      }
    }
  }
  .rdrDefinedRangesWrapper {
    margin-right: 1.5rem;
    padding-top: 0.75rem;
    background: ${({ theme }) => theme.colors.layout.darker};
  }
  .rdrDayNumber span {
    color: ${({ theme }) => theme.colors.layout.lightest};
  }
  .rdrDayPassive .rdrDayNumber span {
    color: ${({ theme }) => theme.colors.layout.lightest};
    opacity: 0.33;
  }
  .rdrDayToday .rdrDayNumber span:after {
    background: ${({ theme }) => theme.colors.accent.light};
  }

  .rdrMonth {
    width: 100%;
    padding: 0;
  }
  .rdrMonthAndYearPickers select {
    color: ${({ theme }) => theme.colors.layout.lightest};
  }
  .rdrNextPrevButton {
    background: ${({ theme }) => theme.colors.layout.darkest};
  }
  .rdrPprevButton i {
    border-color: transparent ${({ theme }) => theme.colors.layout.lightest}
      transparent transparent;
  }
  .rdrNextButton i {
    border-color: transparent transparent transparent
      ${({ theme }) => theme.colors.layout.lightest};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.h4`
  font-weight: ${({ theme }) => theme.weight.medium};
`;

export default DatePicker;
