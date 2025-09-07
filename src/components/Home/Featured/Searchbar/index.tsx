import React from "react";
import styled from "styled-components";
import Button from "@components/Layout/Button";
import DatePicker from "../../../DatePicker";
import ResultList from "./ResultList";
import { useRouter } from "next/router";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import Image from "@components/Image";
import { addDays, addMonths } from "date-fns";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";

const FeaturedSearchbar: React.FC = () => {
  const { t } = useTranslation("home/featured");
  const router = useRouter();

  const [inputFocus, setInputFocus] = React.useState(false);
  const [location, setLocation] = React.useState<{
    slug: string | null;
    name: string;
  }>({
    slug: null,
    name: "",
  });

  const inTwoWeek = addDays(new Date(), 7 * 2);
  const inSixMonth = addMonths(inTwoWeek, 6);
  const [checkInDate, setCheckInDate] = React.useState<Date>(inTwoWeek);
  const [checkOutDate, setCheckOutDate] = React.useState<Date>(inSixMonth);

  const openDatePicker = () => {
    setInputFocus(true);
  };

  const close = () => {
    setInputFocus(false);
    setLocation({
      slug: null,
      name: "",
    });
    setCheckInDate(inTwoWeek);
    setCheckOutDate(inSixMonth);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (location.slug) {
      router.push({
        pathname: `${ROUTES.EXPATRIATION}/${location.slug}`,
        query: {
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString(),
        },
      });
    }
  };

  const containerRef = React.useRef<HTMLFormElement>(null);
  const locationFieldRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const onClick = (e: any) => {
      // If the active element exists and is clicked outside of
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        close();
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (inputFocus) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [close, containerRef, inputFocus]);

  return (
    <Container
      inputFocus={inputFocus}
      onSubmit={handleSubmit}
      ref={containerRef}
    >
      <FakeField
        type="text"
        placeholder={t("searchbar.where")}
        onFocus={openDatePicker}
        value={location.name}
        onChange={(e) => setLocation({ ...location, name: e.target.value })}
      />
      {inputFocus && (
        <Overlay>
          <FieldContainer onClick={() => locationFieldRef.current?.focus()}>
            <Label htmlFor="location">{t("searchbar.location")}</Label>
            <Field
              id={"location"}
              value={location.name}
              ref={locationFieldRef}
              onChange={(e) => {
                if (e.target.value && location.slug)
                  setLocation({
                    ...location,
                    name: e.target.value,
                    slug: null,
                  });
                else setLocation({ ...location, name: e.target.value });
              }}
              placeholder={t("searchbar.where")}
              autoFocus
              required
              autoComplete={"off"}
            />
          </FieldContainer>

          <FieldContainer tabletHidden>
            <Label>{t("searchbar.checkin")}</Label>
            <Field
              disabled
              placeholder="Add dates"
              value={checkInDate.toLocaleDateString()}
            />
          </FieldContainer>

          <FieldContainer tabletHidden>
            <Label>{t("searchbar.checkout")}</Label>
            <Field
              disabled
              placeholder="Add dates"
              value={checkOutDate.toLocaleDateString()}
            />
          </FieldContainer>
          <OverlaySeparator />
        </Overlay>
      )}
      <SubmitButton title={"Search"} onClick={openDatePicker}>
        <SubmitIcon
          src={"/static/images/icons/search-plane.svg"}
          alt={""}
          width={50}
          height={25}
        />
      </SubmitButton>
      {inputFocus && (
        <>
          {location.slug ? (
            <CustomDatePicker
              checkInDate={{ value: checkInDate, setValue: setCheckInDate }}
              checkOutDate={{ value: checkOutDate, setValue: setCheckOutDate }}
            />
          ) : (
            <ResultList location={location} setLocation={setLocation} />
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.form<{ inputFocus: boolean }>`
  position: relative;
  margin-top: 60px;
  display: flex;
  color: ${({ theme }) => theme.colors.text.lightest};
  background-color: ${({ theme, inputFocus }) =>
    inputFocus
      ? theme.colors.layout.darker
      : convertRGBToRGBA(theme.colors.layout.darker, 0.4)};
  backdrop-filter: blur(7px);
  padding: 10px;
  width: 60%;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
  border-radius: 99999px;
  transition: none;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 95%;
  }
`;

const FakeField = styled.input`
  background: none;
  font-size: ${({ theme }) => theme.size.small};
  border: none;
  line-height: 1.5;
  display: block;
  outline: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 15px;
  font-size: ${({ theme }) => theme.size.medium};
`;

const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 99px;
  display: flex;
  align-items: center;
  left: 0;
  top: 0;
  transition: all 0.2s;
  pointer-events: none;
`;

const FieldContainer = styled.div<{ tabletHidden?: boolean }>`
  border-radius: 99px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s;
  position: relative;
  pointer-events: auto;
  padding: 0 30px;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  flex: 1;

  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.layout.darkest};
  }

  ${({ tabletHidden, theme }) =>
    tabletHidden &&
    `
    @media (max-width: ${theme.breakpoint.tablet}) {
      display: none;
    }
  `};
`;

const OverlaySeparator = styled.div`
  width: 66px;
  height: 100%;
  pointer-events: none;
`;

const Label = styled.label`
  background: none;
  font-size: ${({ theme }) => theme.size.small};
  border: none;
  line-height: 1.5;
  display: block;
  outline: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Field = styled.input`
  background: none;
  font-size: ${({ theme }) => theme.size.small};
  border: none;
  line-height: 1.5;
  display: block;
  outline: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.weight.bold};
  width: 100%;
  padding: 0;
`;

const SubmitButton = styled(Button)`
  max-width: 50px;
  max-height: 50px;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.title};
  letter-spacing: -6px;
  white-space: nowrap;
  text-align: center;
  padding: 0;
  user-select: none;
`;

const SubmitIcon = styled(Image)`
  height: 50px;
  width: 25px;
`;

const CustomDatePicker = styled(DatePicker)`
  z-index: -100;
`;

export default FeaturedSearchbar;
