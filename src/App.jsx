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
      {cards.map((card) => (
        <img
          key={card.id}
          src={card.image}
          alt={card.name}
          className={String(card.id)}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </>
  );
}

function App() {
  const [cards, setCards] = useState([]);
  const [clickedOnes, setClickedOnes] = useState([]);
  const [lost , setLost] = useState(0)

  if(!localStorage.getItem("Best")){
    localStorage.setItem("Best", '0')
  }

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
  }, [lost]);

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
        // Ensure we don't push a duplicate (by id). Use id-based check
        // and await giveAnotherCard if we need a different one.
        while (newCards.some((c) => c.id === card.id)) {
          card = await giveAnotherCard(card.id);
        }
        newCards.push(card);
      }

      setCards(shuffle(newCards));
    }
    fetchCards();
  }, [clickedOnes]);

function handleClick(id) {
    if (!clickedOnes.includes(id)) {
      setClickedOnes([...clickedOnes, id]);
    } else {
      // Compare numerically
      if (Number(localStorage.getItem("Best")) < clickedOnes.length) {
        localStorage.setItem("Best", String(clickedOnes.length));
      }
      setClickedOnes([])
      setCards([])
      setLost((prev)=> prev + 1)
      alert(`You lose but try again next time`);
    }
  }

  return (
    <>
      <div className="score">
        <div className="displayScore">
          <h2>Current Score: {clickedOnes.length}</h2>
          <h2>Best Score: {localStorage.getItem("Best")}</h2>
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
