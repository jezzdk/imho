const posts = (state = {
  fetching: false,
  items: [],
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
      return state;

    case 'POST_DELETED':
      return state;
      // let posts = [...state.items];
      // let postIndex = posts.findIndex((post) => {
      //   return post.id === action.id;
      // });

      // return {
      //   ...state,
      //   items: posts.splice(postIndex, 1)
      // }

    case 'POSTS_FAILED':
      return {
        ...state,
        fetching: false,
        error: action.error
      };

    default:
      return state
  }
}

export default posts