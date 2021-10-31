

export const getPlayersAPI = async () => {
    return fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
}

export const getRandomEnemyAPI = async () => {
    return fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
}

export const fightAPI = async ({hit, defence}) => {
    return fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            hit,
            defence,
        })
    }).then(res => res.json());
}