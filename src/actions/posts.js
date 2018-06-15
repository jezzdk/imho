import { firebase, database, storage } from '../firebase'

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
            })

            dispatch(receivePosts(posts))
        }).catch((error) => {
            dispatch(postsFailed(error))
        })
    }
}

export const fetchPost = (id) => {
    return function(dispatch) {
        dispatch(postsLoading())

        return database.collection('posts').doc(id).get().then(function(doc) {
            if (doc.exists) {
                dispatch(receivePost({
                    id: doc.id,
                    ...doc.data()
                }))
            } else {
                // doc.data() will be undefined in this case
                //console.log("No such document!")
            }

            return doc
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
            author: {
                name: author.displayName,
                avatar: author.photoURL,
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((doc) => {
            dispatch(postAdded(doc.id))
            return doc
        })
    }
}

export const uploadImage = (file, process = undefined, error = undefined, success = undefined) => {
    return function(dispatch, getState) {
        let ref = storage.ref('image/' + Math.random().toString(36).substr(2, 9) + '_' + file.name).put(file)

        ref.on('state_changed', process, error, success)

        return ref.then(function(snapshot) {
            return snapshot.ref.getDownloadURL()
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