import { ReactNode } from "react";
import { Panel } from "rsuite";
import styled from "styled-components";

interface $Props {
  children: ReactNode;
  onClick?: () => void;
}
const Card = ({ children, onClick }: $Props) => {
  return (
    <CardWrapper onClick={onClick}>
      <Panel shaded>{children}</Panel>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  flex: 1 1;
  align-self: stretch;
  cursor: pointer;
  background-color: ${({ theme }) => theme.mainColor};
  border-radius: 5px;
  max-width: max-content;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.highlight};
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
`;

export const CardDivier = styled.div`
  flex: 1 1 100%;
  border-top: 1px solid var(--rs-border-primary);
`;