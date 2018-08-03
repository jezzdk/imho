import { combineReducers } from 'redux'
import auth from './auth'
import comments from './comments'
import posts from './posts'
import profile from './profile'

export default combineReducers({
    auth,
    comments,
    posts,
    profile
})