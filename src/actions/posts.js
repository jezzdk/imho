import { firebase, database } from '../firebase'

export const fetchPosts = () => {
    return function(dispatch) {
        dispatch(postsLoading())

        database.collection('posts').orderBy('createdAt', 'desc').get().then(function(querySnapshot) {
            let posts = {}
            let handles = []

            querySnapshot.forEach(function(doc) {
                if (!doc.exists) {
                    return
                }

                posts[doc.id] = {
                    id: doc.id,
                    ...doc.data(),
                }

                let handle = database.collection('users').doc(doc.data().uid).get().then(function(userDoc) {
                    if (!userDoc.exists) {
                        return
                    }

                    posts[doc.id].author = {
                        ...userDoc.data()
                    }
                }).catch((error) => {
                    // catch any errors
                })

                handles.push(handle)
            })

            // WHen all users are finished loading, dispatch the next action
            Promise.all(handles).then(function() {
                dispatch(receivePosts(Object.values(posts)))
            })
        }).catch((error) => {
            dispatch(postsFailed(error))
        })
    }
}

export const fetchPost = (id) => {
    return function(dispatch) {
        dispatch(postsLoading())

        return database.collection('posts').doc(id).get().then(function(doc) {
            if (!doc.exists) {
                return
            }

            database.collection('users').doc(doc.data().uid).get().then(function(userDoc) {
                if (!userDoc.exists) {
                    return
                }

                dispatch(receivePost({
                    id: doc.id,
                    ...doc.data(),
                    author: {
                        ...userDoc.data()
                    }
                }))
            }).catch((error) => {
                // catch any errors
            })
        }).catch((error) => {
            dispatch(postsFailed(error))
        })
    }
}

export const savePost = (post) => {
    return function(dispatch, getState) {
        let author = getState().auth.user

        return database.collection('posts').add({
            ...post,
            uid: author.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((doc) => {
            dispatch(postAdded(doc.id))
            return doc
        })
    }
}

export const updatePost = (id, post) => {
    return function(dispatch, getState) {
        return database.collection('posts').doc(id).set({
            ...post,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true }).then((doc) => {
            dispatch(postUpdated(id))
            return doc
        })
    }
}

export const deletePost = id => {
    return function(dispatch) {
        return database.collection('posts').doc(id).delete().then(() => {
            dispatch(postDeleted(id))
            return id
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