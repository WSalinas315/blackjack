import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {

  interface Card {
    value: number;
    suit: string;
  }

  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [dealerAction, setDealerAction] = useState<string>('hit');


  function createDeck() {
    let newDeck = []
    for (let i: number = 0; i < 13; i++) {
      newDeck.push({ value: i + 1, suit: 'Spade' });
      newDeck.push({ value: i + 1, suit: 'Club' });
      newDeck.push({ value: i + 1, suit: 'Diamond' });
      newDeck.push({ value: i + 1, suit: 'Heart' });
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
  }

  const hit = () => {
    let cardIndex = getRandomInt(deck.length)
    console.log("card number", cardIndex)
    let card = deck[cardIndex]
    let newDeck = deck
    newDeck.splice(cardIndex, 1)
    setDeck(newDeck)
    setPlayerHand([...playerHand, card])
    console.log("playerHand", playerHand)
    console.log("deck", deck)
  }

  const dealerHit = () => {
    let cardIndex = getRandomInt(deck.length)
    console.log("card number", cardIndex)
    let card = deck[cardIndex]
    let newDeck = deck
    newDeck.splice(cardIndex, 1)
    setDeck(newDeck)
    setDealerHand([...dealerHand, card])
    console.log("DealerHand", dealerHand)
    console.log("deck", deck)
  }

  const dealerDecision = () => {
    let dealerHandTotal: number = handSum(dealerHand)
    console.log("handSum", dealerHandTotal)
    if (dealerHandTotal < 17) {
      dealerHit()
      return "hit"
    } else {
      return "pass"
    }
  }

  const handSum = (hand: Card[]) => {
    console.log("IN  HAND SUM")
    console.log(hand)
    let sum = 0;
    for (let card of hand) {
      if (card.value > 10) {
        sum = sum + 10
      // } else if (card.value == 1) {

      // }
      } else {
        sum = sum + card.value
      }
    }
    console.log("sum", sum)
    return sum
  }
  const dealerPlays = () => {
    // let action = "hit"
    // while (action == "hit") {
    //   action = dealerDecision()
    //   console.log(action)
    // }
    while (dealerAction == "hit") {
      let action = dealerDecision()
      setDealerAction(action)
      console.log("dealerAction", dealerAction)
    }
    // let sum = handSum(dealerHand);
    // while (sum < 17) {
    //   dealerHit();
    //   sum = handSum(dealerHand);

    // }
    
    // let action = dealerDecision()
    // console.log("action", action)

  }

  return (
    <div className="App">
      Blackjack!
      
      <button onClick={newDeck}>
        new deck
      </button>
      <button onClick={hit}>
        hit
      </button>
      <div className="deck">
        {playerHand && playerHand.map((card:Card, i) => 
        {
          return (
            <div key={i}>
              {card.value} of {" "} {card.suit}s
            </div>
            )
          }
        )}
        {/* Player's Total Card Value: {handSum(playerHand)} */}
        <br/>
      <button onClick={dealerPlays}>
        Pass
      </button>
        <br/>
        <br/>
        {dealerHand && dealerHand.map((card:Card, i) => 
        {
          return (
            <div key={i}>
              {card.value} of {" "} {card.suit}s
            </div>
            )
          }
        )}
        {/* Dealer's Total Card Value: {handSum(dealerHand)} */}
      </div>
    </div>
  );
}

export default App;
