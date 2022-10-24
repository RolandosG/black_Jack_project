import styled from "styled-components";

const Wrapper = styled.article`
  #wrapper {
    width: 80%;
    margin: 100px auto 0px auto;
    padding: 0px 0px 20px 20px;
  }
  .title {
    text-decoration: underline;
    font-size: 35px;
  }
  .h2 {
    font-size: 12px;
  }
  .achievs {
    display: flex;
  }
  div.polaroid {
    border-radius: 5px;
    width: 80%;
    background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
    color: #2C3333;
  }

  img {
    border-radius: 20px;
    float: left;
    width: 250px;
    height: 250px;
    object-fit: cover;
  }

  .isNotAchieved {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }

  /* .achievementImg{
    border-radius: 20px;
    float: left;
    width: 250px;
    height: 250px;
    font-size: 180px;
    text-align: center;
    background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
  } */

  div.container {
    padding: 10px 20px;
  }

  .grow {
    transition: all 0.2s ease-in-out;
  }
  .grow:hover {
    transform: scale(1.1);
  }
  .img-with-text {
    text-align: justify;
    width: [width of img];
  }

  .img-with-text img {
    display: block;
    margin: 0 auto;
  }

  .grid {
    margin-left: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
`;
export default Wrapper;
