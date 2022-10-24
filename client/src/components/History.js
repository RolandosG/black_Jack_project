import moment from "moment";
import { FaLocationArrow, FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import HistoryInfo from "./HistoryInfo";

const History = ({
  _id,
  message,
  name,
  gameLocation,
  currentBet,
  createdAt,
  status,
}) => {
  const { deleteHistory } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p>{message}</p>
        </div>
      </header>
      <div className="content">
        {/* Content center layer */}
        <div className="content-center">
          <HistoryInfo icon={FaLocationArrow()} text={gameLocation} />
          <HistoryInfo icon={FaCalendarAlt()} text={date} />
          <HistoryInfo icon={FaMoneyBill()} text={currentBet} />
          <div className={`status ${status}`}>{status}</div>
        </div>

        <div className=""></div>

        <footer>
          <div className="action">
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteHistory(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default History;
