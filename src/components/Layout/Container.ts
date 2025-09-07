import styled from "styled-components";

const LayoutContainer = styled.div<{
  fluid?: boolean;
  solid?: boolean;
}>`
  max-width: ${(props) => {
    if (props.fluid) return "1600px";
    if (props.solid) return "1200px";
    return "1400px";
  }};
  padding: 0 15px;
  width: calc(100% - 15px * 2);
  margin: 0 auto;
`;

export default LayoutContainer;
