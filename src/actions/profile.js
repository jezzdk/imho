import { firebase, database } from '../firebase'

export const fetchProfile = (id) => {
    return function(dispatch) {
        dispatch(profileLoading(true))

        return database.collection('profiles').doc(id).onSnapshot(function(doc) {
            dispatch(profileLoading(false))

            if (doc.exists) {
                dispatch(receiveProfile({
                    id: doc.id,
                    ...doc.data()
                }))
            } else {
                // doc.data() will be undefined in this case
                //console.log("No such document!")
            }

            return doc
        })
        /*get().then(function(doc) {
        }).catch((error) => {
            dispatch(profileLoading(false))
            dispatch(profileFailed(error))
        })*/
    }
}

export const updateProfile = (id, user) => {
    return function(dispatch, getState) {
        return database.collection('profiles').doc(id).set({
            ...user,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true }).then((doc) => {
            return doc
        })
    }
}

export const profileLoading = status => {
    return {
        type: 'PROFILE_LOADING',
        status
    }
}

export const receiveProfile = user => ({
    type: 'RECEIVE_PROFILE',
    user
})

export const profileFailed = error => ({
    type: 'PROFILE_FAILED',
    error: error
})