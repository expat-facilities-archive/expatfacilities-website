import styled from "styled-components";

type Column = {
  key: number;
  title: React.ReactNode;
  format: (data: any) => React.ReactNode;
  width: number;
  wordBreak?: boolean;
  isBold?: boolean;
  displayNoneLaptop?: boolean;
  displayNoneTablet?: boolean;
  displayNoneMobile?: boolean;
  alignEndMobile?: boolean;
};

type Props = {
  columns: Column[];
  data: any[];
  tableGap: number;
};

const TableList: React.FC<Props> = ({ columns, data, tableGap }: Props) => {
  return (
    <Container tableGap={tableGap}>
      {data.length > 0 &&
        data.map((row) => (
          <BodyTableRow gridColumns={columns} key={row.id}>
            {columns.map((cell: Column) => (
              <BodyTableCell
                key={cell.key}
                wordBreak={cell.wordBreak}
                isBold={cell.isBold}
                displayNoneTablet={cell.displayNoneTablet}
                displayNoneMobile={cell.displayNoneMobile}
                displayNoneLaptop={cell.displayNoneLaptop}
                alignEndMobile={cell.alignEndMobile}
              >
                {cell.title}
                {cell.format(row)}
              </BodyTableCell>
            ))}
          </BodyTableRow>
        ))}
    </Container>
  );
};

export const Container = styled.div<{ tableGap: number }>`
  display: grid;
  grid-auto-flow: row;
  gap: ${({ tableGap }) => `${tableGap}px`};
  font-size: ${({ theme }) => theme.size.normal};
  font-family: ${({ theme }) => theme.family.primary};
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    overflow-x: scroll;
  }
`;
export const BodyTableRow = styled.div<{
  gridColumns: Column[];
}>`
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  border-radius: 10px;
  padding: 12px;
  display: grid;
  grid-auto-flow: column;

  @media (min-width: ${({ theme }) => theme.breakpoint.laptop}) {
    grid-template-columns: ${({ gridColumns }) =>
      gridColumns.map((column) => `${column.width}fr `)};
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    grid-template-columns: ${({ gridColumns }) =>
      gridColumns.map((column) => {
        if (column.displayNoneLaptop) {
          return "";
        } else {
          return `${column.width}fr `;
        }
      })};
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-columns: ${({ gridColumns }) =>
      gridColumns.map((column) => {
        if (column.displayNoneTablet || column.displayNoneLaptop) {
          return "";
        } else {
          return `${column.width}fr `;
        }
      })};
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    grid-template-columns: ${({ gridColumns }) =>
      gridColumns.map((column) => {
        if (
          column.displayNoneMobile ||
          column.displayNoneTablet ||
          column.displayNoneLaptop
        ) {
          return "";
        } else {
          return `${column.width}fr `;
        }
      })};
  }
  gap: 0.5rem;
  align-items: center;
  transition: all 0.2s;
  font-weight: ${({ theme }) => theme.weight.regular};
`;
export const BodyTableCell = styled.div<{
  wordBreak?: boolean;
  isBold?: boolean;
  displayNoneTablet?: boolean;
  displayNoneMobile?: boolean;
  displayNoneLaptop?: boolean;
  alignEndMobile?: boolean;
}>`
  display: flex;
  flex-flow: column nowrap;
  word-break: ${({ wordBreak }) => {
    if (wordBreak) return "break-word";
    return "none";
  }};
  font-weight: ${({ isBold, theme }) => {
    if (isBold) return theme.weight.bold;
    return theme.weight.regular;
  }};
  color: ${({ theme }) => theme.colors.text.lightest};
  :last-child {
    justify-self: end;
    text-align: end;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    display: ${({ displayNoneLaptop }) => {
      if (displayNoneLaptop) return "none";
    }};
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    display: ${({ displayNoneTablet }) => {
      if (displayNoneTablet) return "none";
    }};
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    display: ${({ displayNoneMobile }) => {
      if (displayNoneMobile) return "none";
    }};
    align-items: ${({ alignEndMobile }) => {
      if (alignEndMobile) return "end";
    }};
  }
`;

export type { Column };
export default TableList;
