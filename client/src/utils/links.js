import { IoBarChartSharp } from "react-icons/io5";
import { IoLogoGameControllerB } from "react-icons/io";
import { AiOutlineHistory } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsNewspaper } from "react-icons/bs";
import { HiBookOpen } from "react-icons/hi";
import { GiLaurelsTrophy } from "react-icons/gi";

const links = [
  {
    id: 1,
    text: "Stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Game Play",
    path: "game-play",
    icon: <IoLogoGameControllerB />,
  },
  {
    id: 3,
    text: "Game History",
    path: "game-history",
    icon: <AiOutlineHistory />,
  },
  {
    id: 4,
    text: "News & Updates",
    path: "News",
    icon: <BsNewspaper />,
  },
  {
    id: 5,
    text: "Profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    id: 6,
    text: "Instructions",
    path: "instructions",
    icon: <HiBookOpen/>
  },
  {
    id: 7,
    text: "Achievements",
    path: "achievements",
    icon: <GiLaurelsTrophy/>
  }
];

export default links;
