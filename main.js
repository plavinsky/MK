

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

function attack(attack, enemy, enemyPlayer){
    if (attack.defence !== enemy.hit)
    {
        this.changeHP(enemy.value);
        this.renderHP();
        generateLogs('hit',this, enemyPlayer, enemy.value)
    }
    else{
        generateLogs('defence',this, enemyPlayer)
    }
}

function checkWiner(){

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

const $formFight = getEl(".control");
$formFight.addEventListener('submit', function(event){
    event.preventDefault();

    const attack = formAttack();
    const enemy = enemyAttack();

    player1.attack(attack, enemy, player2);
    player2.attack(enemy, attack, player1);

    checkWiner();
});

//HW6
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};
const $chat = document.querySelector(".chat");
const normalize = num => (num.toString().length > 1 ? num : `0${num}`);

//startLogs(player1, player2);
generateLogs('start', player1, player2);

function generateLogs(type, player1, player2, val=0){
    let text = logs[type];
    const date = new Date();
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;

    switch (type){
        case 'start':
            text = text
                .replace('[time]', time)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
            $chat.insertAdjacentHTML('afterbegin',`<p>${text}</p>`);
            break;
        case 'hit':
        case 'defence':
            text = text[getRandom(logs[type].length-1)]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            $chat.insertAdjacentHTML('afterbegin',`<p>[${time}] [${text}] [${val}] [${player2.hp}/100] </p>`);
            break;
        case 'end':
            text = text[getRandom(logs[type].length-1)]
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
            $chat.insertAdjacentHTML('afterbegin',`<p>${text}</p>`);
            break;
        case 'draw':
            text = text
                .replace('[time]', `${normalize(date.getHours())}:${normalize(date.getMinutes())}`)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
            $chat.insertAdjacentHTML('afterbegin',`<p>${text}</p>`);
            break;        
        default:
            text = "Соперники обнялись и пожали друг другу руки ;)";
    }
    
}

