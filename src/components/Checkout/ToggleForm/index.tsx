import React, { ReactNode, useState } from "react";

import styled from "styled-components";

type Data = {
  id: string;
  key: number;
  title: string;
  description: string;
};
type ListInput = {
  id: string;
  title: string;
  type: string;
  linkBetween: string;
  value: string;
  placeholder: string;
  display: boolean;
};
type Props = {
  title: string;
  data: Data[];
  btnList?: ReactNode;
  listInput: ListInput[];
  checkBoxForm?: ReactNode;
  btnForm?: ReactNode;
  toggle: boolean;
};

const BoxCommand = styled.div`
  border-radius: 10px;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  color: ${({ theme }) => theme.colors.text.lightest};
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
`;
const TitleToggleForm = styled.h3`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.medium};
  cursor: default;
`;
const BoxList = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  width: 100%;
`;
const BoxItem = styled.div`
  width: calc(100% / 2 - 40px);
  border: 1px solid ${({ theme }) => theme.colors.text.lightest};
  border-radius: 10px;
  padding: 9px 12px;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    background-color: ${({ theme }) => theme.colors.layout.lighter};
  }
`;
const BoxItemTitles = styled.h4`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.regular};
`;
const BoxItemText = styled.p`
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.regular};
  color: ${({ theme }) => theme.colors.text.lightest};
`;
const BtnBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 15px;
`;
const FormElement = styled.form`
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: min(430px, 100%);
`;
const FormLabel = styled.label<{ display: boolean; focusInput: boolean }>`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.medium};
  border: 1px solid
    ${({ focusInput }) => {
      if (focusInput) return ({ theme }) => theme.colors.accent.light;
      else return ({ theme }) => theme.colors.text.lightest;
    }};
  border-radius: 10px;
  padding: 9px 12px;
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  grid-column: ${({ display }) => (display ? "auto" : "span 2")};
  cursor: text;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`;
const FormInput = styled.input`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.regular};
  transition: all 0.2s;
  border: none;
  outline: none;
  background: transparent;
`;
const ToggleForm: React.FC<Props> = ({
  title,
  data,
  btnList,
  listInput,
  btnForm,
  toggle,
  checkBoxForm,
}: Props) => {
  return (
    <BoxCommand>
      <TitleToggleForm>{title}</TitleToggleForm>
      {toggle ? (
        <>
          <FormElement>
            {listInput.length > 0 &&
              listInput.map((input: ListInput) => (
                <Form key={input.id} {...input} />
              ))}
            {checkBoxForm}
          </FormElement>
          <BtnBox>{btnForm}</BtnBox>
        </>
      ) : (
        <>
          <BoxList>
            {data.length > 0 &&
              data.map((item: Data) => (
                <BoxItem key={item.id}>
                  <BoxItemTitles>{item.title}</BoxItemTitles>
                  <BoxItemText>{item.description}</BoxItemText>
                </BoxItem>
              ))}
          </BoxList>
          <BtnBox>{btnList}</BtnBox>
        </>
      )}
    </BoxCommand>
  );
};

const Form: React.FC<ListInput> = ({
  id,
  display,
  title,
  type,
  linkBetween,
  value,
  placeholder,
}): JSX.Element => {
  const [focusInput, setFocusInput] = useState(false);
  const handleSelectedItem = () => setFocusInput(true);
  const handleBlurItem = () => setFocusInput(false);
  const [name, setName] = useState("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <>
      <FormLabel
        key={id}
        display={display}
        htmlFor={linkBetween}
        focusInput={focusInput}
      >
        {title}
        <FormInput
          type={type}
          id={linkBetween}
          name={linkBetween}
          value={value.length > 0 ? value : name}
          placeholder={placeholder}
          onFocus={handleSelectedItem}
          onBlur={handleBlurItem}
          onChange={changeHandler}
        ></FormInput>
      </FormLabel>
    </>
  );
};
export default ToggleForm;
