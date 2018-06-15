import { firebase, database } from '../firebase'

export const fetchPosts = () => {
    return function(dispatch) {
        dispatch(postsLoading())

        database.collection('posts').orderBy('createdAt', 'desc').get().then(function(querySnapshot) {
            let posts = []

            querySnapshot.forEach(function(doc) {
                posts.push({
                    id: doc.id,
                    ...doc.data()
                })

                database.collection('users').doc(doc.data().uid).get().then((userDoc) => {
                    dispatch(attachAuthor(doc.id, userDoc.data()))
                })
            })

            dispatch(receivePosts(posts))
        }).catch((error) => {
            dispatch(postsFailed(error))
        })
    }
}

export const attachAuthor = (postId, data) => {
    return {
        type: 'ATTACH_AUTHOR',
        id: postId,
        author: data
    }
}

export const fetchPost = (id) => {
    return function(dispatch) {
        dispatch(postsLoading())

        database.collection('posts').doc(id).get().then(function(doc) {
            if (doc.exists) {
                dispatch(receivePost({
                    id: doc.id,
                    ...doc.data()
                }))
            } else {
                // doc.data() will be undefined in this case
                //console.log("No such document!")
            }
        }).catch((error) => {
            dispatch(postsFailed(error))
        })
    }
}

export const savePost = (post) => {
    return function(dispatch, getState) {
        database.collection('posts').add({
            ...post,
            uid: getState().auth.user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((doc) => {
            dispatch(postAdded(doc.id))
        })
    }
}

export const updatePost = (id, post) => {
    return function(dispatch, getState) {
        database.collection('posts').doc(id).set({
            ...post,
        }, { merge: true }).then(() => {
            dispatch(postUpdated(id))
        })
    }
}

export const deletePost = id => {
    return function(dispatch) {
        database.collection('posts').doc(id).delete().then(() => {
            dispatch(postDeleted(id))
        })
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

export const receivePost = (post) => {
    return {
        type: 'RECEIVE_POST',
        post,
    }
}

export const postAdded = id => ({
    type: 'POST_ADDED',
    id
})

export const postUpdated = id => ({
    type: 'POST_UPDATED',
    id
})

export const postDeleted = id => ({
    type: 'POST_DELETED',
    id
})


export const postsFailed = error => ({
    type: 'POSTS_FAILED',
    error: error
})