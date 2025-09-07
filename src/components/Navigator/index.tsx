import React from "react";
import styled from "styled-components";
import AdressBar from "./AdressBar";

interface Props {
  defaultUrl: string;
}

const Navigator: React.FC<Props> = ({ defaultUrl }: Props) => {
  const [url, setUrl] = React.useState(defaultUrl);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);

  return (
    <Container fullscreen={isFullscreen}>
      <AdressBar
        url={url}
        setUrl={setUrl}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        iframeRef={iframeRef}
      />
      <Wrapper src={url} ref={iframeRef} />
    </Container>
  );
};

const Container = styled.div<{ fullscreen: boolean }>`
  width: ${({ fullscreen }) => (fullscreen ? "100vw" : "100%")};
  height: ${({ fullscreen }) =>
    fullscreen ? "calc(100vh - 30px)" : "calc(100% - 30px)"};
  ${({ fullscreen }) =>
    fullscreen &&
    "bottom: 0; top: 0; left: 0; right: 0; z-index: 9999999; position: fixed;"};
  background-color: ${({ theme }) => theme.colors.layout.darkest};
`;

const Wrapper = styled.iframe`
  background: #fff;
  width: 100%;
  height: 100%;
`;

export default Navigator;
