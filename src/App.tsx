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

useEffect(() => {

})

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
    for (let card of hand) {
      if (card.value > 10) {
        sum = sum + 10
      // } else if (card.value == 1) {

      // }
      } else {
        sum = sum + card.value
      }
    }
    console.log('sum', sum)
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
      <button onClick={dealerDecision}>
        Dealer Plays!
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
