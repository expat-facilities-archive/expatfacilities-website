import styled from "styled-components";
import router from "next/router";
import Icon from "@components/Layout/Icon";
import ROUTES from "@constants/routes";

type Column = {
  key: number;
  title: string;
  format: (data: any) => React.ReactNode;
  width: number;
  wordBreak?: boolean;
  isBold?: boolean;
  displayNoneLaptop?: boolean;
  displayNoneTablet?: boolean;
  displayNoneMobile?: boolean;
  justifyEnd?: boolean;
};

type Props = {
  header?: boolean;
  columns: Column[];
  data: any[];
  tableGap: number;
  target?: any;
  target2?: any;
  target3?: any;
};

const DashboardTable: React.FC<Props> = ({
  header,
  columns,
  data,
  tableGap,
  target,
  target2,
  target3,
}: Props) => {
  const goToDetailRow = (event: any, obj: any) => {
    if (target) {
      const path = target
        .split(".")
        .reduce((p: { [x: string]: any }, c: string | number) => p?.[c], obj);
      if (event.target.tagName.toLowerCase() !== "i") {
        if (target2) {
          const path2 = target2
            .split(".")
            .reduce(
              (p: { [x: string]: any }, c: string | number) => p?.[c],
              obj
            );
          if (target3) {
            const path3 = target3
              .split(".")
              .reduce(
                (p: { [x: string]: any }, c: string | number) => p?.[c],
                obj
              );
            path3;
            // router.push(route + "/" + path + "/" + path2 + "/" + path3);
          }
          router.push(ROUTES.DASHBOARD_TRIPS + "/" + path + "/" + path2);
        }
        router.push(ROUTES.DASHBOARD_TRIPS + "/" + path);
      }
    }
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Container tableGap={tableGap}>
      {header && columns.length > 0 && (
        <>
          <HeadTableRow gridColumns={columns}>
            {columns.map((column: Column) => (
              <HeadTableCell
                key={column.key}
                displayNoneTablet={column.displayNoneTablet}
                displayNoneMobile={column.displayNoneMobile}
                displayNoneLaptop={column.displayNoneLaptop}
                justifyEnd={column.justifyEnd}
              >
                {column.title}
              </HeadTableCell>
            ))}
          </HeadTableRow>
        </>
      )}
      {data.length > 0 &&
        data.map((row) => (
          <BodyTableRow
            disabled={ROUTES.DASHBOARD_TRIPS ? false : true}
            gridColumns={columns}
            key={row.id}
            onClick={(event) => goToDetailRow(event, row)}
          >
            {columns.map((cell: Column) => (
              <BodyTableCell
                key={cell.key}
                wordBreak={cell.wordBreak}
                isBold={cell.isBold}
                displayNoneTablet={cell.displayNoneTablet}
                displayNoneMobile={cell.displayNoneMobile}
                displayNoneLaptop={cell.displayNoneLaptop}
                justifyEnd={cell.justifyEnd}
              >
                {cell.format(row)}
              </BodyTableCell>
            ))}
          </BodyTableRow>
        ))}
    </Container>
  );
};

export const Container = styled.div<{ tableGap: number }>`
  padding: 0 15px;
  display: grid;
  grid-auto-flow: row;
  gap: ${({ tableGap }) => `${tableGap}px`};
  width: calc(100% - 15px * 2);
  font-size: ${({ theme }) => theme.size.normal};
  font-family: ${({ theme }) => theme.family.primary};
  /* @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    overflow-x: scroll;
  } */
`;

export const HeadTableRow = styled.div<{ gridColumns: Column[] }>`
  padding: 16px 32px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${({ gridColumns }) =>
    gridColumns.map((column) => `${column.width}fr `)};
  grid-template-rows: 1fr;
  gap: 0.5rem;
  align-items: center;
  cursor: default;
  font-weight: ${({ theme }) => theme.weight.bold};
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    padding: 14px 26px;
  }
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
    padding: 9px;
  }
`;

export const HeadTableCell = styled.div<{
  displayNoneTablet?: boolean;
  displayNoneMobile?: boolean;
  displayNoneLaptop?: boolean;
  justifyEnd?: boolean;
}>`
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
    justify-self: ${({ justifyEnd }) => {
      if (justifyEnd) return "end";
    }};
  }
`;

export const BodyTableRow = styled.div<{
  gridColumns: Column[];
  disabled: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  border-radius: 5px;
  padding: 16px 32px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${({ gridColumns }) =>
    gridColumns.map((column) => `${column.width}fr `)};
  grid-template-rows: 1fr;
  gap: 0.5rem;
  align-items: center;
  transition: all 0.2s;
  cursor: ${({ disabled }) => {
    if (disabled) return "default";
    else return "pointer";
  }};
  font-weight: ${({ theme }) => theme.weight.regular};
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    padding: 14px 26px;
  }
  :hover {
    border: 1px solid ${({ theme }) => theme.colors.layout.lighter};
  }
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
    padding: 9px;
  }
`;

export const BodyTableCell = styled.div<{
  wordBreak?: boolean;
  isBold?: boolean;
  displayNoneTablet?: boolean;
  displayNoneMobile?: boolean;
  displayNoneLaptop?: boolean;
  justifyEnd?: boolean;
}>`
  word-break: ${({ wordBreak }) => {
    if (wordBreak) return "break-word";
    return "none";
  }};
  font-weight: ${({ isBold }) => {
    if (isBold) return 600;
    return 400;
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
    justify-self: ${({ justifyEnd }) => {
      if (justifyEnd) return "end";
    }};
  }
`;

// icon in table
export const IconTable = styled(Icon)<{ red?: boolean }>`
  margin-left: 5px;
  padding: 3px;
  color: ${({ red }) => {
    if (red) return ({ theme }) => theme.colors.accent.red;
    else return ({ theme }) => theme.colors.text.lightest;
  }};
  cursor: pointer;
  transition: all 0.3s;
`;

export type { Column };
export default DashboardTable;
