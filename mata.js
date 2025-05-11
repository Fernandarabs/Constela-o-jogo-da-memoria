const grid = document.querySelector('.grid');

const characters = [

   'Lyra',

   'Orion',

   'windy',

   'Sky',

   'Cloud',

];



const characterImage = {

   'Lyra': ['./imagens/Lyra.png', './imagens/Lyra.png'],

   'Orion': ['./imagens/Orion.png', './imagens/Orion.png'],

   'windy': ['./imagens/windy.png', './imagens/windy.png'],

   'Sky': ['./imagens/Sky.png', './imagens/Sky.png'],

   'Cloud': ['./imagens/Cloud.png', './imagens/Cloud.png'],

};



const characterDescriptions = {

   'Lyra': 'Lyra é uma jovem de espírito forte e coração inabalável... (descrição completa)',

   'Orion': 'Orion é um jovem de 23 anos que carrega em si a alma vibrante... (descrição completa)',

   'windy': 'Windy é uma jovem de 19 anos, estudante de moda... (descrição completa)',

   'Sky': 'Sky, cujo nome verdadeiro é Sora, é um jovem japonês... (descrição completa)',

   'Cloud': 'Cloud é um jovem de aparência tão marcante quanto seu silêncio... (descrição completa)',

};



const createElement = (tag, className) => {

   const element = document.createElement(tag);

   element.className = className;

   return element;

}



let firstCard = '';

let secondCard = '';

let gameLoaded = false;



const checkEndGame = () => {

   const disabledCard = document.querySelectorAll('.disabled-card');

   if (disabledCard.length === 5) {

       alert('Parabéns, você conseguiu!!!');

   }

}



const checkCards = () => {

   const firstCharacter = firstCard.getAttribute('data-character');

   const secondCharacter = secondCard.getAttribute('data-character');

   if (firstCharacter === secondCharacter) {

       firstCard.firstChild.classList.add('disabled-card');

       secondCard.firstChild.classList.add('disabled-card');

       firstCard = '';

       secondCard = '';

       checkEndGame();



       showCardDescription(firstCharacter);

   } else {

       setTimeout(() => {

           firstCard.classList.remove('reveal-card');

           secondCard.classList.remove('reveal-card');

           firstCard = '';

           secondCard = '';

       }, 500);

   }

}



const revealCard = ({ target }) => {

   if (target.parentNode.className.includes('reveal-card')) {

       return;

   }

   if (firstCard === '') {

       target.parentNode.classList.add('reveal-card');

       firstCard = target.parentNode;

   } else if (secondCard === '') {

       target.parentNode.classList.add('reveal-card');

       secondCard = target.parentNode;

       checkCards();

   }

}



const createCard = (character, image) => {

   const card = createElement('div', 'card');

   const front = createElement('div', 'face front');

   const back = createElement('div', 'face back');

   front.style.backgroundImage = `url('${image}')`;


   card.appendChild(front);

   card.appendChild(back);

   card.addEventListener('click', revealCard);

   card.setAttribute('data-character', character);

   return card;

}



const loadGame = () => {

   if (gameLoaded) return;



   const duplicateCharacters = characters.flatMap(character => [

       { character, image: characterImage[character][0] },

       { character, image: characterImage[character][1] }

   ]);



   const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5);

   shuffleArray.forEach(({ character, image }) => {

       const card = createCard(character, image);

       grid.appendChild(card);

   });



   gameLoaded = true;

}



const showCardDescription = (character) => {

   const infoBox = document.getElementById('infoBox');

   const cardDescription = document.getElementById('cardDescription');

   cardDescription.textContent = characterDescriptions[character];

   infoBox.style.display = 'flex';

};



const closeInfoBox = () => {

   const infoBox = document.getElementById('infoBox');

   infoBox.style.display = 'none';

};



loadGame();
