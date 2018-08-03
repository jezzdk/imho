const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.createUserProfile = functions.auth.user().onCreate((user) => {
    return admin.firestore().collection('profiles').doc(user.uid).set({
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
})