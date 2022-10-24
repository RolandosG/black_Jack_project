import React from "react";
import Wrapper from "../../assets/wrappers/News";
//import ReactPlayer from "react-player";

const News = () => {
  return (
    <Wrapper>
      <div>
        <h2 className="title">News & Updates</h2>
        <div className="box">
          <div className="border">
            <article className="Updates">
              <h2 className="Date">03 July 2022</h2>
              <h5>5 Ways Blackjack has Changed</h5>
              <p>
                Much like everything in the world, blackjack has changed over
                the years. The most popular game in casinos doesn’t always offer
                the same experience or value as it used to. That doesn’t mean
                it’s no longer a popular or fun game.
              </p>
            </article>
          </div>

          <div className="border">
            <article className="Updates">
              <h2 className="Date">04 July 2023</h2>
              <h5>Is Blackjack Still Beatable?</h5>
              <p>
                There was a time when blackjack players could use their skills
                of basic strategy and card counting to move the advantage from
                the casino to themselves at casinos all around the country.
                That’s not quite the case anymore.
              </p>
            </article>
          </div>

          <div className="border">
            <article className="Updates">
              <h2 className="Date">05 July 2024</h2>
              <h5>Practice? We’re Talking About Practicing Blackjack</h5>
              <p>
                Blackjack can be a difficult game for some to become proficient
                in. Learning how to play blackjack optimally can be a little
                daunting. Blackjack and all gambling is supposed to be fun.
                There are many people who just want to walk into a casino and
                play the game without practicing or studying their hobby.
              </p>
            </article>
          </div>

          <div className="border">
            <article className="Updates">
              <h2 className="Date">14 July 2024</h2>
              <h5>This Is A Rare Way For The Dealer To Reach 18</h5>
              <p>
                We’re rarely surprised by any given hand given the number of
                hands of blackjack we play. Well, one of those very rare hands
                showed its face recently. In early June, Mandi Minx tweeted a
                picture of a unique hand. Never forget. Soft 18 the hard way.
              </p>
            </article>
          </div>
        </div>

        {/* <div class="box">
          {" "}
          <h2 class="title">Recent Update</h2>
          <ReactPlayer url="https://www.youtube.com/watch?v=xcJtL7QggTI" />
        </div> */}
      </div>
    </Wrapper>
  );
};
export default News;
