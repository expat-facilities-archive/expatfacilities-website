import styled from "styled-components";

export const FormattedContent = styled.div`
  margin-top: 60px;
  padding: 30px;
  border-radius: 10px;
  line-height: 1.5;
  text-align: justify;
  font-size: ${({ theme }) => theme.size.normal};
  word-wrap: break-word;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 0;
    padding: 30px 0;
  }

  h1 {
    font-size: ${({ theme }) => theme.size.medium};
    font-weight: ${({ theme }) => theme.weight.bold};
    padding-bottom: 15px;
  }
  h2 {
    padding-bottom: 10px;
    font-size: ${({ theme }) => theme.size.medium};
    font-weight: ${({ theme }) => theme.weight.medium};
  }

  ul {
    li {
      margin: 20px 0 20px 25px;

      &::before {
        content: "•";
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }

  br {
    content: " ";
    display: block;
    margin: 20px 0;
  }

  a {
    text-decoration: underline;
  }

  b,
  strong {
    font-weight: ${({ theme }) => theme.weight.bold};
  }

  i,
  em {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  figure figcaption {
    font-style: italic;
    color: ${({ theme }) => theme.colors.text.light};
    font-size: ${({ theme }) => theme.size.small};
  }

  img {
    max-width: 100%;
    max-height: 500px;
    border-radius: 10px;
    object-fit: cover;
    user-select: none;
    pointer-events: none;

    @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
      max-height: 300px;
    }
  }

  p {
    padding: 15px 0;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }
  }

  .has-text-align-center {
    text-align: center;
  }

  .is-content-justification-center {
    text-align: center;
  }

  .wp-block-buttons {
    display: flex;

    &.is-content-justification-center {
      justify-content: center;
    }
  }

  .wp-block-button {
    background-color: ${({ theme }) => theme.colors.accent.light};
    color: ${({ theme }) => theme.colors.accent.white};
    padding: 12px 24px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-family: ${({ theme }) => theme.family.primary};
    font-size: ${({ theme }) => theme.size.normal};
    font-weight: ${({ theme }) => theme.weight.medium};
    text-align: center;
    cursor: pointer;
    outline: none;
    border: none;
    transition: all 0.2s;
    line-height: 1;
    user-select: none;

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.accent.white};
    }

    &.is-style-outline {
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.colors.layout.lightest};
    }

    :hover {
      filter: brightness(0.8);
    }
  }
`;
