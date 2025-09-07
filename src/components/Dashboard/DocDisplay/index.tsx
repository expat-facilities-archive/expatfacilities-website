import React from "react";
import Icon from "@components/Layout/Icon";
import styled from "styled-components";

type Doc = {
  id: string;
  content: string;
  url?: string;
};
type Props = {
  title?: string;
  docs: Doc[];
  background?: string;
  padding?: string;
  gap?: string;
  margin?: string;
  largeDisplay: boolean;
};

const DocDisplay: React.FC<Props> = ({
  title,
  docs,
  background,
  padding,
  gap,
  margin,
  largeDisplay,
}: Props) => {
  const handleClickEventDoc = (doc: {
    id?: string;
    content: string;
    url?: string;
  }) => {
    console.info(
      `Show ${doc.content} in modal or event add url to this Doc type`
    );
  };
  return (
    <Container gap={gap}>
      {title && <Title>{title}</Title>}
      <Display
        background={background}
        padding={padding}
        margin={margin}
        largeDisplay={largeDisplay}
      >
        {docs.map((doc: Doc) => (
          <DocItem
            key={doc.id}
            bgUrl={doc.url}
            largeDisplay={largeDisplay}
            onClick={() => {
              handleClickEventDoc(doc);
            }}
          >
            {!doc.url && <DocIcon name={"file-add"} fill />}
            <DocText>{doc.content}</DocText>
          </DocItem>
        ))}
      </Display>
    </Container>
  );
};

const Container = styled.div<{ gap?: string }>`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ gap }) => gap};
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.regular};
  margin-bottom: 10px;
`;

const Display = styled.div<{
  padding?: string;
  background?: string;
  margin?: string;
  largeDisplay?: boolean;
}>`
  display: flex;
  ${({ largeDisplay }) => {
    if (largeDisplay) return LargeDisplay;
    else return SmallDisplay;
  }};
  gap: 20px;
  margin-bottom: ${({ margin }) => margin};
  background: ${({ background }) => background};
  padding: ${({ padding }) => padding};
  border-radius: 10px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    min-height: 150px;
  }
`;

const LargeDisplay = `
flex-flow: row wrap;
`;

const SmallDisplay = `
flex-flow: row nowrap;
  justify-content: space-between;
  `;

const DocItemLargeDisplay = `
width: clamp(100px, 120px + 3.5vw, 200px);
height: clamp(100px, 120px + 3.5vw, 200px);
`;

const DocItem = styled.div<{ bgUrl?: string; largeDisplay?: boolean }>`
  box-sizing: border-box;
  ${({ largeDisplay }) => {
    if (largeDisplay) return DocItemLargeDisplay;
    else return "width: calc(100% / 3 - 20px);";
  }};
  position: relative;
  background: ${({ bgUrl }) => {
    if (bgUrl) return ({ bgUrl }) => `url("${bgUrl}"), no-repeat center/ cover`;
    else return ({ theme }) => theme.colors.layout.darker;
  }};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  cursor: pointer;
  overflow: hidden;
`;
const DocIcon = styled(Icon)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text.darker};
`;

const DocText = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  text-transform: capitalize;
  height: 20px;
  background-image: linear-gradient(
    180deg,
    transparent 0%,
    ${({ theme }) => theme.colors.text.lightest} 50%
  );
  color: ${({ theme }) => theme.colors.text.dark};
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.medium};
  padding: 20px 5px 5px 5px;
`;

export default DocDisplay;
