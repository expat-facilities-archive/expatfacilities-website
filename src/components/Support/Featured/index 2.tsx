import Icon from "@components/Layout/Icon";
import styled from "styled-components";

const Featured: React.FC = () => {
  return (
    <Container>
      <Title>Bonjour,</Title>
      <Subtitle>{"Comment pouvons-nous t'aider ?"}</Subtitle>
      <FieldContainer>
        <Field
          type="text"
          id="search"
          name="search"
          placeholder="Entrez vos mots clés pour trouver des solutions"
        />
        <SearchIcon as="button" name={"search"} size={25} />
      </FieldContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: calc(${({ theme }) => theme.size.large} * 2);
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const FieldContainer = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  width: 45%;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.6);
  padding-right: 5px;
`;

const Field = styled.input`
  padding: 12px 20px;
  background-color: inherit;
  opacity: 60%;
  color: ${({ theme }) => theme.colors.text.darkest};
  border-radius: inherit;
  transition: all 0.2s;
  border: none;
  outline: none;
  width: 100%;

  &:focus {
    color: ${({ theme }) => theme.colors.text.darkest};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.darkest};
  }
`;

const SearchIcon = styled(Icon)`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default Featured;
