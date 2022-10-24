import React from "react";
import Wrapper from "../../assets/wrappers/GamePlay";
import axios from "axios";
import Card from "react-playing-card";
import { GiPointySword } from "react-icons/gi";
import { AiFillDingtalkCircle } from "react-icons/ai";

class GamePlay extends React.Component {
  //MARK: CREATE INITIAL STATE
  constructor(props) {
    super(props);

    this.state = {
      deck: [],
      dealer: null,
      player: null,
      wallet: 0,
      inputValue: "",
      currentBet: null,
      gameOver: false,
      message: null,
    };
  }

  //MARK: GENERATE THE DECK OF 52 CARDS
  generateDeck() {
    //Create list of cards
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

    //Create list of suits
    const suits = ["♦", "♣", "♥", "♠"];

    //Create a array of object deck
    const deck = [];

    //Nested loop
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        deck.push({ number: cards[i], suit: suits[j] });
      }
    }

    //deck[{number: 2, suit: "♦"}, {number: 2, suit: "♣"}, ..., {number: "A", suit: "♠"}]
    return deck;
  }

  //MARK: PREPARE CARD TO PLAYER AND DEALER
  dealCards(deck) {
    //Get the first random card for player
    const playerCard1 = this.getRandomCard(deck);

    //Get the first random card for dealer (must not be the same as first card of player)
    const dealerCard1 = this.getRandomCard(playerCard1.updatedDeck);

    //Get the second random card for player
    const playerCard2 = this.getRandomCard(dealerCard1.updatedDeck);

    //Get 2 cards to player hand
    const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];

    //Get 1 card to dealer hand
    const dealerStartingHand = [dealerCard1.randomCard, {}];

    //Create player object with array of 2 cards and point from 2 card
    const player = {
      cards: playerStartingHand,
      count: this.getCount(playerStartingHand),
    };

    //Create dealer object with array of 1 cards and point from 1 card
    const dealer = {
      cards: dealerStartingHand,
      count: this.getCount(dealerStartingHand),
    };

    //Return remaining cards (49 cards), player object, and dealer object
    return { updatedDeck: playerCard2.updatedDeck, player, dealer };
  }

  //MARK: START NEW GAME BUTTON PRESSED HANDLER
  async startNewGame(type) {
    //If the user continue the game
    if (type === "continue") {
      //Check balance
      if (this.state.wallet > 0) {
        //Regenerate deck of card if we have less than 10 cards
        const deck =
          this.state.deck.length < 10 ? this.generateDeck() : this.state.deck;

        const { updatedDeck, player, dealer } = this.dealCards(deck);

        this.setState({
          deck: updatedDeck,
          dealer: dealer,
          player: player,
          currentBet: null,
          gameOver: false,
          message: null,
        });
      }
      //Send message when balance is low
      else {
        this.setState({
          message: "Game over! You are broke! Please start a new game.",
        });
      }

      //Add game result to database
      if (
        this.state.message !==
        "Game over! You are broke! Please start a new game."
      ) {
        let currStatus = "win";

        if (
          this.state.message === "Dealer bust! You win!" ||
          this.state.message === "You win!"
        ) {
          currStatus = "win";
        }

        if (
          this.state.message === "Dealer wins..." ||
          this.state.message === "BUST!"
        ) {
          currStatus = "lost";
        }

        if (this.state.message === "Push.") {
          currStatus = "draw";
        }

        //Add history to database
        const { data } = await axios.post(
          `/api/v1/jobs`,
          {
            message: `${this.state.message}`,
            currentBet: `Bet Amount: $${this.state.currentBet}`,
            gameLocation: `${localStorage.getItem("location")}`,
            status: currStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(data);
      }

      //const { user, token, location } = data;
    }
    //If not continue
    else {
      //Get a deck of 52 cards
      const deck = this.generateDeck();

      //Got the remaining card and player, dealer object
      const { updatedDeck, player, dealer } = this.dealCards(deck);

      //Set the state: add remaining deck, dealer player object, and 100$ balance to wallet
      this.setState({
        deck: updatedDeck,
        dealer: dealer,
        player: player,
        wallet: 100,
        inputValue: "",
        currentBet: null,
        gameOver: false,
        message: null,
      });
    }
  }

  //MARK: RETURN A RANDOM CARD AND REAMING CARD IN THE DECK
  getRandomCard(deck) {
    //Create a copy of deck
    const updatedDeck = deck;

    //Get random index less than the number of remaining card
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);

    //Get random card item
    //randomCard = {number: 2, suit: "♦"}
    const randomCard = updatedDeck[randomIndex];

    //Take the random card out of deck
    updatedDeck.splice(randomIndex, 1);

    //Return a random card and deck
    return { randomCard, updatedDeck };
  }

  //MARK: PLACED BET BUTTON PRESSED HANDLER
  placeBet() {
    //Get input from place bet
    const currentBet = this.state.inputValue;

    //Check if user bet more than their balance
    if (currentBet > this.state.wallet || currentBet < 0) {
      this.setState({ message: "Insufficient funds to bet that amount." });
    }
    //Check if user input invalid value
    else if (currentBet % 1 !== 0) {
      this.setState({ message: "Please bet whole numbers only." });
    }
    //Input valid
    else {
      // Deduct current bet from wallet
      const wallet = this.state.wallet - currentBet;
      this.setState({ wallet: wallet, inputValue: "", currentBet: currentBet });
    }
  }

  //MARK: HIT A CARD BUTTON PRESSED HANDLER
  hit() {
    //Check if the game is not over
    if (!this.state.gameOver) {
      //Check if the currentBet is valid
      if (this.state.currentBet) {
        const { randomCard, updatedDeck } = this.getRandomCard(this.state.deck);
        const player = this.state.player;
        player.cards.push(randomCard);
        player.count = this.getCount(player.cards);

        //
        if (player.count > 21) {
          this.setState({ player, gameOver: true, message: "BUST!" });
        } else {
          this.setState({ deck: updatedDeck, player });
        }
      } else {
        this.setState({ message: "Please place bet." });
      }
    } else {
      this.setState({ message: "Game over! Please start a new game." });
    }
  }

  dealerDraw(dealer, deck) {
    const { randomCard, updatedDeck } = this.getRandomCard(deck);
    dealer.cards.push(randomCard);
    dealer.count = this.getCount(dealer.cards);
    return { dealer, updatedDeck };
  }

  //MARK: COUNT POINT FROM AN ARRAY OF CARD
  //[{number: 10, suit: "♦"}, {number: "A", suit: "♥"}]
  //Return: 21 - number
  getCount(cards) {
    const rearranged = [];
    cards.forEach((card) => {
      if (card.number === "A") {
        rearranged.push(card);
      } else if (card.number) {
        rearranged.unshift(card);
      }

      // (card.number === 'A') ? rearranged.push(card) : rearranged.unshift(card);
    });

    return rearranged.reduce((total, card) => {
      if (card.number === "J" || card.number === "Q" || card.number === "K") {
        return total + 10;
      } else if (card.number === "A") {
        return total + 11 <= 21 ? total + 11 : total + 1;
      } else {
        return total + card.number;
      }
    }, 0);
  }

  stand() {
    if (!this.state.gameOver) {
      // Show dealer's 2nd card
      const randomCard = this.getRandomCard(this.state.deck);
      let deck = randomCard.updatedDeck;
      let dealer = this.state.dealer;
      dealer.cards.pop();
      dealer.cards.push(randomCard.randomCard);
      dealer.count = this.getCount(dealer.cards);

      // Keep drawing cards until count is 17 or more
      while (dealer.count < 17) {
        const draw = this.dealerDraw(dealer, deck);
        dealer = draw.dealer;
        deck = draw.updatedDeck;
      }

      if (dealer.count > 21) {
        this.setState({
          deck,
          dealer,
          wallet: this.state.wallet + this.state.currentBet * 2,
          gameOver: true,
          message: "Dealer bust! You win!",
        });
      } else {
        const winner = this.getWinner(dealer, this.state.player);
        let wallet = this.state.wallet;
        let message;

        if (winner === "dealer") {
          message = "Dealer wins...";
        } else if (winner === "player") {
          wallet += this.state.currentBet * 2;
          message = "You win!";
        } else {
          wallet += this.state.currentBet;
          message = "Push.";
        }

        this.setState({
          deck,
          dealer,
          wallet,
          gameOver: true,
          message,
        });
      }
    } else {
      this.setState({ message: "Game over! Please start a new game." });
    }
  }

  getWinner(dealer, player) {
    if (dealer.count > player.count) {
      return "dealer";
    } else if (dealer.count < player.count) {
      return "player";
    } else {
      return "push";
    }
  }

  //MARK: GET THE INPUT FROM PLACED BET
  inputChange(e) {
    const inputValue = +e.target.value;
    this.setState({ inputValue });
  }

  handleKeyDown(e) {
    const enter = 13;

    if (e.keyCode === enter) {
      this.placeBet();
    }
  }

  componentWillMount() {
    this.startNewGame();
    const body = document.querySelector("body");
    body.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  //Render The GamePlay Pages
  render() {
    return (
      <Wrapper>
        <div className="body">
          <div className="controlField">
            <div className="controlField--wallet">
              <p>
                Your Balance: <span>${this.state.wallet}</span>
              </p>
            </div>

            {!this.state.currentBet ? (
              <div className="input-bet">
                <form>
                  <input
                    type="number"
                    name="bet"
                    placeholder=""
                    value={this.state.inputValue}
                    onChange={this.inputChange.bind(this)}
                  />
                </form>
                <button
                  onClick={() => {
                    this.placeBet();
                  }}
                >
                  Place Bet
                </button>
              </div>
            ) : null}

            {this.state.currentBet ? (
              <div className="controlField--buttons">
                <button
                  onClick={() => {
                    this.startNewGame();
                  }}
                >
                  New Game
                </button>
                <button
                  onClick={() => {
                    this.hit();
                  }}
                >
                  Hit
                </button>
                <button
                  onClick={() => {
                    this.stand();
                  }}
                >
                  Stand
                </button>

                {this.state.gameOver ? (
                  <button
                    onClick={() => {
                      this.startNewGame("continue");
                    }}
                  >
                    Continue
                  </button>
                ) : null}
              </div>
            ) : null}

            <div className="controlField--message">
              <p>
                <span>
                  <AiFillDingtalkCircle />
                </span>{" "}
                {this.state.message}{" "}
                <span>
                  <AiFillDingtalkCircle />
                </span>
              </p>
            </div>
          </div>

          {/* Display cards when user placed bet */}
          {this.state.currentBet ? (
            <div className="playingField">
              <div className="cardContainer">
                <div className="cardContainer--title">
                  <p>
                    Your Hand{" "}
                    <span>
                      <GiPointySword /> {this.state.player.count}{" "}
                      <GiPointySword />
                    </span>
                  </p>
                </div>

                <div className="cardContainer--cards">
                  {this.state.player.cards.map((card, i) => {
                    return (
                      <div key={i} className="cardContainer--card">
                        <CardComponent number={card.number} suit={card.suit} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="vl"></div>

              <div className="DealercardContainer">
                <div className="DealercardContainer--title">
                  <p>
                    Dealer's Hand{" "}
                    <span>
                      <GiPointySword /> {this.state.dealer.count}{" "}
                      <GiPointySword />
                    </span>
                  </p>
                </div>
                <div className="DealercardContainer--cards">
                  {this.state.dealer.cards.map((card, i) => {
                    return (
                      <div key={i} className="DealercardContainer--card">
                        <CardComponent number={card.number} suit={card.suit} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Wrapper>
    );
  }
}

//MARK: RENDER SINGLE CARD (RECEIVE THE NUMBER AND SUIT)
const CardComponent = ({ number, suit }) => {
  let newNumber = "";
  let newSuit = "";

  if (number === 10) {
    newNumber = "T";
  } else {
    newNumber = number;
  }

  if (suit === "♦") {
    newSuit = "D";
  } else if (suit === "♣") {
    newSuit = "S";
  } else if (suit === "♥") {
    newSuit = "H";
  } else if (suit === "♠") {
    newSuit = "C";
  } else {
    newSuit = "";
  }

  return <Card rank={newNumber} suit={newSuit} />;
};

export default GamePlay;
