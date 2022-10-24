import { useAppContext } from "../context/appContext";
import StatItem from "./StatsItem";
import {GiWingedEmblem, GiCardDraw ,GiClosedBarbute} from "react-icons/gi";
import Wrapper from "../assets/wrappers/StatsContainer";
const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "Win games",
      count: stats.win || 0,
      icon: <GiWingedEmblem />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Draw games",
      count: stats.draw || 0,
      icon: <GiCardDraw />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Lost games",
      count: stats.lost || 0,
      icon: <GiClosedBarbute />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
