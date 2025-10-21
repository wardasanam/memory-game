import React, { useState, useEffect } from 'react';
import './App.css'; // Enhanced styles from before

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  // Compute isGameWon early so it's available for useEffects
  const isGameWon = matchedPairs.length === cards.length;

  // Expanded card symbols for longer game
  const cardSymbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🐸', '🐵', '🦄', '🐙', '🐠', '🦋'];

  // Stop timer when game is won
  useEffect(() => {
    if (isGameWon && timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [isGameWon, timerId]);

  const initializeGame = () => {
    const pairs = [...cardSymbols.slice(0, 8), ...cardSymbols.slice(0, 8)]; // 16 cards (8 pairs)
    const shuffled = pairs.sort(() => Math.random() - 0.5).map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsFlipping(false);
    setMoves(0);
    setTime(0);
    if (timerId) {
      clearInterval(timerId);
    }
    const newTimerId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    setTimerId(newTimerId);
  };

  const handleCardClick = (id) => {
    if (isFlipping || matchedPairs.length === cards.length || flippedCards.includes(id) || cards[id].isMatched) {
      return;
    }

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);
    setMoves((prev) => prev + 1);
    setCards((prev) => prev.map((card, index) => (index === id ? { ...card, isFlipped: true } : card)));

    if (newFlipped.length === 2) {
      setIsFlipping(true);
      setTimeout(() => {
        const [first, second] = newFlipped;
        if (cards[first].symbol === cards[second].symbol) {
          // Match!
          setCards((prev) =>
            prev.map((card, index) =>
              index === first || index === second ? { ...card, isMatched: true } : card
            )
          );
          setMatchedPairs((prev) => [...prev, first, second]);
        } else {
          // No match, flip back
          setCards((prev) =>
            prev.map((card, index) => (index === first || index === second ? { ...card, isFlipped: false } : card))
          );
        }
        setFlippedCards([]);
        setIsFlipping(false);
      }, 1000);
    }
  };

  const renderCard = (card, id) => (
    <div
      key={id}
      className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={() => handleCardClick(id)}
    >
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{card.symbol}</div>
      </div>
    </div>
  );

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <div className="game">
        <h1>Memory Game</h1>
        <p>Ready to test your memory?</p>
        <button
          onClick={() => {
            setGameStarted(true);
            initializeGame();
          }}
          className="start-btn"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="game">
      <h1>Memory Game</h1>
      <p>
        Match all 8 pairs! Moves: <span className="moves">{moves}</span> | Time: <span className="time">{formatTime(time)}</span>
      </p>
      <div className="board">
        {cards.map((card, index) => renderCard(card, index))}
      </div>
      {isGameWon && (
        <div className="win-message">
          You won in {moves} moves and {formatTime(time)}! 🎉
        </div>
      )}
      <button onClick={initializeGame} className="reset-btn">
        New Game
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <MemoryGame />
    </div>
  );
}

export default App;