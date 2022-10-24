import styled from "styled-components";

const Wrapper = styled.article`
  box-sizing: border-box;

  .title {
    text-decoration: underline;
    font-size: 28px;
  }
  .box {
    float: left;
    padding: 50px;
    display: flex;
    flex-direction: row;
  }

  .clearfix::after {
    content: "";
    clear: both;
    display: table;
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
    height: 250px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  // card flip
  .flip-card {
    background-color: transparent;
    width: 300px;
    height: 300px;
    perspective: 1000px;
  }
  
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }
  
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  
  .flip-card-front {
    background-color: white;
    color: black;
  }
  
  .flip-card-back {
    background-color: #2980b9;
    color: white;
    transform: rotateY(180deg);
  }
`;
export default Wrapper;
