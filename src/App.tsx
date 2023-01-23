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
  const [dealerAction, setDealerAction] = useState<string>('hit');

  useEffect(() => {

  })

  function createDeck() {
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
      console.log('sum is more than 21', sum)
      let newSum = sum
      for (let i: number = aceCount; i > 0; i--) {
        console.log('ace being counted')
        newSum -= 10
        console.log('newSum is', newSum)
        if (newSum <= 21) {
          break;
        }
      }
      sum = newSum
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
        <button onClick={dealerDecision}>
          Dealer Plays!
        </button>
        <br />
        <br />
        {dealerHand && dealerHand.map((card: Card, i) => {
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
