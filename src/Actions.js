// action types

export const ADD_USER = 'ADD_USER';
export const STATUS = 'STATUS';

// action creators

export function addUser(users) {
    return { type: ADD_USER, users }
}

export function status(status) {
    return { type: STATUS, status }
}