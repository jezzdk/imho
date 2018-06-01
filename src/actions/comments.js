import { firebase, database } from '../firebase'

export const fetchComments = (postId) => {
  return function(dispatch) {
    dispatch(commentsLoading())

    database.collection('posts/' + postId + '/comments').orderBy('createdAt').get().then(function(querySnapshot) {
      let comments = []
      console.log(querySnapshot)

      querySnapshot.forEach(function(doc) {
        comments.push({
          id: doc.id,
          ...doc.data()
        })
      })

      dispatch(receiveComments(comments))
    }).catch((error) => {
      dispatch(commentsFailed(error))
    })
  }
}

export const saveComment = (postId, comment) => {
  return function(dispatch, getState) {
    database.collection('posts/' + postId + '/comments').add({
      ...comment,
      uid: getState().auth.user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then((doc) => {
      dispatch(commentAdded(doc.id))
      dispatch(fetchComments(postId))
    })
  }
}

export const deleteComment = (postId, commentId) => {
  return function(dispatch) {
    database.collection('posts/' + postId + '/comments').doc(commentId).delete().then(() => {
      dispatch(commentDeleted(commentId))
    })
  }
}

export const commentsLoading = (posts) => {
  return {
    type: 'COMMENTS_LOADING',
  }
}

export const receiveComments = (comments) => {
  return {
    type: 'RECEIVE_COMMENTS',
    comments,
  }
}

export const commentAdded = id => ({
  type: 'COMMENT_ADDED',
  id
})

export const commentDeleted = id => ({
  type: 'COMMENT_DELETED',
  id
})

export const commentsFailed = error => ({
  type: 'COMMENTS_FAILED',
  error: error
})