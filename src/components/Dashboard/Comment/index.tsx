import React, { ReactNode } from "react";

import styled from "styled-components";

type Props = {
  title: ReactNode;
  comment: string;
  disabled?: boolean;
};

const CommentArea = styled.textarea`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text.lightest};
  background-color: ${({ theme }) => theme.colors.text.dark};
  width: calc(100% - 20px);
  resize: vertical;
`;
const Comment: React.FC<Props> = ({ title, comment, disabled }: Props) => {
  return (
    <>
      {title}
      <CommentArea disabled={disabled}>{comment}</CommentArea>
    </>
  );
};

export default Comment;
