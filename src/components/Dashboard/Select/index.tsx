import React from "react";
import styled from "styled-components";
import DashboardSelectLabel from "./Label";

export class SelectOption {
  value!: string;
  label!: string;
}

export type ActionType = "clear" | "select" | "unselect";

interface Props {
  multiple?: boolean;
  required?: boolean | number;
  maxSelections?: number;
  removeFromMenuOnSelect?: boolean;
  closeMenuOnSelect?: boolean;
  options: SelectOption[];
  onChange?: (value: SelectOption | undefined, action: ActionType) => void;
  error?: string;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  defaultValue?: SelectOption | SelectOption[];
}

const DashboardSelect: React.FC<Props> = ({
  multiple = false,
  required = false,
  maxSelections,
  removeFromMenuOnSelect = true,
  closeMenuOnSelect = true,
  options,
  onChange,
  error,
  searchable = true,
  clearable = true,
  disabled = false,
  placeHolder,
  defaultValue,
}: Props) => {
  required;
  searchable;
  defaultValue;

  const menuRef = React.useRef<HTMLDivElement>(null);
  const controlRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpened, setMenuOpened] = React.useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = React.useState<SelectOption[]>(
    []
  );

  const handleMenuToggle = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement | MouseEvent>
  ) => {
    event.preventDefault();

    if (menuOpened) closeMenu();
    else openMenu();
  };

  const openMenu = () => {
    setMenuOpened(true);

    if (controlRef.current) {
      controlRef.current.focus();
    }
  };

  const closeMenu = () => {
    setMenuOpened(false);

    if (controlRef.current) {
      controlRef.current.blur();
    }
  };

  const clearSelectedOptions = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    setSelectedOptions([]);

    if (onChange) {
      onChange(undefined, "clear");
    }
  };

  const handleOptionSelect = (option: SelectOption) => {
    if (controlRef.current) {
      controlRef.current.focus();
    }

    if (multiple) {
      // - If the option is already selected, remove it from the selected options
      if (
        selectedOptions.some(
          (selectedOption) => selectedOption.value === option.value
        )
      ) {
        setSelectedOptions(
          selectedOptions.filter(
            (selectedOption) => selectedOption.value !== option.value
          )
        );

        if (onChange) {
          onChange(option, "unselect");
        }
      } else {
        setSelectedOptions([...selectedOptions, option]);

        if (onChange) {
          onChange(option, "select");
        }
      }
    } else {
      // - Select only one option
      setSelectedOptions([option]);

      if (onChange) {
        onChange(option, "select");
      }
    }

    if (closeMenuOnSelect) {
      closeMenu();
    }
  };

  React.useEffect(() => {
    const onClick = (event: any) => {
      // If the active element exists and is clicked outside of
      if (
        controlRef.current &&
        menuRef.current &&
        !controlRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        closeMenu();
      } else if (
        controlRef.current &&
        menuRef.current &&
        menuRef.current.contains(event.target)
      ) {
        controlRef.current.focus();
      }
    };

    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [controlRef]);

  return (
    <Container disabled={disabled}>
      <Control
        ref={controlRef}
        error={error}
        onClick={(event: React.MouseEvent<HTMLButtonElement | MouseEvent>) =>
          !disabled && handleMenuToggle(event)
        }
      >
        <ValueContainer>
          {selectedOptions && selectedOptions.length > 0 ? (
            !multiple ? (
              selectedOptions[0].label
            ) : (
              selectedOptions.map((option: SelectOption, index: number) => (
                <DashboardSelectLabel
                  key={index}
                  option={option}
                  handleOptionSelect={handleOptionSelect}
                />
              ))
            )
          ) : (
            <Placeholder>{placeHolder || "Search..."}</Placeholder>
          )}
        </ValueContainer>
        <IndicatorsContainer>
          {clearable && selectedOptions && selectedOptions.length > 0 && (
            <IndicatorContainer onClick={clearSelectedOptions} accent={"light"}>
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
                className="css-tj5bde-Svg"
              >
                <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
              </svg>
            </IndicatorContainer>
          )}
          <IndicatorSeparator />
          <IndicatorContainer>
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="css-tj5bde-Svg"
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </IndicatorContainer>
        </IndicatorsContainer>
      </Control>
      {error && <ErrorContainer>{error}</ErrorContainer>}
      {menuOpened && (
        <Menu ref={menuRef}>
          {options &&
            options
              .filter((option: SelectOption) => {
                if (removeFromMenuOnSelect) {
                  return !selectedOptions.some(
                    (selectedOption) => selectedOption.value === option.value
                  );
                }
                return true;
              })
              .map((option: SelectOption, index: number) => {
                const selected: boolean = selectedOptions.includes(option);

                const menuDisabled: boolean =
                  (maxSelections
                    ? selectedOptions.length >= maxSelections
                    : false) && !selected;

                return (
                  <MenuItem
                    key={index}
                    disabled={menuDisabled}
                    selected={selectedOptions.includes(option)}
                    onClick={() => !menuDisabled && handleOptionSelect(option)}
                  >
                    {option.label}
                  </MenuItem>
                );
              })}
        </Menu>
      )}
    </Container>
  );
};

const Container = styled.div<{ disabled: boolean }>`
  position: relative;
  width: 100%;
  max-width: 750px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
  }
`;

const Control = styled.button<{ error?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  user-select: none;
  color: ${({ theme }) => theme.colors.text.lightest};
  transition: all 0.2s;
  border: 1px solid ${({ theme }) => theme.colors.layout.darker};
  outline: none;
  border-radius: 4px;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  font-size: ${({ theme }) => theme.size.normal};

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.accent.light};
  }

  ${({ theme, error }) =>
    error &&
    `
    border: 1px solid ${theme.colors.accent.red};
  `}
`;

const ValueContainer = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
`;

const Placeholder = styled.div`
  color: ${({ theme }) => theme.colors.text.lightest};
  font-size: ${({ theme }) => theme.size.normal};
  align-self: center;
  margin-left: 10px;
`;

const IndicatorsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const IndicatorSeparator = styled.span`
  width: 1px;
  margin: 8px 0;
  background-color: ${({ theme }) => theme.colors.layout.dark};
`;

const IndicatorContainer = styled.div<{ accent?: "light" }>`
  display: flex;
  padding: 8px;
  align-items: center;
  fill: ${({ theme }) => theme.colors.text.lightest};
  transition: fill 0.2s;

  &:hover {
    ${({ theme, accent }) =>
      accent
        ? `fill: ${theme.colors.accent[accent]}`
        : `fill: ${theme.colors.text.lighter};`};
`;

const ErrorContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Menu = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  margin-top: 5px;

  background-color: ${({ theme }) => theme.colors.layout.darkest};
  border: 1px solid ${({ theme }) => theme.colors.layout.darker};
  outline: none;
  border-radius: 4px;
`;

const MenuItem = styled.div<{ selected: boolean; disabled: boolean }>`
  padding: 8px;
  cursor: pointer;
  transition: background-color, opacity 0.2s;

  ${({ theme, selected }) =>
    !selected
      ? `

    &:hover {
      background-color: ${theme.colors.layout.darker};
    }
  `
      : `
    background-color: ${theme.colors.accent.light};
    color: ${theme.colors.text.lightest};

    &:hover {
      opacity: 0.9;
    }
  `};

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      opactity: 0.5;
  `}
`;

export default DashboardSelect;
