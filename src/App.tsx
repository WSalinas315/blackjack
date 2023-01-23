import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {

  interface Card {
    value: string;
    suit: string;
  }

  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [phaseOfGame, setPhaseOfGame] = useState<string>("new");

  useEffect(() => {

  })

  function createDeck() {
    setPhaseOfGame("new")
    let newDeck = []
    for (let i: number = 0; i < 13; i++) {
      let value: string = (i + 1).toString()
      if (i == 0 || i > 9) {
        switch (i) {
          case 10:
            value = "Jack"
            break
          case 11:
            value = "Queen"
            break
          case 12:
            value = "King"
            break
          case 0:
            value = "Ace"
            break
        }
      }
      newDeck.push({ value: value, suit: 'Spade' });
      newDeck.push({ value: value, suit: 'Club' });
      newDeck.push({ value: value, suit: 'Diamond' });
      newDeck.push({ value: value, suit: 'Heart' });
    }
    return newDeck
  }

  function getRandomInt(max: number) {
    let maxWithoutZero = max + 1
    return Math.floor(Math.random() * maxWithoutZero);
  }

  const newDeck = () => {
    let newDeck = createDeck()
    setDeck(newDeck)
    setPlayerHand([])
    setDealerHand([])
    // await new Promise(resolve => setTimeout(resolve, 5000));
  }

  const startGame = () => {
    for (let i: number = 0; i < 4; i++) {
      if (i == 0 || i == 1) {
        hit()
      } else {
        dealerHit()
      }
    }
    setPhaseOfGame("player")
  }

  const hit = () => {
    let cardIndex = getRandomInt(deck.length)
    console.log("card number", cardIndex)
    let card = deck[cardIndex]
    let newDeck = deck
    newDeck.splice(cardIndex, 1)
    setDeck([...newDeck])
    let newPlayerHand = playerHand
    newPlayerHand.push(card)
    setPlayerHand([...newPlayerHand])
    console.log("playerHand", playerHand)
    console.log("deck", deck)
  }

  const dealerHit = () => {
    let cardIndex = getRandomInt(deck.length)
    console.log("card number", cardIndex)
    let card = deck[cardIndex]
    let newDeck = deck
    newDeck.splice(cardIndex, 1)
    setDeck([...newDeck])
    let newDealerHand = dealerHand
    newDealerHand.push(card)
    setDealerHand([...newDealerHand])
    console.log("DealerHand", dealerHand)
    console.log("deck", deck)
  }

  const dealerDecision = () => {
    setPhaseOfGame("dealer")
    let dealerHandTotal: number = handSum(dealerHand)
    console.log("handSum", dealerHandTotal)
    if (dealerHandTotal < 17) {
      dealerHit()
    }
  }

  const handSum = (hand: Card[]) => {
    console.log('IN  HAND SUM')
    console.log(hand)
    let sum = 0;
    let aceCount = 0;
    for (let card of hand) {
      if (card.value == ("King") || card.value == ("Queen") || card.value == ("Jack")) {
        sum = sum + 10
      } else if (card.value == "Ace") {
        sum = sum + 11
        aceCount++
      } else {
        sum = sum + parseInt(card.value)
      }
    }
    if (sum > 21) {
      let newSum = sum
      for (let i: number = aceCount; i > 0; i--) {
        newSum -= 10
        if (newSum <= 21) {
          break;
        }
      }
      sum = newSum
    }
    return sum
  }

  return (
    <div className="App">
      Blackjack!

      <button onClick={newDeck}>
        new deck
      </button>
      <button onClick={startGame}>
        start game
      </button>
      <br />
      <br />
      {phaseOfGame == "player" &&
        <button onClick={hit}>
          hit
        </button>
      }
      <br />
      <b>Player's Hand</b>
      <div className="deck">
        {playerHand && playerHand.map((card: Card, i) => {
          return (
            <div key={i}>
              {card.value} of {" "} {card.suit}s
            </div>
          )
        }
        )}
        Player's Total Card Value: {handSum(playerHand)}
        <br />
        <br />
        {phaseOfGame == "player" &&
          <button onClick={dealerDecision}>
            Dealer Plays!
          </button>
        }
        <br />
        <b>Dealer's Hand</b>
        {dealerHand && dealerHand.map((card: Card, i) => {
          return (
            <div key={i}>
              {card.value} of {" "} {card.suit}s
            </div>
          )
        }
        )}
        <br />
        Dealer's Total Card Value: {handSum(dealerHand)}
        <br />
        {phaseOfGame === "end" && <h2>GAME OVER!</h2>}
      </div>
    </div>
  );
}

export default App;
