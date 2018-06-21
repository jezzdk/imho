import { storage } from '../firebase'

export const uploadImage = (file, process = undefined, error = undefined, success = undefined) => {
    return function(dispatch, getState) {
        let ref = storage.ref('image/' + Math.random().toString(36).substr(2, 9) + '_' + file.name).put(file)

        ref.on('state_changed', process, error, success)

        return ref.then(function(snapshot) {
            return snapshot.ref.getDownloadURL()
        })
    }
}