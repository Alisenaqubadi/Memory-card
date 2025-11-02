import { useState, useEffect } from "react";
import {
  getTheCard,
  getTheCardById,
  shuffle,
  giveAnotherCard,
} from "./function.js";
import "./App.css";

function Cards({ cards, onCardClick }) {
  return (
    <>
      {cards.map((card, i) => (
        <img
          key={i}
          src={card.image}
          alt={card.name}
          className={card.id}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </>
  );
}

function App() {
  const [cards, setCards] = useState([]);
  const [clickedOnes, setClickedOnes] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      const newCards = [];
      for (let i = 0; i < 9; i++) {
        const card = await getTheCard();
        newCards.push(card);
      }
      setCards(newCards);
    }
    fetchCards();
  }, []);

  useEffect(() => {
    let clickedOnesLength;
    if (clickedOnes.length < 4) {
      clickedOnesLength = clickedOnes.length;
    } else {
      clickedOnesLength = 4;
    }

    async function fetchCards() {
      const newCards = [];
      for (let i = 0; i < clickedOnesLength; i++) {
        console.log(i, "running");
        const card = await getTheCardById(clickedOnes[i]);
        newCards.push(card);
      }

      for (let i = 0; i < 9 - clickedOnesLength; i++) {
        console.log(i, "running");
        let card = await getTheCard();
        if (newCards.includes(card)) {
          card = giveAnotherCard(card.id);
          newCards.push(card);
        } else {
          newCards.push(card);
        }
      }

      setCards(shuffle(newCards));
    }
    fetchCards();
  }, [clickedOnes]);

  function handleClick(id) {
    if (!clickedOnes.includes(id)) {
      setClickedOnes([...clickedOnes, id]);
      alert(`${id} was clicked and worked`);
    } else {
      alert(`${id} was clicked and didn't work`);
    }
  }

  return (
    <>
      <div className="score">
        <div className="displayScore">
          <h2>Current Score: {clickedOnes.length}</h2>
          <h2>Best Score: {0}</h2>
        </div>
      </div>
      <div className="cards">
        <div className="displayCards">
          <Cards cards={cards} onCardClick={handleClick} />
        </div>
      </div>
    </>
  );
}

export default App;
