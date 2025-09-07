import styled from "styled-components";

interface Props {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  large?: boolean;
}

const Toggle = styled(({ disabled, onChange, ...props }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return e.preventDefault();
    if (onChange) onChange(e);
  };

  return <input type="checkbox" onChange={handleChange} {...props} />;
})`
  appearance: none;
  width: ${({ large }) => (large ? "40px" : "28px")};
  height: ${({ large }) => (large ? "20px" : "14px")};
  border-radius: 99999px;
  background-color: ${({ disabled, checked, theme }) =>
    disabled
      ? theme.colors.layout.dark
      : checked
      ? theme.colors.accent.light
      : theme.colors.layout.dark};
  position: relative;
  transition: all 0.2s;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: 1px solid
    ${({ disabled, checked, theme }) =>
      disabled
        ? theme.colors.layout.dark
        : checked
        ? theme.colors.accent.light
        : theme.colors.layout.dark};

  :before {
    content: "";
    position: absolute;
    width: ${({ large }) => (large ? "18px" : "12px")};
    height: ${({ large }) => (large ? "18px" : "12px")};
    background-color: ${({ disabled, checked, theme }) =>
      disabled
        ? theme.colors.layout.dark
        : checked
        ? theme.colors.accent.light
        : theme.colors.layout.dark};
    border-radius: 10px;
    transition: all 0.2s;
    transform: translateX(
      ${({ checked, large }) => (checked ? "0" : large ? "20px" : "14px")}
    );
  }

  :after {
    content: "";
    position: absolute;
    width: ${({ large }) => (large ? "18px" : "12px")};
    height: ${({ large }) => (large ? "18px" : "12px")};
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.layout.light : theme.colors.layout.lightest};
    border-radius: 10px;
    transition: all 0.2s;
    transform: translateX(
      ${({ checked, large }) => (checked ? (large ? "20px" : "14px") : "0")}
    );
  }
`;

export default Toggle;
