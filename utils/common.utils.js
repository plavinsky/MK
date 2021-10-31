export function getRandom(limit = 20){
    return Math.ceil(Math.random()*limit);
}

export const normalize = num => (num.toString().length > 1 ? num : `0${num}`);