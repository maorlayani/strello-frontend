import { userService } from "../services/user.service.js"

export function loadUsers() {
    return async dispatch => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('Cannot load users', err)
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('Cannot login', err)
        }
    }
}

export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('Cannot signup', err)
        }
    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({ type: 'SET_USER', user: null })
        } catch (err) {
            console.log('Cannot logout', err)
        }
    }
}

export function loadUser(userId) {
    return async (dispatch) => {
        try {
            const user = await userService.getById(userId)
            dispatch({ type: 'SET_WATCHED_USER', user })
        } catch (err) {
            console.log('Cannot load user', err)
        }
    }
}