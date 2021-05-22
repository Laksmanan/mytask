import { combineReducers } from 'redux'
import {TaskReducer} from './TaskReducer/TaskReducer'
import {UserReducer} from './UserReducer/UserReducer'

const rootReducer = combineReducers({
    TaskReducer,
    UserReducer,
})

export default rootReducer