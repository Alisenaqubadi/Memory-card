import { useState, useEffect } from "react";
import { getTheCard } from "./function.js";
import "./App.css";

function UpdateCards(className){}

function Cards({ cards, onCardClick }){
  
  return (
    <>
      {cards.map((card, i) => (
        <img key={i} 
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

    useEffect(()=>{
    async function fetchCards() {
      const newCards = [];
      for (let i = 0; i < 9; i++) {
        const card = await getTheCard();
        newCards.push(card);
      }
      setCards(newCards)
    }
    fetchCards();
  },[])

  function handleClick(id){
  setClickedOnes([...clickedOnes, id]);

}

  return (
    <>
      <div className="score">
        <div className="displayScore">
          <h2>Current Score: {clickedOnes.length}</h2>
          <h2>Max Score: {0}</h2>
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
