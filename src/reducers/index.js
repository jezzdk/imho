import { combineReducers } from 'redux'
import auth from './auth'
import comments from './comments'
import posts from './posts'
import users from './users'

export default combineReducers({
    auth,
    comments,
    posts,
    users
})