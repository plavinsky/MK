const $arenas = document.querySelector(".arenas");
// const $btnRand = getEl('.button');

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
    attack,
    changeHP,
    elHP,
    renderHP,
    resetHP,
}

const player2 = {
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['hit', 'fire'],
    attack,
    changeHP,
    elHP,
    renderHP,
    resetHP,
}

////Task1,2,3

function createElementWithClass(cName, el='div') {
    const $div = document.createElement(el);
    cName && $div.classList.add(cName);

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
    
    return $player1;
}

function playerWins(name) {
    const $loseTitle = createElementWithClass('loseTitle');
    if (name)
        $loseTitle.innerText = name + ' wins';
    else  
        $loseTitle.innerText = 'draw';

    return $loseTitle;
}

function resetHP() {
    this.hp = 100;
    this.renderHP();
}


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


// $btnRand.addEventListener('click', function(){
//     console.log('Fight!');

//     if (player1.hp === 0 || player2.hp === 0)
//     {
//         resetHP.call(player1);
//         resetHP.call(player2);

//         $btnRand.innerText = ' RANDOM ';
//         const $loseTitle = getEl('.loseTitle');
//         $loseTitle.outerHTML = "";
        
//         $reloadBtn = getEl('.reloadWrap');
//         $reloadBtn.outerHTML = "";

//         return;
//     }
    
//     player1.changeHP(getRandom());
//     player1.renderHP();

//     player2.changeHP(getRandom());
//     player2.renderHP();

//     if (player1.hp === 0 && player2.hp === 0)
//         $arenas.appendChild(playerWins());
//     else if (player1.hp === 0)
//         $arenas.appendChild(playerWins(player2.name));
//     else if (player2.hp === 0)
//         $arenas.appendChild(playerWins(player1.name));

//     if (player1.hp === 0 || player2.hp === 0)
//     {
//         $btnRand.innerText = ' RESET ';
//         $arenas.appendChild(createReloadButton());
//     }
        

// })


//HW-4 functions
function changeHP(damage = getRandom()){
    this.hp = ((this.hp - damage) > 0) ? this.hp - damage : 0;
}

function elHP(){
    return getEl('.player'+this.player+' .life');
}

function renderHP(){
    const $playerLife = elHP.call(this);
    $playerLife.style.width = this.hp + '%';
}

function createReloadButton(){
    $reloadWrap = createElementWithClass('reloadWrap');
    $restartBtn = createElementWithClass('button', 'button');
    $restartBtn.innerText = 'Restart';
    $restartBtn.addEventListener('click', function(){
        $restartBtn.removeEventListener('click', this);
        window.location.reload();
    })

    $reloadWrap.appendChild($restartBtn);

    return $reloadWrap;
}

function getRandom(limit = 20){
    return Math.ceil(Math.random()*limit);
}

//HW-5
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

function enemyAttack(){
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function formAttack(){
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit')
        {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence')
        {
            attack.defence = item.value;
        }   

        item.checked = false;
    }

    return attack;
}

function attack(enemy, attack){
    console.log(1);

    if (enemy.defence !== attack.hit)
    {
        this.changeHP(attack.value);
        this.renderHP();
    }
}

function checkWiner(){

    if (player1.hp === 0 && player2.hp === 0)
        $arenas.appendChild(playerWins());
    else if (player1.hp === 0)
        $arenas.appendChild(playerWins(player2.name));
    else if (player2.hp === 0)
        $arenas.appendChild(playerWins(player1.name));

    if (player1.hp === 0 || player2.hp === 0)
    {
        $arenas.appendChild(createReloadButton());
        $formFight.disabled = true;
        for (let item of $formFight) {
            item.disabled = true;
        }
    }
}

const $formFight = getEl(".control");
$formFight.addEventListener('submit', function(event){
    event.preventDefault();

    const attack = formAttack();
    const enemy = enemyAttack();

    console.log("### attack:", attack);
    console.log("### enemy:", enemy);

    player1.attack(attack, enemy);
    player2.attack(enemy, attack);

    checkWiner();
});

