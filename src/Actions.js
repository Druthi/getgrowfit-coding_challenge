// action types

export const ADD_USER = 'ADD_USER';
export const STATUS = 'STATUS';
export const PULL_FIRE = 'PULL_FIRE';


// action creators

export function addUser(users) {
    return { type: ADD_USER, users }
}

export function status(status) {
    return { type: STATUS, status }
}

export function pullFire(users) {
    return { type: PULL_FIRE, users }
}

//export function addUser(users) {
//    return { type: ADD_USER, users }
//}

