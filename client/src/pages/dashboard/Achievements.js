import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/Achievements";
import { useAppContext } from "../../context/appContext";

const Achievements = () => {
  const { showStats, stats, achievementResult } = useAppContext();
  let achievement1 = false;
  let achievement2 = false;
  let achievement3 = false;
  let achievement4 = false;
  let achievement5 = false;
  let achievement6 = false;

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);

  if (stats.win >= 10) {
    achievement1 = true;
  }

  if (stats.win >= 20) {
    achievement2 = true;
  }

  if (stats.draw >= 1) {
    achievement3 = true;
  }

  if (achievementResult.isAchievedBet) {
    achievement4 = true;
  }

  if (achievementResult.totalWin >= 500) {
    achievement5 = true;
  }

  if (achievementResult.totalWin >= 1000) {
    achievement6 = true;
  }

  return (
    <Wrapper>
      <h1 className="title">Achievements</h1>
      <div className="grid">
        <div className="grow">
          <div className="polaroid">
            <p>Win a game with $100 bet</p>
            <img
              className={achievement4 ? "" : "isNotAchieved"}
              src="https://img.freepik.com/premium-photo/achievement-badge-with-star-3d-vector-icon-isolated-white_202497-1457.jpg?w=2000"
              alt="achievement 1"
            />
          </div>
        </div>

        <div className="grow">
          <div className="polaroid">
            <p>Win 10 games {achievement1 ? "(10/10)" : `(${stats.win}/10)`}</p>
            <img
              className={achievement1 ? "" : "isNotAchieved"}
              src="https://i.pinimg.com/originals/c7/80/5e/c7805ee9aa1a16baaa33a7b1be2f220e.png"
              alt="achievement 1"
            />
          </div>
        </div>

        <div className="grow">
          <div className="polaroid">
            <p>Win $500 {achievement5 ? "(500/500)" : `(${achievementResult.totalWin}/500)`}</p>
            <img
              className={achievement5 ? "" : "isNotAchieved"}
              src="https://img.freepik.com/premium-photo/achievement-badge-with-star-3d-vector-icon-isolated-white_202497-1457.jpg?w=2000"
              alt="achievement 1"
            />
          </div>
        </div>

        <div className="grow">
          <div className="polaroid">
            <p>Win $1000 {achievement6 ? "(1000/1000)" : `(${achievementResult.totalWin}/1000)`}</p>
            <img
              className={achievement6 ? "" : "isNotAchieved"}
              src="https://i.pinimg.com/originals/c7/80/5e/c7805ee9aa1a16baaa33a7b1be2f220e.png"
              alt="achievement 1"
            />
          </div>
        </div>

        <div className="grow">
          <div className="polaroid">
            <p>Win 20 games {achievement2 ? "(20/20)" : `(${stats.win}/20)`}</p>
            <img
              className={achievement2 ? "" : "isNotAchieved"}
              src="https://i.pinimg.com/originals/c7/80/5e/c7805ee9aa1a16baaa33a7b1be2f220e.png"
              alt="achievement 1"
            />
          </div>
        </div>

        <div className="grow">
          <div className="polaroid">
            <p>Tie the dealer</p>
            <img
              className={achievement3 ? "" : "isNotAchieved"}
              src="https://i.pinimg.com/originals/c7/80/5e/c7805ee9aa1a16baaa33a7b1be2f220e.png"
              alt="achievement 1"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Achievements;
