import React from "react";
import styled from "styled-components";
import Button from "@components/Layout/Button";
import Icon from "@components/Layout/Icon";

interface Props {
  data: {
    Title: string;
    Text: string;
    Btn1Text: string;
    Btn2Text: string;
  };
}

const Popup: React.FC<Props> = ({
  data: { Title, Text, Btn1Text, Btn2Text },
}: Props) => {
  return (
    <Modal>
      <ModalOverlay />

      <ModalContent>
        <ModalImage
          draggable={false}
          src="/static/images/dashboard/plane.svg"
        />

        <ModalTitle>{Title}</ModalTitle>
        <ModalText>{Text}</ModalText>
        <ModalButtonGroup>
          <ModalButton> {Btn1Text} </ModalButton>
          <ModalButton prefix={<CloseIcon name={"close"} size={18} />}>
            {Btn2Text}
          </ModalButton>
        </ModalButtonGroup>
      </ModalContent>
    </Modal>
  );
};

const Modal = styled.div``;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  box-sizing: border-box;

  background-color: rgba(0, 0, 0, 0.754);
`;

const ModalContent = styled.div`
  width: 850px;
  min-height: 735px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  padding: 40px 20px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 50px;
  position: absolute;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  z-index: 10000;
  top: 50%;
  left: 50%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.144);
  transform: translate(-50%, -50%);
`;

const ModalImage = styled.img`
  max-width: 100%;
  position: relative;
  right: 50px;
  box-sizing: border-box;
`;

const ModalTitle = styled.h2`
  font-weight: ${({ theme }) => theme.weight.bold};
  max-width: 15ch;
  margin-bottom: 80px;
  font-size: ${({ theme }) => theme.size.extraTitle};
  box-sizing: border-box;
`;
const ModalText = styled.p`
  max-width: 40ch;
  font-size: ${({ theme }) => theme.size.large};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.light};
  margin-bottom: 60px;
`;

const ModalButtonGroup = styled.div``;

const ModalButton = styled(Button)`
  box-sizing: border-box;
  padding: 20px;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.size.medium};
  margin: 0 auto 29px;
  display: flex;
  gap: 20px;
  font-weight: ${({ theme }) => theme.weight.bold};
  :nth-child(2) {
    background-color: ${({ theme }) => theme.colors.layout.dark};
  }
`;

const CloseIcon = styled(Icon)`
  box-sizing: border-box;
`;

export default Popup;
