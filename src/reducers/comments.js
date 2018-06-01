const comments = (state = {
  fetching: false,
  items: [],
  error: null
}, action) => {
  switch (action.type) {
    case 'COMMENTS_LOADING':
      return {
        ...state,
        fetching: true
      }

    case 'RECEIVE_COMMENTS':
      return {
        ...state,
        fetching: false,
        items: action.comments
      }

    case 'ADD_COMMENT':
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

    case 'COMMENT_ADDED':
      return state

    case 'COMMENT_DELETED':
      let comments = [...state.items]
      let index = comments.findIndex((comment) => {
        return comment.id === action.id
      })

      if (index !== -1) {
        comments.splice(index, 1)
      }

      return {
        ...state,
        items: comments
      }

    case 'COMMENTS_FAILED':
      return {
        ...state,
        fetching: false,
        error: action.error
      }

    default:
      return state
  }
}

export default comments