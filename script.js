const tilesContainer = document.querySelector(".tiles");
const colors = [
  "Turquoise",
  "Lavender",
  "Coral",
  "Crimson",
  "gold",
  "SpringGreen",
  "Fuchsia",
  "RoyalBlue",
];

const colorsPicklist = [...colors, ...colors]; // we want to make pair
const tileCount = colorsPicklist.length; // total kitni tiles in game

// Build our tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
  const color = colorsPicklist[randomIndex];
  const tile = buildMyTile(color);

  // jo index ki tile bn gyi, usko krdo remove from parent array
  colorsPicklist.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}

let revealedCount = 0; //Kitni tiles shi hai total
let activeTile = null; //which tile is open
let awaitingFinish = false; //wait to reset tiles

function buildMyTile(color) {
  // Create a new tile element

  const element = document.createElement("div");
  // Set attributes for tiles
  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    //check if user is waiting to reset tiles or if tiles is already revealed
    if (awaitingFinish || revealed === "true" || element == activeTile) {
      return;
    }

    element.style.backgroundColor = color;

    // if no tile is turned(currently active)
    if (!activeTile) {
      activeTile = element;
      return;
    }

    // check if color matches the active tile

    const colorToMatch = activeTile.getAttribute("data-color");

    // color matches
    if (colorToMatch === color) {
      // color matches,both tiles->revealed
      element.setAttribute("data-revealed", "true");
      activeTile.setAttribute("data-revealed", "true");

      // reset active tile
      activeTile = null;
      awaitingFinish = false;
      revealedCount += 2;

      // Check if all tiles are revealed(game won)
      if (revealedCount === tileCount) {
        alert("Yay,you won the game,please refresh.");
      }

      return;
    }
    // if not matched
    awaitingFinish = true;
    setTimeout(() => {
      activeTile.style.backgroundColor = null;
      element.style.backgroundColor = null;
      awaitingFinish = false;
      activeTile = null;
    }, 1000);
  });

  return element;
}
