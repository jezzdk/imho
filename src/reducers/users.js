const users = (state = {
    fetching: false,
    items: [],
    currentUser: null,
    error: null
}, action) => {
    switch (action.type) {
    case 'USERS_LOADING':
        return {
            ...state,
            fetching: true
        }

    case 'RECEIVE_USERS':
        return {
            ...state,
            fetching: false,
            items: action.posts
        }

    case 'RECEIVE_USER':
        return {
            ...state,
            fetching: false,
            currentUser: action.user
        }

    case 'USER_UPDATED':
        return state

    case 'USERS_FAILED':
        return {
            ...state,
            fetching: false,
            error: action.error
        }

    default:
        return state
    }
}

export default users