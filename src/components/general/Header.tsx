import { useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CgMenuGridO } from "react-icons/cg";
import { FaUser, FaCogs } from "react-icons/fa";
import LogoImg from "../../logo192.png";
import { Drawer } from "rsuite";
import packageJson from "../../../package.json";
import Menu from "../pages/Menu";
import { GiBookshelf } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "../../database/Store";

const Header = () => {
  let history = useHistory();
  let location = useLocation();
  const system = useSelector((state: RootState) => state.system);
  const [showMenu, openMenu] = useState<boolean>(false);

  return (
    <HeaderBar>
      <Drawer
        size={"xs"}
        open={showMenu}
        onClose={() => openMenu(false)}
        placement={"right"}
      >
        <Drawer.Header>
          <Drawer.Title>Menu</Drawer.Title>
          <Version>v{packageJson.version}</Version>
        </Drawer.Header>
        <Drawer.Body>
          <Menu show={openMenu} />
        </Drawer.Body>
      </Drawer>

      <HeaderElm>
        <Logo src={LogoImg} />
        <Reducable>
          <System>{system.name}</System>Tome
        </Reducable>
      </HeaderElm>
      <HeaderElm right>
        <NavElm
          active={location.pathname === "/systems"}
          onClick={() => history.push("/systems")}
        >
          <GiBookshelf />
        </NavElm>
        <NavElm
          active={
            location.pathname !== "/group" &&
            location.pathname !== "/options" &&
            location.pathname !== "/systems"
          }
          onClick={() => openMenu(true)}
        >
          <CgMenuGridO />
        </NavElm>
        <NavElm
          active={location.pathname === "/group"}
          onClick={() => history.push("/group")}
        >
          <FaUser />
        </NavElm>
        <NavElm
          active={location.pathname === "/options"}
          onClick={() => history.push("/options")}
        >
          <FaCogs />
        </NavElm>
      </HeaderElm>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.div`
  width: 100%;
  height: 70px;
  padding: 10px;
  display: flex;
  gap: 10px;
  background-color: ${({ theme }) => theme.secondColor};
  color: ${({ theme }) => theme.textColor};
`;

const HeaderElm = styled.div<{ right?: boolean; reducable?: boolean }>`
  flex: 1 1;
  font-size: 30px;
  line-height: 50px;

  display: flex;
  align-items: center;
  gap: 10px;
  ${(props) =>
    props.right
      ? "justify-content: flex-end;text-align: right;min-width: 230px;"
      : ""}

  ${(props) =>
    props.reducable
      ? "@media only screen and (max-width: 500px) {display: none;}"
      : ""}
`;

const Logo = styled.img`
  margin-top: 0px;
  margin-right: 0px;
  height: 50px;
  border-radius: 50px;
`;

const Version = styled.span`
  line-height: 36px;
`;

const NavElm = styled.div<{ active?: boolean }>`
  flex: 1 1;
  max-width: 70px;
  height: 40px;
  text-align: center;
  cursor: pointer;

  ${(props) => {
    if (props.active) {
      return `color: ${props.theme.highlight}`;
    } else {
      return `color: ${props.theme.textColor}`;
    }
  }}
`;

const Reducable = styled.div`
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const System = styled.span`
  color: ${({ theme }) => theme.highlight};
`;
