import { createElementWithClass, getEl } from "../utils/dom.utils.js";
import { createPlayer, enemyAttack, formAttack } from "../utils/player.utils.js";
import Player from "./Player.js";
import { LOGS } from "../data/logs.js";
import { getRandom, normalize } from "../utils/common.utils.js";


export default class Game {
    constructor(params) {
        
    }

    start() {

        let player1 = new Player({
            player: 1,
            name: 'Simba',
            hp: 100,
            img: 'https://media3.giphy.com/media/N5VtM9GNCJqw0/giphy.gif?cid=790b7611a83d90bc6042fdfb3bef4f0123bb788ce69e6545&rid=giphy.gif&ct=s',//'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
        });
        
        let player2 = new Player({
            player: 2,
            name: 'Scorpion',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
            });
        
        const $arenas = document.querySelector(".arenas");
        $arenas.appendChild(createPlayer(player1));
        $arenas.appendChild(createPlayer(player2));
        
        
        
        Game.generateLogs('start', player1, player2);
        
        const $formFight = getEl(".control");
        $formFight.addEventListener('submit', (event) => {
            event.preventDefault();
        
            const attack = formAttack($formFight);
            const enemy = enemyAttack();
        
            player1.attack(attack, enemy, player2);
            player2.attack(enemy, attack, player1);
        
            this.checkWiner($arenas, $formFight, player1, player2);
        });

    }

    static generateLogs(type, {name: name1}, {hp, name:name2}, val=0){
        let text = LOGS[type];
        const date = new Date();
        const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;
        const $chat = document.querySelector(".chat");
    
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
                text = text[getRandom(LOGS[type].length-1)]
                    .replace('[playerKick]', name1)
                    .replace('[playerDefence]', name2);
                $chat.insertAdjacentHTML('afterbegin',`<p>[${time}] [${text}] [${val}] [${hp}/100] </p>`);
                break;
            case 'end':
                text = text[getRandom(LOGS[type].length-1)]
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

    checkWiner($arenas, $formFight, player1, player2){

        if (player1.hp === 0 && player2.hp === 0)
        {
            $arenas.appendChild(playerWins());
            Game.generateLogs('draw');
        } else if (player1.hp === 0)
            {
                $arenas.appendChild(this.playerWins(player2.name));
                Game.generateLogs('end', player2, player1);
            } else if (player2.hp === 0)
                {
                    $arenas.appendChild(this.playerWins(player1.name));
                    Game.generateLogs('end', player1, player2);
                }
            
    
        if (player1.hp === 0 || player2.hp === 0)
        {
            $arenas.appendChild(this.createReloadButton());
            $formFight.disabled = true;
            for (let item of $formFight) {
                item.disabled = true;
            }
        }
    }

    playerWins = (name) => {
        const $loseTitle = createElementWithClass('loseTitle');
        if (name)
            $loseTitle.innerText = name + ' wins';
        else  
            $loseTitle.innerText = 'draw';
    
        return $loseTitle;
    }

    createReloadButton(){
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
}