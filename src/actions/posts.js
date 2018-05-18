import { database } from '../firebase';

export const fetchPosts = () => {
  return function(dispatch) {
    dispatch(postsLoading());

    database.collection('posts').get().then(function(querySnapshot) {
      let posts = [];

      querySnapshot.forEach(function(doc) {
        posts.push({
          id: doc.id,
          ...doc.data()
        });
      });

      dispatch(receivePosts(posts));
    }).catch((error) => {
      dispatch(postsFailed(error))
    });
  }
}

export const postsLoading = (posts) => {
  return {
    type: 'POSTS_LOADING',
  }
}

export const receivePosts = (posts) => {
  return {
    type: 'RECEIVE_POSTS',
    posts,
  }
}

export const addPost = (post) => {
  return function(dispatch) {
    database.collection('posts').add({
      ...post
    }).then((doc) => {
      dispatch(postAdded(doc.id))
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
}

export const deletePost = id => {
  return function(dispatch) {
    dispatch(postsLoading());

    database.collection('posts').doc(id).delete().then(() => {
      dispatch(postDeleted(id))
      dispatch(fetchPosts())
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}

export const postDeleted = id => ({
  type: 'POST_DELETED',
  id
})

export const postAdded = id => ({
  type: 'POST_ADDED',
  id
})

export const postsFailed = error => ({
  type: 'POSTS_FAILED',
  error: error
})

export const saveComment = (postId, comment) => {
  return function(dispatch) {
    database.collection('posts/' + postId + '/comments').add({
      ...comment
    }).then((doc) => {
      dispatch(commentAdded(doc.id));
      dispatch(fetchPosts())
    });
  }
}

export const commentAdded = id => ({
  type: 'COMMENT_ADDED',
  id
})