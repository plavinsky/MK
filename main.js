//HW-1
console.log("Fight..");

//HW-2
////Task0
const player1 = {
    player: 1,
    name: 'Sonya',
    hp: 100,
    img: 'https://media3.giphy.com/media/N5VtM9GNCJqw0/giphy.gif?cid=790b7611a83d90bc6042fdfb3bef4f0123bb788ce69e6545&rid=giphy.gif&ct=s',//'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['ice', 'fire'],
    attack: function() {
        console.log(this.name + " " + "Fight!");
    }
}

const player2 = {
    player: 2,
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

////Task1,2,3

function createElementWithClass(cName, el='div') {
    const $div = document.createElement(el);
    $div.classList.add(cName);

    return $div;
}

function createPlayer(player) {
    const $player1 = createElementWithClass('player' + player.player);
    const $progressbar = createElementWithClass('progressbar');
    const $character = createElementWithClass('character');
    $player1.appendChild($progressbar);
    $player1.appendChild($character);

    const $life = createElementWithClass('life');
    $life.style.width = player.hp + '%';
    const $name = createElementWithClass('name');
    $name.innerText = player.name;
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    const $img = document.createElement('img');
    $img.src = player.img;
    $character.appendChild($img);
    
    $character.addEventListener('click', () => {
        player.attack();
    });
    
    return $player1;
}

const $arenas = document.querySelector(".arenas");
$arenas.appendChild(createPlayer('player1', player1));
$arenas.appendChild(createPlayer('player2', player2));
