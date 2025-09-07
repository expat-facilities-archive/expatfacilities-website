import useBreakpoint from "@hooks/useBreakpoint";
import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Drawer from "../Drawer";

interface Props {
  active: boolean;
  onClickOutside?: () => void;
  onEnterKeyPress?: () => void;
  children?: React.ReactNode;
}

const ModalComponent: React.FC<Props> = ({
  active,
  children,
  onClickOutside,
  onEnterKeyPress,
}: Props) => {
  const { isMobile } = useBreakpoint();

  const [modalElement, setModalElement] = React.useState<HTMLElement | null>(
    null
  );

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClickOutside && onClickOutside();
    }
  };

  const handleEnter = React.useCallback(
    (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        onEnterKeyPress && onEnterKeyPress();
      }
    },
    [onEnterKeyPress]
  );

  React.useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    setModalElement(document.getElementById("__modals"));

    // handle on enter keypress and remove on unmount
    if (active && onEnterKeyPress) {
      document.addEventListener("keydown", handleEnter, false);
    }

    return () => {
      document.removeEventListener("keydown", handleEnter, false);
    };
  }, [active, handleEnter, onEnterKeyPress]);

  if (!modalElement) return null;

  if (isMobile && active) {
    return (
      <Drawer show={active} onDismiss={onClickOutside}>
        {children}
      </Drawer>
    );
  }
  return createPortal(
    active ? (
      <ModalWrapper onClick={handleWrapperClick}>
        <ModalContainer>
          <ModalOverflow>{children}</ModalOverflow>
        </ModalContainer>
      </ModalWrapper>
    ) : null,
    modalElement
  );
};

const ModalWrapper = styled.div`
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
  width: 420px;
  max-height: 80vh;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  color: ${({ theme }) => theme.colors.layout.lightest};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.layout.light};
  overflow: hidden;
  overflow-y: auto;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: backInDown;

  @keyframes backInDown {
    0% {
      transform: translateY(-1200px) scale(0.7);
      opacity: 0.7;
    }
    80% {
      transform: translateY(0) scale(0.7);
      opacity: 0.7;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ModalOverflow = styled.div`
  overflow: auto;
  display: block;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ModalHeader = styled.header`
  padding: 15px 5px;
  text-align: center;
  text-transform: uppercase;
`;

const ModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const ModalSubtitle = styled.p`
  margin-top: 5px;
  font-size: ${({ theme }) => theme.size.medium};
  color: ${({ theme }) => theme.colors.layout.light};
`;

const ModalActions = styled.footer`
  position: sticky;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.layout.light};
  display: flex;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  overflow: hidden;
`;

const ModalAction = styled((props) => <button type="button" {...props} />)<{
  disabled?: boolean;
}>`
  color: ${({ theme }) => theme.colors.text.lightest};
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.size.small};
  outline: none;
  padding: 20px 0;
  margin: 0;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.2s;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${({ theme }) => theme.colors.layout.light};

  ${({ theme, disabled }) =>
    disabled &&
    `
    color: ${theme.colors.layout.light};
    background-color: ${theme.colors.layout.darkest};
    cursor: not-allowed;
  `}

  :first-child {
    border-left: none;
    color: ${({ theme }) => theme.colors.text.light};
  }

  :hover {
    ${({ disabled, theme }) =>
      !disabled &&
      `
      background-color: ${theme.colors.layout.darker};
      color: ${theme.colors.text.lightest};
    `}
  }
`;

const ModalInset = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.layout.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.layout.light};
  background-color: ${({ theme }) => theme.colors.layout.darker};
  margin: 0 -20px;
`;

const Modal = {
  Modal: ModalComponent,
  Body: ModalBody,
  Header: ModalHeader,
  Title: ModalTitle,
  Subtitle: ModalSubtitle,
  Actions: ModalActions,
  Action: ModalAction,
  Inset: ModalInset,
};

export default Modal;
