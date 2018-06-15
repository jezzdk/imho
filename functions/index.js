const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.createUserProfile = functions.auth.user().onCreate((user) => {
    return admin.firestore().collection('users').doc(user.uid).set({
        displayName: user.displayName,
        photoURL: user.photoURL,
        gender: 'Male',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
})