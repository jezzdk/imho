const posts = (state = {
  fetching: false,
  items: [],
  lastPost: null,
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
        lastPost: action.post
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

    case 'POST_DELETED':
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

    case 'POSTS_FAILED':
      return {
        ...state,
        fetching: false,
        error: action.error
      }

    case 'ATTACH_AUTHOR':
      let { id, author } = action

      let posts2 = [...state.items]
      let index2 = posts2.findIndex((post) => {
        return post.id === action.id
      })

      if (index2 !== -1) {
        posts2.splice(index2, 1, {
          ...posts2[index2],
          author
        })
      }

      let newLastPost = {...state.lastPost, author }

      if (state.lastPost !== null && state.lastPost.id === id) {
        newLastPost.author = author
      }

      return {
        ...state,
        items: posts2,
        lastPost: newLastPost
      }

    default:
      return state
  }
}

export default posts