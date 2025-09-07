import useTranslation from "@hooks/useTranslation";
import capitalize from "@utils/capitalize";
import React, { ReactNode } from "react";

import styled from "styled-components";

type GroupInput = {
  left: ReactNode[];
  right: ReactNode[];
};

interface Props {
  group?: GroupInput;
  pattern?: RegExp;
  errors?: any;
  setErrors?: React.Dispatch<React.SetStateAction<any>>;
  error?: string;
  children?: ReactNode;
  required?: boolean;
  [key: string]: any;
}

const Field: React.FC<Props> = ({
  group,
  pattern,
  error,
  errors,
  setErrors,
  children,
  required,
  ...rest
}: Props) => {
  const { t: tError } = useTranslation("error");
  React.useEffect(() => {
    if (setErrors && errors && !errors[rest.name] && required && !rest.value) {
      setErrors({
        ...errors,
        [rest.name]: tError("auth.empty", [rest.name]),
      });
    }
  }, [errors, required, rest, setErrors, tError]);

  const handleChange = (event: any) => {
    if (errors && setErrors) {
      if (pattern) {
        const regExPattern = new RegExp(pattern);
        if (!regExPattern.test(event.target.value)) {
          setErrors({
            ...errors,
            [rest.name]: capitalize(tError("auth.invalid", [rest.name])),
          });
        } else {
          delete errors[rest.name];
          setErrors(errors);
        }
      } else {
        delete errors[rest.name];
        setErrors(errors);
      }
    }
    if (rest.onChange) rest.onChange(event);
  };

  const hasError: boolean =
    error === tError("auth.empty", [rest.name]) ? false : true;

  return (
    <>
      {!children ? (
        group ? (
          <GroupInputContainer group={group}>
            {group?.left}
            <Container
              {...rest}
              onChange={handleChange}
              error={hasError ? error : undefined}
            />
            {group?.right}
          </GroupInputContainer>
        ) : (
          <Container
            {...rest}
            onChange={handleChange}
            error={hasError ? error : undefined}
          />
        )
      ) : (
        children
      )}
      {hasError && <Error>{error}</Error>}
    </>
  );
};

export const Error = styled.p`
  color: ${({ theme }) => theme.colors.layout.lighter};
  margin-top: 5px;
  font-size: ${({ theme }) => theme.size.tiny};
  color: ${({ theme }) => theme.colors.accent.red} !important;
`;

export const GroupInputContainer = styled.div<{
  group: GroupInput;
}>`
  width: 100%;
  display: flex;
  align-items: stretch;

  ${({ group }) => {
    if (group) {
      if (group.left) {
        return `
          input {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }

          button {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        `;
      }
      if (group.right) {
        return `
          input {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          button {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        `;
      }
    }
    return "";
  }}
`;

export const Container = styled.input<{ error?: string }>`
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  color: ${({ theme }) => theme.colors.text.lightest};
  transition: all 0.2s;
  border: 1px solid ${({ theme }) => theme.colors.layout.dark};
  outline: none;
  border-radius: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.size.normal};

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.accent.light};
    color: ${({ theme }) => theme.colors.text.lightest};
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
  }

  ${({ error, theme }) =>
    error &&
    `
    border: 1px solid ${theme.colors.accent.red} !important;
    color: ${theme.colors.accent.red} !important;
  `}
`;

export default Field;
