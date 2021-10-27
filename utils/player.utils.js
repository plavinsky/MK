import { ATTACK, HIT } from "../data/game.js";
import { logs } from "../data/logs.js";
import { getRandom, normalize } from "./common.utils.js";
import {createElementWithClass, getEl} from "./dom.utils.js"

const $chat = document.querySelector(".chat");

function elHP() {
    return getEl('.player'+this.player+' .life');
}
function changeHP(damage = getRandom()) {
    return this.hp = ((this.hp - damage) > 0) ? this.hp - damage : 0;
}
function renderHP() {
    return elHP.call(this).style.width = this.hp + '%';
}

const playerWins = (name) => {
    const $loseTitle = createElementWithClass('loseTitle');
    if (name)
        $loseTitle.innerText = name + ' wins';
    else  
        $loseTitle.innerText = 'draw';

    return $loseTitle;
}

export const player1 = {
    player: 1,
    name: 'Simba',
    hp: 100,
    img: 'https://media3.giphy.com/media/N5VtM9GNCJqw0/giphy.gif?cid=790b7611a83d90bc6042fdfb3bef4f0123bb788ce69e6545&rid=giphy.gif&ct=s',//'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['ice', 'fire'],
    attack,
    changeHP,
    elHP,
    renderHP,
}

export const player2 = {
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['hit', 'fire'],
    attack,
    changeHP,
    elHP,
    renderHP,
}




export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

export const  formAttack = ($formFight) => {
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

function attack(attack, enemy, enemyPlayer){
    if (attack.defence !== enemy.hit)
    {
        this.changeHP(enemy.value);
        this.renderHP();
        generateLogs('hit',enemyPlayer, this, enemy.value)
    }
    else{
        generateLogs('defence', enemyPlayer, this)
    }
}


export const createPlayer = ({player, hp, name, img}) => {
    const $player1 = createElementWithClass('player' + player),
          $progressbar = createElementWithClass('progressbar'),
          $character = createElementWithClass('character'),
          $life = createElementWithClass('life'),
          $name = createElementWithClass('name'),
          $img = document.createElement('img');
    
    $life.style.width = hp + '%';
    $name.innerText = name;
    $img.src = img;

    $player1.appendChild($progressbar);
    $player1.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    
    return $player1;
}












export function checkWiner($arenas, $formFight){

    if (player1.hp === 0 && player2.hp === 0)
    {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    } else if (player1.hp === 0)
        {
            $arenas.appendChild(playerWins(player2.name));
            generateLogs('end', player2, player1);
        } else if (player2.hp === 0)
            {
                $arenas.appendChild(playerWins(player1.name));
                generateLogs('end', player1, player2);
            }
        

    if (player1.hp === 0 || player2.hp === 0)
    {
        $arenas.appendChild(createReloadButton());
        $formFight.disabled = true;
        for (let item of $formFight) {
            item.disabled = true;
        }
    }
}

function createReloadButton(){
    const $reloadWrap = createElementWithClass('reloadWrap');
    const $restartBtn = createElementWithClass('button', 'button');
    $restartBtn.innerText = 'Restart';
    $restartBtn.addEventListener('click', function(){
        $restartBtn.removeEventListener('click', this);
        window.location.reload();
    })

    $reloadWrap.appendChild($restartBtn);

    return $reloadWrap;
}



export function generateLogs(type, {name: name1}, {hp, name:name2}, val=0){
    let text = logs[type];
    const date = new Date();
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;

    switch (type){
        case 'start':
            text = text
                .replace('[time]', time)
                .replace('[player1]', name1)
                .replace('[player2]', name2);
            $chat.insertAdjacentHTML('afterbegin',`<p>${text}</p>`);
            break;
        case 'hit':
        case 'defence':
            text = text[getRandom(logs[type].length-1)]
                .replace('[playerKick]', name1)
                .replace('[playerDefence]', name2);
            $chat.insertAdjacentHTML('afterbegin',`<p>[${time}] [${text}] [${val}] [${hp}/100] </p>`);
            break;
        case 'end':
            text = text[getRandom(logs[type].length-1)]
                .replace('[playerWins]', name1)
                .replace('[playerLose]', name2);
            $chat.insertAdjacentHTML('afterbegin',`<p>${text}</p>`);
            break;
        case 'draw':
            $chat.insertAdjacentHTML('afterbegin',`<p>${text}</p>`);
            break;        
        default:
            text = "Соперники обнялись и пожали друг другу руки ;)";
    }
    
}



