import Icon from "@components/Layout/Icon";
import styled from "styled-components";

interface Props {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

const AdressBar: React.FC<Props> = ({
  url,
  setUrl,
  isFullscreen,
  setIsFullscreen,
}: Props) => {
  return (
    <Container>
      <AdressBarIcon
        name="fullscreen"
        fill
        onClick={() => setIsFullscreen(!isFullscreen)}
      />
      <AdressBarIcon name="window" fill onClick={() => window.open(url)} />
      <Field
        value={url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUrl(e.target.value);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 30px;
  padding: 4px;
  align-items: center;
`;

const AdressBarIcon = styled(Icon)`
  cursor: pointer;
  margin-left: 15px;
  text-align: center;
  padding: 4px 6px;
  border-radius: 5px;
  transition: all 0.25s;

  :hover {
    background-color: ${({ theme }) => theme.colors.layout.darker};
  }

  :first-child {
    margin-left: 0;
  }
`;

const Field = styled.input`
  border-radius: 2px;
  outline: none;
  border: 0px solid transparent;
  padding: 0.2rem 0.5rem;
  width: 100%;
  height: 26px;
  font-size: ${({ theme }) => theme.size.small};
  color: ${({ theme }) => theme.colors.text.lighter};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  margin-left: 10px;
`;

export default AdressBar;
