const posts = (state = {
    fetching: false,
    items: [],
    currentPost: null,
    error: null
}, action) => {
    switch (action.type) {
    case 'POSTS_LOADING':
        return {
            ...state,
            fetching: true
        }

    case 'RECEIVE_POSTS':
        return {
            ...state,
            fetching: false,
            items: action.posts
        }

    case 'RECEIVE_POST':
        return {
            ...state,
            fetching: false,
            currentPost: action.post
        }

    case 'ADD_POST':
        return {
            ...state,
            items: [
                ...state.items,
                {
                    title: action.title,
                    text: action.text,
                }
            ]
        }

    case 'POST_ADDED':
        return state

    case 'POST_UPDATED':
        return state

    case 'POST_DELETED': {
        let posts = [...state.items]
        let index = posts.findIndex((post) => {
            return post.id === action.id
        })

        if (index !== -1) {
            posts.splice(index, 1)
        }

        return {
            ...state,
            items: posts
        }
    }

    case 'POSTS_FAILED':
        return {
            ...state,
            fetching: false,
            error: action.error
        }

    default:
        return state
    }
}

export default posts