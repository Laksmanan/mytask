import axios from 'axios'
import {Task, Env, Headers} from '../actionType'

export const loadGetTask = dataTab => dispatch => {
    const headers = Headers.headers
    headers.Authorization = 'Bearer ' + dataTab 
    dispatch(loadTaskRequest(dataTab))
    return axios({
        method: 'get',
        url: Env.url + 'task/lead_58be137bfde045e7a0c8d107783c4598',
        headers
    })  
        .then(function(response){
            dispatch(loadTaskSuccess(response.data))
        })
        .catch((error)=> {
            dispatch(loadTaskError(error.message))
        })
}

export const loadSingleTask = (dataTab, token) => dispatch => {
    const headers = Headers.headers
    headers.Authorization = 'Bearer ' + token 
    return axios({
        method: 'get',
        url: Env.url + 'task/lead_58be137bfde045e7a0c8d107783c4598/' + dataTab ,
        headers
    })  
        .then(function(response){
            return response.data
        })
        .catch((error)=> {
            return error
        })
}


export const loadAddTask = (dataTab, token) => dispatch => {
    const headers = Headers.headers
    headers.Authorization = 'Bearer ' + token 
    return axios({
        method: 'post',
        url: Env.url + 'task/lead_58be137bfde045e7a0c8d107783c4598',
        data: dataTab,
        headers
    })  
        .then(function(response){
            return response.data
        })
        .catch((error)=> {
            return error
        })
}

export const loadUpdateTask = (dataTab, taskId, token) => dispatch => {
    const headers = Headers.headers
    headers.Authorization = 'Bearer ' + token 
    return axios({
        method: 'put',
        url: Env.url + 'task/lead_58be137bfde045e7a0c8d107783c4598/' + taskId,
        data: dataTab,
        headers
    })  
        .then(function(response){
            return response.data
        })
        .catch((error)=> {
            return error
        })
}


export const loadDeleteTask = (dataTab, token) => dispatch => {
    const headers = Headers.headers
    headers.Authorization = 'Bearer ' + token 
    return axios({
        method: 'delete',
        url: Env.url + 'task/lead_58be137bfde045e7a0c8d107783c4598/' + dataTab,
        headers
    })  
        .then(function(response){
            return response.data
        })
        .catch((error)=> {
            return error
        })
}


export const updateData = (dataTab) => dispatch => {
    console.log("data", dataTab)
    dispatch(loadTaskSuccess(dataTab))
}

export const loadTaskRequest = dataTab => ({
    type: Task.LOAD_TASK_REQUEST,
    payload: dataTab
})


export const loadTaskSuccess = taskData => ({
    type: Task.LOAD_TASK_SUCCESS,
    payload: {taskData}
})

export const loadTaskError = error => ({
    type: Task.LOAD_TASK_ERROR,
    payload: error
})