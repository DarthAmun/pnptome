import { useCallback } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FaHome, FaMeteor } from "react-icons/fa";
import { GiBackpack } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../database/Store";
import { SystemEntity } from "../../database/SystemReducer";
import { findIcon } from "../../services/IconService";

const BreadCrumbIcon = () => {
  let location = useLocation();
  const system = useSelector((state: RootState) => state.system);
  const base = location.pathname.split("/")[1];

  const makeBreadCrumb = useCallback((): JSX.Element => {
    let RibbonElm = <></>;
    system.entities.forEach((entity: SystemEntity) => {
      switch (true) {
        case base === "":
        case base === "home":
          RibbonElm = (
            <Ribbon>
              <i>
                <span>
                  <FaHome />
                </span>
              </i>
            </Ribbon>
          );
          break;
        case base === `${entity.entityName}-detail`:
        case base === `${entity.entityName}-builder`:
          RibbonElm = (
            <Ribbon>
              <i>
                <span>{findIcon(entity.icon)}</span>
              </i>
            </Ribbon>
          );
          break;
        case base === `${entity.entityName}-overview`:
          RibbonElm = (
            <Ribbon>
              <i>
                <span>
                  {findIcon(entity.icon, 10)}
                  {findIcon(entity.icon, 20)}
                  {findIcon(entity.icon, 10)}
                </span>
              </i>
            </Ribbon>
          );
          break;
      }
    });
    return RibbonElm;
  }, [base, system]);

  return makeBreadCrumb();
};

export default BreadCrumbIcon;

const Ribbon = styled.div`
  margin: 3em;
  /* IE10 Consumer Preview */
  background-image: -ms-radial-gradient(
    center top,
    circle farthest-side,
    #f55c5c 0%,
    #c24a4a 100%
  );
  /* Mozilla Firefox */
  background-image: -moz-radial-gradient(
    center top,
    circle farthest-side,
    #f55c5c 0%,
    #c24a4a 100%
  );
  /* Opera */
  background-image: -o-radial-gradient(
    center top,
    circle farthest-side,
    #f55c5c 0%,
    #c24a4a 100%
  );
  /* Webkit (Safari/Chrome 10) */
  background-image: -webkit-gradient(
    radial,
    center top,
    0,
    center top,
    487,
    color-stop(0, #f55c5c),
    color-stop(1, #c24a4a)
  );
  /* Webkit (Chrome 11+) */
  background-image: -webkit-radial-gradient(
    center top,
    circle farthest-side,
    #f55c5c 0%,
    #c24a4a 100%
  );
  /* W3C Markup, IE10 Release Preview */
  background-image: radial-gradient(
    circle farthest-side at center top,
    #f55c5c 0%,
    #c24a4a 100%
  );
  width: 3.5em;
  height: 3em;
  position: relative;
  top: -20px;
  margin: 0px 10px 0px -10px;
  border-top-right-radius: 0.2em;
  border-top-left-radius: 0.2em;
  font-family: "Kite One", sans-serif;

  &:before {
    content: "";
    position: absolute;
    bottom: -2.4em;
    left: 0;
    width: 0;
    height: 0;
    border-top: 2.5em solid #c24a4a;
    border-right: 2.5em solid transparent;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: -2.4em;
    right: 0;
    width: 0;
    height: 0;
    border-top: 2.5em solid #c24a4a;
    border-left: 2.5em solid transparent;
  }

  & i {
    width: 90%;
    height: 160%;
    display: block;
    margin: auto;
    z-index: 100;
    position: relative;
    border-right: dashed 0.0625em #333;
    border-left: dashed 0.0625em #333;
    overflow: hidden;
  }

  & i span {
    color: #fff;
    display: block;
    text-align: center;
    top: 50%;
    margin-top: -1em;
    position: relative;
    text-shadow: 0.0625em 0.0625em 0.0625em #333;
    font-style: normal;
    font-weight: bold;
  }
`;
