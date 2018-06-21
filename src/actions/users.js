import { firebase, database } from '../firebase'

export const fetchUser = (id) => {
    return function(dispatch) {
        dispatch(usersLoading())

        return database.collection('users').doc(id).get().then(function(doc) {
            if (doc.exists) {
                dispatch(receiveUser({
                    id: doc.id,
                    ...doc.data()
                }))
            } else {
                // doc.data() will be undefined in this case
                //console.log("No such document!")
            }

            return doc
        }).catch((error) => {
            dispatch(userFailed(error))
        })
    }
}

export const updateUser = (id, user) => {
    return function(dispatch, getState) {
        return database.collection('users').doc(id).set({
            ...user,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true }).then((doc) => {
            dispatch(userUpdated(id))
            return doc
        })
    }
}

export const usersLoading = () => {
    return {
        type: 'USERS_LOADING',
    }
}

export const receiveUser = user => ({
    type: 'RECEIVE_USER',
    user
})

export const userUpdated = id => ({
    type: 'USER_UPDATED',
    id
})

export const userFailed = error => ({
    type: 'USER_FAILED',
    error: error
})