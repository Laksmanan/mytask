import {Task} from '../../actions/actionType'

const initialState = {
    isLoaded: false,
    isError: false,
    error: null,
    taskData: {
        status: "close",
        description: "Follow up",
        date: "",
        time: "",
        user: ""
    }
}

export const TaskReducer = (state, action) => {
    state=state||initialState

    switch(action.type) {
        case Task.LOAD_TASK_REQUEST:
            return {
                ...state,
                isLoaded: false,
                isError: false,
                error: null
            }
        case Task.LOAD_TASK_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                isError: false,
                error: null,
                taskData: action.payload.taskData
            }
        case Task.LOAD_TASK_ERROR:
            return {
                ...state,
                isLoaded: true,
                isError: false,
                error: action.payload.error,
                taskData: {}
            }
        default:
            return state
    }
}