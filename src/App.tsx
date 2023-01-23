import React, { useEffect, useState } from 'react';
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
  const [winner, setWinner] = useState<string>("Push!");


  useEffect(() => {
    let dealerHandTotal: number = handSum(dealerHand)
    let playerHandTotal: number = handSum(playerHand)
    if ((dealerHandTotal > playerHandTotal || dealerHandTotal >= 17) && (phaseOfGame != "player" && phaseOfGame != "start")) {
      setPhaseOfGame("end")
      determineWinner()
    }
  })

  const determineWinner = () => {
    let dealerHandTotal: number = handSum(dealerHand)
    let playerHandTotal: number = handSum(playerHand)
    if (playerHandTotal > dealerHandTotal && playerHandTotal < 22) {
      setWinner("You Win!")
    } else if (dealerHandTotal > playerHandTotal && dealerHandTotal < 22) {
      setWinner("Dealer Wins!")
    } else if (playerHandTotal < 22 && dealerHandTotal > 21) {
      setWinner("You Win!")
    } else if (dealerHandTotal < 22 && playerHandTotal > 21) {
      setWinner("Dealer Wins!")
    }
  }

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
    setPlayerHand([])
    setDealerHand([])
    for (let i: number = 0; i < 4; i++) {
      if (i == 0 || i == 1) {
        hit()
      } else {
        dealerHit()
      }
    }
    setPhaseOfGame("player")
  }
  console.log(phaseOfGame)

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
    let playerHandTotal: number = handSum(playerHand)
    if (playerHandTotal > 21) {
      setPhaseOfGame("end")
      determineWinner()
    }
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
    let playerHandTotal: number = handSum(playerHand)
    console.log("handSum", dealerHandTotal)
    if (dealerHandTotal >= 17 || dealerHandTotal > playerHandTotal) {
      setPhaseOfGame("end")
      determineWinner()
    } else {
      dealerHit()
    }
  }

  const handSum = (hand: Card[]) => {
    let sum: number = 0;
    let aceCount: number = 0;
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
      <br />
      <br />
      {((phaseOfGame == 'new') || (phaseOfGame == 'end')) && <>
        <button onClick={newDeck}>
          new deck
        </button>
        <br />
        <button onClick={startGame}>
          start game
        </button>
      </>
      }
      <br />
      <br />
      {phaseOfGame == "player" &&
        <button onClick={hit}>
          Hit
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
        {(phaseOfGame == "player" || phaseOfGame == "dealer") &&
          <button onClick={dealerDecision}>
            Dealer Plays!
          </button>
        }
        <br />
        <b>Dealer's Hand</b>
        <br />
        {phaseOfGame == 'player' ?
          <div>
            {dealerHand[0].value} of {" "} {dealerHand[0].suit}s
            <br />
            [Hidden card]
            <br />
            Dealer's Total Card Value: ?
          </div> : <>
            {dealerHand && dealerHand.map((card: Card, i) => {
              return (
                <div key={i}>
                  {card.value} of {" "} {card.suit}s
                </div>
              )
            })}
            Dealer's Total Card Value: {handSum(dealerHand)}
            <br />
          </>
        }
        {phaseOfGame === "end" && <h2>{winner}</h2>}
      </div>
    </div>
  );
}

export default App;
