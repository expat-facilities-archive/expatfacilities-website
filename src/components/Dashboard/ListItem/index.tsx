import styled from "styled-components";

type Item = {
  id: string;
  content: string;
};
type Props = {
  title: string;
  list: Item[];
};

const ListItem: React.FC<Props> = ({ title, list }: Props) => {
  return (
    <>
      <TitleTodoList>{title}</TitleTodoList>
      <UlList>
        {list.map((item: Item) => (
          <UlItem key={item.id}>{item.content}</UlItem>
        ))}
      </UlList>
    </>
  );
};

const TitleTodoList = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.regular};
  margin-bottom: 1rem;
`;

const UlList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
`;

const UlItem = styled.li`
  list-style-position: outside;
  list-style-type: circle;
  margin-left: 1rem;
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.regular};
`;

export default ListItem;
