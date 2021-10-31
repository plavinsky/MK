import { getRandom } from "../utils/common.utils.js";
import { getEl } from "../utils/dom.utils.js";
import Game from "./Game.js";
//import { generateLogs } from "../utils/player.utils.js";

export default class Player {

    constructor({ player, name, hp, img }) {
        this.player = player;
        this.name = name;
        this.hp = hp;
        this.img = img;
    }

    elHP() {
        return getEl('.player'+this.player+' .life');
    }
    changeHP(damage = getRandom()) {
        return this.hp = ((this.hp - damage) > 0) ? this.hp - damage : 0;
    }
    renderHP() {
        return this.elHP.call(this).style.width = this.hp + '%';
    }

    attack(attack, enemy, enemyPlayer){
        if (attack.defence !== enemy.hit)
        {
            this.changeHP(enemy.value);
            this.renderHP();
            Game.generateLogs('hit',enemyPlayer, this, enemy.value)
        }
        else{
            Game.generateLogs('defence', enemyPlayer, this)
        }
    }
}