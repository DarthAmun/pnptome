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
  FaDragon,
  FaIdCard,
  FaRunning,
} from "react-icons/fa";
import {
  GiAngelOutfit,
  GiBackpack,
  GiBindle,
  GiBloodySword,
  GiBodySwapping,
  GiBullseye,
  GiCryoChamber,
  GiCrystalWand,
  GiDiceEightFacesEight,
  GiDna2,
  GiMagicAxe,
  GiPlagueDoctorProfile,
  GiResize,
  GiSherlockHolmes,
  GiSpellBook,
  GiSwordSpade,
  GiSwordSpin,
  GiUpgrade,
  GiWomanElfFace,
} from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import { MdRecordVoiceOver } from "react-icons/md";

export default class Icons {
  directions = new Set<string>(["east", "west"]);
}

export const findIcon = (name: string | undefined, size?: number) => {
  if (name) {
    const Icon = IconSet.get(name);
    if (Icon && size) {
      const ClonedElementWithMoreProps = cloneElement(Icon, { size: size });
      return ClonedElementWithMoreProps;
    }
    return Icon;
  }
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
  ["FaDragon", <FaDragon />],
  ["FaIdCard", <FaIdCard />],
  ["FaRunning", <FaRunning />],
  ["GiCrystalWand", <GiCrystalWand />],
  ["GiBackpack", <GiBackpack />],
  ["GiBullseye", <GiBullseye />],
  ["GiSwordSpade", <GiSwordSpade />],
  ["GiBloodySword", <GiBloodySword />],
  ["GiSwordSpin", <GiSwordSpin />],
  ["GiMagicAxe", <GiMagicAxe />],
  ["GiSherlockHolmes", <GiSherlockHolmes />],
  ["GiWomanElfFace", <GiWomanElfFace />],
  ["GiBindle", <GiBindle />],
  ["GiUpgrade", <GiUpgrade />],
  ["GiPlagueDoctorProfile", <GiPlagueDoctorProfile />],
  ["GiBodySwapping", <GiBodySwapping />],
  ["GiCryoChamber", <GiCryoChamber />],
  ["GiDna2", <GiDna2 />],
  ["GiDiceEightFacesEight", <GiDiceEightFacesEight />],
  ["GiSpellBook", <GiSpellBook />],
  ["GiResize", <GiResize />],
  ["GiAngelOutfit", <GiAngelOutfit />],
  ["IoSchool", <IoSchool />],
  ["MdRecordVoiceOver", <MdRecordVoiceOver />],
]);
