import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Group } from "../../database/GroupReducer";
import { RootState } from "../../database/Store";
import { setSystem } from "../../database/SystemReducer";
import Chat from "./Chat";
import Header from "./Header";

interface $Props {
  children: ReactNode;
}

const AppWrapper = ({ children }: $Props) => {
  const dispatch = useDispatch();
  const liveGroup: Group = useSelector((state: RootState) => state.group);

  useEffect(() => {
    const system = localStorage.getItem("system");
    if (system) {
      dispatch(setSystem(JSON.parse(system)));
    }
  }, []);

  return (
    <App>
      <Header />
      <ContentWrapper>
        <Content>{children}</Content>
        {liveGroup && liveGroup.id !== -1 && (<Chat />)}
      </ContentWrapper>
    </App>
  );
};

export default AppWrapper;

const App = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.mainColor};
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  align-content: stretch;
`;

const Content = styled.div`
  width: calc(100% - 20px - 50px);
  height: 100%;
  padding: 10px;
`;
