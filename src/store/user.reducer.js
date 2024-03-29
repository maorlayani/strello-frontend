import { userService } from '../services/user.service.js'

var initialState = {
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}
export function userReducer(state = initialState, action = {}) {
    var newState = state
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break
        case 'SET_WATCHED_USER':
            newState = { ...state, watchedUser: action.user }
            break
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break

        default:
    }
    // For debug:
    // window.userState = newState
    return newState
}
