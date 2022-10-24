import styled from "styled-components";

const Wrapper = styled.article`
  box-sizing: border-box;

  .title {
    text-decoration: underline;
    font-size: 28px;
  }
  .box {
    padding: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .Updates {
    font-size: 13px;
  }
  .Date {
    font-size: 16px;
    text-decoration: underline;
  }
  .border {
    border-radius: 25px;
    border: 2px solid grey;
    padding: 10px;
    width: 350px;
    margin-bottom: 20px;
    margin-left: 40px;
  }

  h2, h5{
    text-align: center;
  }

  image{
    height: 200px;
  }
`;
export default Wrapper;
