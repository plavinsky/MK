const $arenas = document.querySelector(".arenas");
const $btnRand = getEl('.button');

//HW-1
console.log("Fight..");

//HW-2
////Task0
const player1 = {
    player: 1,
    name: 'Simba',
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

function getEl(query) {
    return document.querySelector(query);
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

function changeHP(player) {
    const $playerLife = getEl('.player'+player.player+' .life');
    const randomDamage = Math.ceil(Math.random()*20);
    player.hp = ((player.hp - randomDamage) > 0) ? player.hp - randomDamage : 0;
    $playerLife.style.width = player.hp + '%';
}

function playerLose(name) {
    const $loseTitle = createElementWithClass('loseTitle');
    $loseTitle.innerText = name + ' lose';

    return $loseTitle;
}

function playerWins(name) {
    const $loseTitle = createElementWithClass('loseTitle');
    $loseTitle.innerText = name + ' wins';

    return $loseTitle;
}

function draw() {
    const $drawTitle = createElementWithClass('loseTitle');
    $drawTitle.innerText = 'DRAW';

    return $drawTitle;
}

function resetHP(player) {
    const $playerLife = getEl('.player'+player.player+' .life');
    player.hp = 100;
    $playerLife.style.width = player.hp + '%';
}


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


$btnRand.addEventListener('click', function(){
    console.log('Fight!');

    if (player1.hp === 0 || player2.hp === 0)
    {
        resetHP(player1);
        resetHP(player2);

        $btnRand.innerText = ' RANDOM ';
        const $loseTitle = getEl('.loseTitle');
        $loseTitle.outerHTML = "";
        //$arenas.removeChild(loseTitle);

        return;
    }
    
    changeHP(player1);
    changeHP(player2);

    if (player1.hp === 0 && player2.hp === 0)
        $arenas.appendChild(draw());
    else if (player1.hp === 0)
        $arenas.appendChild(playerWins(player2.name));
    else if (player2.hp === 0)
        $arenas.appendChild(playerWins(player1.name));

    if (player1.hp === 0 || player2.hp === 0)
        $btnRand.innerText = ' RESET ';

})
