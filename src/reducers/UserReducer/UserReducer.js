import {Task, User} from '../../actions/actionType'

const initialState = {
    isLoaded: false,
    isError: false,
    error: null,
    token: {
    },
    userId: {},
    userList: {}
}

export const UserReducer = (state, action) => {
    state=state||initialState

    switch(action.type) {
        case User.LOAD_USER_ERROR:
            return {
                ...state,
                isLoaded: false,
                isError: false,
                error: action.payload.error
            }
        case User.LOAD_USER_TOKEN_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                isError: false,
                error: null,
                token: action.payload.tokenData
            }
        case User.LOAD_USER_USERSUCCESS:
            return {
                ...state,
                isLoaded: true,
                isError: false,
                error: null,
                userID: action.payload.userIdData
            }
        case User.LOAD_USER_USERLISTSUCCESS:
            return {
                ...state,
                isLoaded: true,
                isError: false,
                error: null,
                userList: action.payload.userList
            }
        default:
            return state
    }
}