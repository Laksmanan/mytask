import axios from 'axios'
import {User, Env, Headers} from '../actionType'

export const loadToken = dataTab => dispatch => {
    return axios({
        method: 'post',
        url: Env.url + 'login',
        data: dataTab,
        headers: Headers.headers
    })  
        .then(function(response){
            dispatch(loadTokenSuccess(response.data.results))
        })
        .catch((error)=> {
            dispatch(loadUserError(error.message))
        })
}

export const loadUserId = dataTab => dispatch => {
    const headers = Headers.headers
    headers.Authorization = 'Bearer ' + dataTab 
    return axios({
        method: 'get',
        url: Env.url + 'user',
        headers: headers
    })  
        .then(function(response){
            dispatch(loadUserSuccess(response.data.results))
        })
        .catch((error)=> {
            dispatch(loadUserError(error.message))
        })
}

export const loadUserList = dataTab => dispatch => {
    return axios({
        method: 'get',
        url: Env.url + 'team',
        headers: Headers.headers
    })  
        .then(function(response){
            dispatch(loadUserListSuccess(response.data.results))
        })
        .catch((error)=> {
            dispatch(loadUserError(error.message))
        })
}


export const loadTokenSuccess = tokenData => ({
    type: User.LOAD_USER_TOKEN_SUCCESS,
    payload: {tokenData}
})

export const loadUserSuccess = userIdData => ({
    type: User.LOAD_USER_USERSUCCESS,
    payload: {userIdData}
})

export const loadUserListSuccess = userList => ({
    type: User.LOAD_USER_USERLISTSUCCESS,
    payload: {userList}
})

export const loadUserError = error => ({
    type: User.LOAD_USER_ERROR,
    payload: error
})