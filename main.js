const cards = document.querySelectorAll(".card");
const moves = document.getElementById("moves");
const refresh = document.getElementById("refresh");
const time = document.getElementById("time");

let duration = 60;
let numberOfMoves = 0;
let matchedCards = 0;
let cardOne, cardTwo, timer;
let disableDeck = false;
let isPlaying = false;

function initTimer() {
  if (duration <= 0) {
    return clearInterval(timer);
  }
  duration--;
  time.innerText = `Time: ${duration}s`;
  console.log(duration);
}

function flipCard({ target: clickCard }) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickCard !== cardOne && !disableDeck && duration > 0) {
    clickCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickCard);
    }
    cardTwo = clickCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector(".back-view img").src;
    let cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  numberOfMoves++;
  moves.textContent = `Moves: ${numberOfMoves}`;
  if (img1 === img2) {
    matchedCards++;
    if (matchedCards == 8 && duration > 0) {
      return clearInterval(timer);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";

    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  matchedCards = 0;
  cardOne = cardTwo = "";
  disableDeck = isPlaying = false;
  duration = 60;
  time.innerText = `Time: ${duration}s`;
  clearInterval(timer);

  numberOfMoves = 0;

  moves.textContent = `Moves: ${numberOfMoves}`;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    setTimeout(() => {
      let imageTag = card.querySelector(".back-view img");
      imageTag.src = `./img/img-${arr[index]}.png`;
      card.addEventListener("click", flipCard); // Add Event Listener to All Cards
    }, 300);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard); // Add Event Listener to All Cards
});
