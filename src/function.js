function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getTheCard() {
  try{
    const id = getRandomInt(1,826)
    const url = `https://rickandmortyapi.com/api/character/${id}`
    const response = await fetch(url, { mode: "cors" });
    return await response.json();
  } catch (err) {
    console.error("Error:", err)
  }
}

export { getTheCard }