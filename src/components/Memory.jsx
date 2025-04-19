import React from "react";
import { use } from "react";
import { useState, useEffect } from "react";

const Style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    // backgroundColor: "#457b9d",
  },
  scorecard: {
    display: "flex",
    width: "40%",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "20px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "white",
  },
  redScore: {
    fontSize: "50px",
    width: "50%",
    backgroundColor: " #c1121f",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px 0 0 5px",
  },
  blueScore: {
    fontSize: "50px",
    width: "50%",
    backgroundColor: "#457b9d",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0 5px 5px 0",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    // width: "300px",
    // height: "300px",
    padding: "20px",
    // border: "1px solid black",
    borderRadius: "10px",
  },
  card: {
    width: "70px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // border: "1px solid black",
    margin: "10px",
    backgroundColor: "#fefae0",
    borderRadius: "5px",
    // color: "black",
    fontSize: "30px",
  },
};

const Memory = () => {
  const [redScore, setRedScore] = React.useState(0);
  const [blueScore, setBlueScore] = React.useState(0);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("red");
  const [isGameOver, setIsGameOver] = useState(false);

  function generateEmojis(pairCount) {
    const emojis = [
      "🦋",
      "🐳",
      "🌸",
      "🦄",
      "🦖",
      "🍕",
      "🍩",
      "🎈",
      "🚀",
      "🎵",
      "🐝",
      "⚽️",
      "🌞",
      "🍒",
      "🧩",
    ];
    const selectedEmojis = emojis.slice(0, pairCount);
    const cards = [...selectedEmojis, ...selectedEmojis]; // duplicate for pairs

    // Shuffle using Fisher-Yates algorithm
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
  }

  useEffect(() => {
    const emojis = generateEmojis(15);
    const cardobj = emojis.map((emoji) => {
      return {
        emoji: emoji,
        isFlipped: false,
        isMatched: false,
      };
    });
    setCards(cardobj);
  }, []);

  const handleCardClick = (card, index) => {
    if (card.isFlipped || card.isMatched) return;
    if (flippedCards.length === 2) return;
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    if (flippedCards.length === 0) {
      setFlippedCards([...flippedCards, { ...card, index }]);
    } else {
      setFlippedCards([...flippedCards, card]);
      if (flippedCards[0].emoji === card.emoji) {
        const newCards = [...cards];

        setTimeout(() => {
          newCards[index].isMatched = true;
          newCards[flippedCards[0].index].isMatched = true;
          setCards(newCards);
          if (playerTurn === "red") {
            setRedScore(redScore + 1);
          } else {
            setBlueScore(blueScore + 1);
          }
          setFlippedCards([]);
          if (redScore + 1 + blueScore + 1 === cards.length / 2) {
            setIsGameOver(true);
            setPlayerTurn("red");
          }
        }, 1000);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[index].isFlipped = false;
          newCards[flippedCards[0].index].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
          setPlayerTurn(playerTurn === "red" ? "blue" : "red");
        }, 1000);
      }
    }
  };

  return (
    <div style={{ ...Style.container }}>
      <h1 style={{ color: "white" }}>Memory Game</h1>
      <h2 style={{ color: "white" }}>Player Turn: {playerTurn}</h2>
      <div style={Style?.scorecard}>
        <span style={Style?.redScore}>{redScore}</span>
        <span style={Style?.blueScore}>{blueScore}</span>
      </div>
      {isGameOver ? (
        <div style={{ color: "white", fontSize: "30px" }}>
          Game Over!{" "}
          {redScore > blueScore
            ? "Red Player Wins!"
            : blueScore > redScore
            ? "Blue Player Wins!"
            : "It's a Tie!"}
        </div>
      ) : (
        <div
          style={{
            ...Style?.cardContainer,
            backgroundColor: playerTurn === "red" ? "#c1121f" : "#457b9d",
          }}
        >
          {cards.map((card, index) => {
            return (
              <div
                onClick={() => {
                  handleCardClick(card, index);
                }}
                key={index}
                style={{
                  ...Style?.card,
                  // display: card.isFlipped ? "none" : "block",
                  color: card.isFlipped ? "black" : "#a2d2ff",
                  backgroundColor: card.isMatched ? "transparent" : "#fefae0",
                }}
              >
                <p style={Style?.cardText}>
                  {card.isMatched || !card.isFlipped ? "" : card.emoji}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Memory;
