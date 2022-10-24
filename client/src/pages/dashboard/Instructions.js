import React from "react";
import ReactPlayer from "react-player";
import Wrapper from "../../assets/wrappers/Instructions";

const instructions = () => {
  return (
    <Wrapper>
      <div>
        <h2>THE PACK</h2>
        <p>
          The standard 52-card pack is used, but in most casinos several decks
          of cards are shuffled together. The six-deck game (312 cards) is the
          most popular. In addition, the dealer uses a blank plastic card, which
          is never dealt, but is placed toward the bottom of the pack to
          indicate when it will be time for the cards to be reshuffled. When
          four or more decks are used, they are dealt from a shoe (a box that
          allows the dealer to remove cards one at a time, face down, without
          actually holding one or more packs).
        </p>

        <h2>THE SHUFFLE AND CUT</h2>

        <p>
          The dealer thoroughly shuffles portions of the pack until all the
          cards have been mixed and combined. The dealer designates one of the
          players to cut, and the plastic insert card is placed so that the last
          60 to 75 cards or so will not be used. (Not dealing to the bottom of
          all the cards makes it more difficult for professional card counters
          to operate effectively.)
        </p>

        <h2>THE DEAL</h2>

        <p>
          When all the players have placed their bets, the dealer gives one card
          face up to each player in rotation clockwise, and then one card face
          up to themselves. Another round of cards is then dealt face up to each
          player, but the dealer takes the second card face down. Thus, each
          player except the dealer receives two cards face up, and the dealer
          receives one card face up and one card face down. (In some games,
          played with only one deck, the players' cards are dealt face down and
          they get to hold them. Today, however, virtually all Blackjack games
          feature the players' cards dealt face up on the condition that no
          player may touch any cards.)
        </p>
        <h2>In-Depth Video</h2>
        <div>
          <ReactPlayer url="https://www.youtube.com/watch?v=PljDuynF-j0" />
        </div>
      </div>
    </Wrapper>
  );
};
export default instructions;
