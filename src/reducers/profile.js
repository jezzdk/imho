const profile = (state = {
    fetching: false,
    data: null,
    error: null
}, action) => {
    switch (action.type) {
    case 'PROFILE_LOADING':
        return {
            ...state,
            fetching: action.status
        }
    case 'RECEIVE_PROFILE':
        return {
            ...state,
            data: action.user
        }
    case 'PROFILE_FAILED':
        return {
            ...state,
            error: action.error
        }
    default:
        return state
    }
}

export default profile