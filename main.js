import { getEl } from "./utils/dom.utils.js";
import { createPlayer, checkWiner, player1, player2, enemyAttack, generateLogs, formAttack} from "./utils/player.utils.js";

import { getRandom } from "./utils/common.utils.js";

import { HIT } from "./data/game.js";


const $arenas = document.querySelector(".arenas");
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1, player2);

const $formFight = getEl(".control");
$formFight.addEventListener('submit', (event) => {
    event.preventDefault();

    const attack = formAttack($formFight);
    const enemy = enemyAttack();

    player1.attack(attack, enemy, player2);
    player2.attack(enemy, attack, player1);

    checkWiner($arenas, $formFight);
});





