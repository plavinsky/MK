//HW-1
console.log("Fight..");

//HW-2
////Task0
const player1 = {
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['ice', 'fire'],
    attack: function() {
        console.log(this.name + " " + "Fight!");
    }
}

const player2 = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['hit', 'fire'],
    attack: function() {
        console.log(this.name + " " + "Fight!");
    }
}

player1.attack();
player2.attack();

////Task1

function createElementWithClass(cName, el='div') {
    const $div = document.createElement(el);
    $div.classList.add(cName);

    return $div;
}

function createPlayer(player) {
    const $player1 = document.createElement('div');
    $player1.classList.add('player1');
    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    const $character = document.createElement('character');
    $character.classList.add('character');

    $player1.appendChild($progressbar);
    $player1.appendChild($character);

    const $life = createElementWithClass('life');
    $life.style.width = '100%';
    const $name = createElementWithClass('name');
    $name.innerText = player.name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    const $img = document.createElement('img');
    $img.src = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';

    $character.appendChild($img);
    
    return $player1;
}

const $arena1 = document.querySelector(".arena1");
$arena1.appendChild(createPlayer(player1));
