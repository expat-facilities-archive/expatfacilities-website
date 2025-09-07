import { IToast, ToastType } from "@typeDefs/toast";
import styled from "styled-components";
import Icon from "@components/Layout/Icon";

interface Props {
  toast: IToast;
  close: (id: number) => void;
}

const Toast: React.FC<Props> = ({
  toast: { id, message, type, duration },
  close,
}: Props) => {
  const handleClose = () => {
    close(id);
  };

  const icon = (): string => {
    switch (type) {
      case "info":
        return "information";
      case "success":
        return "check";
      case "warning":
        return "error-warning";
      case "error":
        return "error-warning";
      default:
        return "info";
    }
  };

  const title = () => {
    switch (type) {
      case "info":
        return "Information";
      case "success":
        return "Success";
      case "warning":
        return "Warning";
      case "error":
        return "Error";
      default:
        return "Information";
    }
  };

  return (
    <Container type={type}>
      <Header>
        <Icon name={icon()} />
        <Title>{title()}</Title>
        <X name={"close-circle"} fill onClick={handleClose} />
      </Header>
      <Message>{message}</Message>
      <ProgressBar duration={duration} />
    </Container>
  );
};

const Container = styled.div<{ type: ToastType }>`
  position: relative;
  pointer-events: all;
  background ${({ theme }) => theme.colors.layout.darker};
  border-radius: 10px;
  border: 1px solid rgba(168, 179, 207, 0.2);
  padding: 10px;
  margin-top: 10px;
  overflow: hidden;

  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: backInRight;

  :first-child {
    margin-top: 0;
  }

  @keyframes backInRight {
      0% {
          -webkit-transform: translateX(2000px) scale(.7);
          transform: translateX(2000px) scale(.7);
          opacity: .7
      }
      80% {
          -webkit-transform: translateX(0) scale(.7);
          transform: translateX(0) scale(.7);
          opacity: .7
      }
      to {
          -webkit-transform: scale(1);
          transform: scale(1);
          opacity: 1
      }
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  margin-left: 5px;
  font-size: ${({ theme }) => theme.size.tiny};
  font-weight: ${({ theme }) => theme.weight.semiBold};
  text-transform: uppercase;
`;

const X = styled(Icon)`
  margin-left: auto;
  cursor: pointer;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.size.small};
`;

const ProgressBar = styled.div<{ duration: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  margin-top: 10px;

  animation-duration: ${({ duration }) => duration}ms;
  animation-fill-mode: both;
  animation-name: progressBar;

  @keyframes progressBar {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
`;

export default Toast;
