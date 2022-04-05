// Utility
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  const BOMB_NUMBER = 16;
  const bombs = [];
  let max_attempt;
  let attempts = 0;
  
  function setLevel(event) {
    const level = document.getElementById("level").value;
    console.log("livello selezionato: ", level);
    let numSquare;
    switch (level) {
      case "1":
      default:
        numSquare = 100;
        break;
      case "2":
        numSquare = 81;
        break;
      case "3":
        numSquare = 49;
        break;
    }
    let squareperSide = Math.sqrt(numSquare);
    console.log("celle per lato: ", squareperSide);
    generateBomb(numSquare);
    generaGriglia(numSquare, squareperSide);
  }
  
  function generateBomb(numSquare) {
    max_attempt = numSquare - BOMB_NUMBER;
    while (bombs.length < BOMB_NUMBER) {
      let bombNUmber = getRandomInt(1, numSquare);
      if (!bombs.includes(bombNUmber)) {
        bombs.push(bombNUmber);
      }
    }
  }
  
  function generaGriglia(numSquare, squareperSide) {
    console.log("numero di celle totali: ", numSquare);
    const app = document.getElementById("app");
    app.innerHTML = "";
    let row = document.createElement("div");
    row.setAttribute("class", "gridrow");
    for (let i = 1; i <= numSquare; i++) {
      const square = generaCella(i, squareperSide);
      row.append(square);
    }
    app.append(row);
  }

  function generaCella(numSquare, squareperSide) {
    let square = document.createElement("div");
    square.setAttribute("class", "box");
    square.style.width = `calc(100% / ${squareperSide})`;
    square.style.height = `calc(100% / ${squareperSide})`;
    square.classList.add("pointer");
    square.innerHTML = `<span>${numSquare}</span>`;
    square.addEventListener("click", coloraCella);
    return square;
  }

  function coloraCella() {
    let num = parseInt(this.innerText);
    attempts++;
    if (bombs.includes(num)) {
      this.style.backgroundColor = "red";
      this.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
      gameOver();
    } else {
      this.style.backgroundColor = "#6495ed";
    }
    this.classList.remove("pointer");
    this.removeEventListener("click", coloraCella);
  }
  function gameOver() {}
  //document.getElementById("level").addEventListener("change", setLevel);
  document.getElementById("play").addEventListener("click", setLevel);
  