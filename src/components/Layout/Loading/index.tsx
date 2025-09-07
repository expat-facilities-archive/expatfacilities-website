import React from "react";
import styled from "styled-components";
import Spinner from "../Spinner";

type Props = {
  message?: string;
  error?: string | null;
  color?: string;
  className?: string;
};

const Loading: React.FC<Props> = ({
  message,
  error,
  color,
  className,
}: Props) => {
  return (
    <Loader className={className}>
      <Spinner color={color} size={70} />

      {error ? <Error>{error}</Error> : message && <Message>{message}</Message>}
    </Loader>
  );
};

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  user-select: none;
`;

const Message = styled.p`
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.size.tiny};
`;

const Error = styled.p`
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.accent.red};
  font-size: ${({ theme }) => theme.size.tiny};
`;

export default Loading;
