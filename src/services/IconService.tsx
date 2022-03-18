import { cloneElement } from "react";
import {
  FaHistory,
  FaHourglassHalf,
  FaMortarPestle,
  FaUser,
  FaLink,
  FaCoins,
  FaWeightHanging,
  FaBookOpen,
  FaMeteor,
} from "react-icons/fa";
import {
  GiBackpack,
  GiBloodySword,
  GiBullseye,
  GiCrystalWand,
  GiMagicAxe,
  GiSwordSpade,
  GiSwordSpin,
} from "react-icons/gi";
import { IoSchool } from "react-icons/io5";

export default class Icons {
  directions = new Set<string>(["east", "west"]);
}

export const findIcon = (name: string, size?: number) => {
  const Icon = IconSet.get(name);
  if(Icon && size) {
    const ClonedElementWithMoreProps = cloneElement(
      Icon, 
      { size: size }
    );
    return ClonedElementWithMoreProps;
  }
  return Icon;
};

export const IconSet = new Map<string, JSX.Element>([
  ["FaHistory", <FaHistory />],
  ["FaHourglassHalf", <FaHourglassHalf />],
  ["FaMortarPestle", <FaMortarPestle />],
  ["FaUser", <FaUser />],
  ["FaLink", <FaLink />],
  ["FaCoins", <FaCoins />],
  ["FaWeightHanging", <FaWeightHanging />],
  ["FaMeteor", <FaMeteor />],
  ["FaBookOpen", <FaBookOpen />],
  ["GiCrystalWand", <GiCrystalWand />],
  ["GiBackpack", <GiBackpack />],
  ["GiBullseye", <GiBullseye />],
  ["GiSwordSpade", <GiSwordSpade />],
  ["GiBloodySword", <GiBloodySword />],
  ["GiSwordSpin", <GiSwordSpin />],
  ["GiMagicAxe", <GiMagicAxe />],
  ["IoSchool", <IoSchool />],
]);
