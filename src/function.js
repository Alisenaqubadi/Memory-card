function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getTheCard() {
  try {
    const id = getRandomInt(1, 826);
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    const response = await fetch(url, { mode: "cors" });
    return await response.json();
  } catch (err) {
    console.error("Error:", err);
  }
}

async function getTheCardById(id) {
  try {
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    const response = await fetch(url, { mode: "cors" });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

async function giveAnotherCard(id) {
  try {
    let newId = id;
    while (newId === id) {
      newId = getRandomInt(1, 826);
    }
    const url = `https://rickandmortyapi.com/api/character/${newId}`;
    const response = await fetch(url, { mode: "cors" });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export { getTheCard, getTheCardById, shuffle, giveAnotherCard };
