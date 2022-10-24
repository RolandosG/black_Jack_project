import styled from "styled-components";

const Wrapper = styled.section`
//#4ca1af;
.wrapper {
  background-color: transparent;
}
.body {
    font-family: "Lucida Sans Unicode";
    background-image: url("https://static.vecteezy.com/system/resources/previews/006/325/236/original/poker-table-green-cloth-on-dark-background-illustration-free-vector.jpg");
    background-size: cover; /* or contain depending on what you want */
  background-position: center center;
  background-repeat: no-repeat;
  text-align:center;
  margin:auto;
  padding:0;
  }

button {
    margin: 10px 10px;
    padding: 10px;
    width: 120px;
    //border-radius: 20px;
    border-width: thin;
  
    appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, yellow 0, red 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
  }

  .controlField{
    height: 108px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2  0px;
  }

  .controlField--wallet{
    font-size: 30px;
    
    
  }

  .controlField--wallet span{
    margin-left: 10px;
  }

  .input-bet {
    display: flex;
    width: 400px;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }

  .input-bet button{
    margin-top: 40px;
    align-items: center;

  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, yellow 0, red 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
  }

  .input-bet input{
    margin-top: 140px;
    height: 34px;
    width: 400px;
    border-radius: 10px;
    text-align: center;
    
  }

  .controlField--buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  
  
  }

  .controlField--message{
    font-size: 14px;
    color: red;
    font-weight: bold;
  }

  .controlField--message span{
    margin: 0 10px;
  }

  //Playing field styles
  .playingField {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  //Vertical line
  .vl {
border-left: 0px solid gray;
    height: 581px;
  }

  .cardContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 250px;
    margin-top: -150px;
   
  }

  .cardContainer--title {

    display: flex;
    justify-content: center;
    font-size: 15px;
    color: red;

  }

  .cardContainer--title span {
    margin-left:  5px;
  }

  .cardContainer--cards {
    display: flex;
    justify-content: center;
    //margin: auto;
    //width: 50%;
    //border: 3px solid green;
    padding: 0px;
    //margin-left: 90px;
  }

  .cardContainer--card {
    //border-color: red;
  }

  .DealercardContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: 250px;
    margin-bottom: 150px;
  }

  .DealercardContainer--title {

    display: flex;
    justify-content: center;
    font-size: 15px;
    color: red;
  }

  .DealercardContainer--title span {
    margin-left:  5px;
  }

  .DealercardContainer--cards {
    display: flex;
    justify-content: center;
    //margin: auto;
    //width: 50%;
    //border: 3px solid green;
    padding: 0px;
    //margin-left: 90px;
  }

  .DealercardContainer--card {
    //border-color: red;
  }




  //Overwrite card
  .dealercard {
    overflow:hidden;
    
    padding: 20px;
    margin: 0 4px;
    height: 160px;
    width: 90px;
  }
  .card {
    overflow:hidden;
    left: 0px;
    padding: 20px;
    margin: 0 4px;
    height: 120px;
    width: 60px;
  }

  .card .mark {
    font-size: 10px;
  }

  .card .content h1 {
    font-size: 19px;
  }

  .card .content h2 sup {
    font-size: 1px;
  }

  /* .flip-card {
    background-color: transparent;
    width: 105px;
    height: 155px;
    perspective: 1000px;
    float:left;
  } */

  /* .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.9s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  } */

  /* .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  } */

  /* .flip-card-front, .flip-card-back {
    border-radius: 5px;
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  } */

  /* .flip-card-front {
    background-color: grey;
    border-style: solid;
    //background-image: url('../images/backOfCard.png');
    color: black;
  } */

  /* .flip-card-back {
    background-color: #2980b9;
    color: white;
    transform: rotateY(180deg);
  } */
  /* .card-background {
    background-image: url('../images/backOfCard.png');
  } */




/* CSS */
.button-29 {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.input-bet button:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.input-bet button:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  transform: translateY(-2px);
}

.input-bet button:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}

button:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

button:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  transform: translateY(-2px);
}

button:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}
`;

export default Wrapper;
