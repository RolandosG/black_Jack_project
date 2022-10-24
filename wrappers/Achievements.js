import styled from "styled-components";

const Wrapper = styled.article`
#wrapper {
  width: 80%;
  margin: 100px auto 0px auto;
  padding: 0px 0px 20px 20px;
}
body 
  { 
    margin: 0px 0px 0px 0px;
           padding: 0px 0px 0px 0px;
    height: 50%;
    width: 100 %;
    background-image: linear-gradient(white, black);
    margin: 0px;
  }
  .title
  {
    text-decoration: underline;
    font-size: 35px;
  }
  .h2
  {
    font-size: 12px;
  }
  .achievs
  {
    display: flex;
  }
  div.polaroid {
    border-radius: 5px;
    width: 80%;
    //height: 16%;
    background-image: linear-gradient(white, red);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  
  img {
    border-radius: 20px;
    filter: invert(1); // this inverts the image if the achievement isn't complete
    float: left;
    width: 250px;
    height: 250px;
    object-fit: cover;
  }
  
  div.container {
    
    padding: 10px 20px;
  }

.grow { transition: all .2s ease-in-out;}
.grow:hover { transform: scale(1.1); }
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
