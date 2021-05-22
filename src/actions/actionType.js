export const Env = {
    env: "",
    url: "https://stage.api.sloovi.com/"
}

export const Headers = {
    headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',          
    }
}

export const Task = {
    LOAD_TASK_REQUEST: 'LOAD_TASK_REQUEST', 
    LOAD_TASK_SUCCESS: 'LOAD_TASK_SUCCESS',
    LOAD_TASK_ERROR: 'LOAD_TASK_ERROR'
}

export const User = {
    LOAD_USER_TOKEN_SUCCESS: 'LOAD_USER_TOKEN_SUCCESS', 
    LOAD_USER_USERSUCCESS: 'LOAD_USER_USERSUCCESS',
    LOAD_USER_USERLISTSUCCESS: 'LOAD_USER_USERLISTSUCCESS',
    LOAD_USER_ERROR: 'LOAD_USER_ERROR'
}