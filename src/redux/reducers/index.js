import { combineReducers } from 'redux'
import auth from './authReducer'
import theme from './themeReducer'
import socket from './socketReducer'



export default combineReducers({
    auth,
    theme,
    socket
})