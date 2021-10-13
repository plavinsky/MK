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

function createPlayer(player, name, hp) {
    const $player1 = document.createElement('div');
    $player1.classList.add('player1');
    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    const $character = document.createElement('character');
    $character.classList.add('character');

    $player1.appendChild($progressbar);
    $player1.appendChild($character);

    const $life = createElementWithClass('life');
    $life.style.width = `${hp}%`;
    const $name = createElementWithClass('name');
    $name.innerText = name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    const $img = document.createElement('img');
    $img.src = player.img;

    $character.appendChild($img);
    
    return $player1;
}

const $arenas = document.querySelector(".arenas");
console.log($arenas);
$arenas.appendChild(createPlayer(player1, 'Anton', 80));
$arenas.appendChild(createPlayer(player2, 'Zar', 90));
