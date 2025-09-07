import DatePicker from "@components/DatePicker";
import Button from "@components/Layout/Button";
import { DrawerPortal } from "@components/Layout/Drawer";
import ROUTES from "@constants/routes";
import { CartContext } from "@context/Cart";
import useBreakpoint from "@hooks/useBreakpoint";
import useTranslation from "@hooks/useTranslation";
import { City, Country } from "@typeDefs/destinations";
import { Service } from "@typeDefs/services";
import { formatAmount } from "@utils/formatAmount";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import { elementScrollIntoView } from "seamless-scroll-polyfill";
import styled from "styled-components";

interface Props {
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
  selectedCity: City | null;
  checkInDate: {
    value: Date;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
  };
  checkOutDate: {
    value: Date;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
  };
  selectedServices: Array<number>;
  services: Service[];
  country: Country;
}

const Resume: React.FC<Props> = ({
  setSelectedCity,
  selectedCity,
  checkInDate,
  checkOutDate,
  selectedServices,
  services,
  country,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation("expatriation/country");
  const { t: tData } = useTranslation("data/services");
  const { t: tExpatriation } = useTranslation("home/expatriation");
  const { setCart } = React.useContext(CartContext);
  const { isMobile } = useBreakpoint();

  const handleClick = () => {
    if (selectedCity) {
      setCart({
        city: selectedCity.id,
        checkInDate: checkInDate.value.toISOString(),
        checkOutDate: checkOutDate.value.toISOString(),
        services: selectedServices,
      });
      router.push(ROUTES.DASHBOARD_TRIPS_ADD);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    selectedServices.forEach((serviceId) => {
      total +=
        services.find((service) => service.id === serviceId)?.price ||
        services.find((service) => service.id === serviceId)?.startingPrice ||
        0;
    });

    return formatAmount(total);
  };

  const containerRef = React.useRef<HTMLParagraphElement>(null);
  const [focus, setFocus] = React.useState(false);

  const handleDatePickerFocus = () => {
    setFocus(!focus);
  };

  const handleClickToResume = () => {
    const el = document.getElementById("resume");
    if (el) {
      elementScrollIntoView(el, {
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  React.useEffect(() => {
    const onClick = (e: any) => {
      // If the active element exists and is clicked outside of
      // the container, set focus to false
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        focus
      ) {
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
    <>
      <Container id={"resume"}>
        {selectedServices.length < 1 ? (
          <Title>{tExpatriation("selectservices")}</Title>
        ) : (
          <Price>
            {`${calculateTotal()} `}
            <span>
              {`pour ${differenceInDays(
                checkOutDate.value,
                checkInDate.value
              )} jours*`}
            </span>
          </Price>
        )}

        <FieldWrapper>
          <FieldRow
            onClick={handleDatePickerFocus}
            ref={containerRef}
            isFocus={focus}
          >
            <FieldContainer>
              <Label>{tExpatriation("from")}</Label>
              <Field
                disabled
                placeholder={tExpatriation("dateadd")}
                value={checkInDate.value.toLocaleDateString()}
              />
            </FieldContainer>

            <FieldContainer borderLeft>
              <Label>{tExpatriation("to")}</Label>
              <Field
                disabled
                placeholder={tExpatriation("dateadd")}
                value={checkOutDate.value.toLocaleDateString()}
              />
            </FieldContainer>
          </FieldRow>

          <DatePickerContainer ref={containerRef}>
            {focus && (
              <CustomDatePicker
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            )}
          </DatePickerContainer>

          <FieldRow>
            <FieldContainer>
              <Label>{tExpatriation("city")}</Label>
              <Field
                disabled
                placeholder={tExpatriation("selectcity")}
                value={selectedCity ? selectedCity.name : ""}
              />
              <CitySelector
                value={selectedCity ? selectedCity.id : ""}
                onChange={(event) => {
                  const city =
                    country.cities.find(
                      (city) => city.id === event.target.value
                    ) || null;

                  if (city) {
                    setSelectedCity(city);
                    router.push(
                      `${ROUTES.EXPATRIATION}/${country.slug}/${city.slug}`,
                      undefined,
                      { shallow: true, scroll: false }
                    );
                  }
                }}
              >
                <option hidden>{tExpatriation("selectcity")}</option>
                {country.cities.map((city: City, i: number) => (
                  <option key={i} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </CitySelector>
            </FieldContainer>
          </FieldRow>
        </FieldWrapper>

        <OrderButton onClick={handleClick} disabled={!selectedCity}>
          {selectedCity
            ? t("details.startbutton")
            : tExpatriation("selectcity")}
        </OrderButton>

        <Info>{tExpatriation("nocharge")}</Info>

        {selectedServices.length > 0 && (
          <Summary>
            {selectedServices.map((serviceId, i: number) => {
              const service = services.find(
                (service) => service.id === serviceId
              );

              const servicePrice =
                services.find((service) => service.id === serviceId)?.price ||
                services.find((service) => service.id === serviceId)
                  ?.startingPrice ||
                0;

              return (
                <SummaryRow key={i}>
                  <SummaryLabel>{service && tData(service.name)}</SummaryLabel>
                  <SummaryValue>{formatAmount(servicePrice)}</SummaryValue>
                </SummaryRow>
              );
            })}
            <SummarySeparator />
            <SummaryRow>
              <span>
                <SummaryLabel>{tExpatriation("total")}</SummaryLabel>
                {"*"}
              </span>

              <SummaryValue>{calculateTotal()}</SummaryValue>
            </SummaryRow>
          </Summary>
        )}

        <Disclaimer>{tExpatriation("disclaimer")}</Disclaimer>
      </Container>
      {isMobile && (
        <DrawerPortal>
          <MobileContainer onClick={handleClickToResume}>
            {selectedServices.length < 1 ? (
              <Title>{tExpatriation("selectservices")}</Title>
            ) : (
              <>
                <Price>
                  {`${calculateTotal()} `}
                  <span>
                    {`pour ${differenceInDays(
                      checkOutDate.value,
                      checkInDate.value
                    )} jours*`}
                  </span>
                </Price>
              </>
            )}
            <OrderButton onClick={handleClick} disabled={!selectedCity}>
              {selectedCity
                ? t("details.startbutton")
                : tExpatriation("selectcity")}
            </OrderButton>
          </MobileContainer>
        </DrawerPortal>
      )}
    </>
  );
};

const OrderButton = styled(Button)`
  margin-top: 15px;
`;

const Container = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 10px;
`;

const MobileContainer = styled(Container)`
  margin-top: 0;
  position: fixed;
  bottom: 0;
  border-radius: 0;
  width: calc(100% - 15px * 2);
  min-height: ${80 - 15 * 2}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${OrderButton} {
    margin-top: 0;
    min-width: 200px;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.light};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.normal};
    padding-right: 5px;
  }
`;

const Price = styled.h2`
  font-size: ${({ theme }) => theme.size.large};

  span {
    font-size: ${({ theme }) => theme.size.normal};
    font-weight: ${({ theme }) => theme.weight.extraLight};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.normal};
    display: flex;
    flex-direction: column;

    span {
      font-size: ${({ theme }) => theme.size.small};
    }
  }
`;

const Disclaimer = styled.p`
  margin-top: 15px;
  font-size: ${({ theme }) => theme.size.tiny};
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
`;

const FieldWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid rgba(168, 179, 207, 0.2);
`;

const FieldRow = styled.div<{ isFocus?: boolean }>`
  display: flex;
  background-color: ${({ isFocus, theme }) =>
    isFocus ? theme.colors.layout.dark : "transparent"};
  transition: all 0.2s;
  cursor: pointer;
  border-radius: 0 0 10px 10px;
  user-select: none;

  :first-child {
    border-bottom: 1px solid rgba(168, 179, 207, 0.2);
    border-radius: 10px 10px 0 0;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.layout.dark};
  }
`;

const FieldContainer = styled.div<{ borderLeft?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s;
  position: relative;
  pointer-events: auto;
  padding: 5px 10px;
  text-align: left;
  flex: 1;

  ${({ borderLeft }) =>
    borderLeft &&
    "border-left: 1px solid rgba(168, 179, 207, 0.2); border-top-left-radius: 0; border-bottom-left-radius: 0;"};
`;

const Label = styled.label`
  background: none;
  font-size: 9px;
  font-weight: ${({ theme }) => theme.weight.bold};
  text-transform: uppercase;
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
  cursor: pointer;
`;

const DatePickerContainer = styled.div`
  position: relative;
`;

const CustomDatePicker = styled(DatePicker)`
  z-index: 1;
  top: -1px;
  left: -1px;
  padding-top: 8px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid rgba(168, 179, 207, 0.2);
  max-width: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    max-width: 100%;
  }
`;

const CitySelector = styled.select`
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Info = styled.p`
  margin-top: 15px;
  font-size: ${({ theme }) => theme.size.small};
  text-align: center;
`;

const Summary = styled.ul`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const SummaryRow = styled.li<{ bold?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  font-weight: ${({ theme, bold }) =>
    bold ? theme.weight.bold : theme.weight.extraLight};
`;

const SummaryLabel = styled.span`
  text-decoration: underline;
`;

const SummaryValue = styled.span``;

const SummarySeparator = styled.div`
  margin: 10px 0;
  width: 100%;
  height: 1px;
  background: rgba(168, 179, 207, 0.2);
`;

export default Resume;
