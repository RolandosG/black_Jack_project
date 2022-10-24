import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import History from "./History";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";

const HistoriesContainer = () => {
  const {
    getHistories,
    histories,
    isLoading,
    page,
    totalHistories,
    search,
    searchStatus,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getHistories();
    // eslint-disable-next-line 
  }, [page, search, searchStatus, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (histories.length === 0) {
    return (
      <Wrapper>
        <h2>No histories to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalHistories} {histories.length > 1 ? "Histories" : "History"} Found
      </h5>
      <div className="jobs">
        {histories.map((history) => {
          return <History key={history._id} {...history} />;
        })}
      </div>

      {/* pagination buttons */}
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default HistoriesContainer;
