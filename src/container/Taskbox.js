import { connect } from 'react-redux'
import Taskbox from '../components/Taskbox'
import {updateData, loadGetTask, loadAddTask, loadSingleTask, loadUpdateTask, loadDeleteTask} from '../actions/TaskAction/TaskAction'
import {loadToken, loadUserId, loadUserList,} from '../actions/UserAction/UserAction'


const mapStateToProps = state => {
    return {
        data: state.TaskReducer,
        userData: state.UserReducer
    }
}

const mapDispatchToProps = dispatch => ({
    loadToken: (dataTab) => dispatch(loadToken(dataTab)),
    loadUserId: (dataTab) => dispatch(loadUserId(dataTab)),
    loadUserList: (dataTab) => dispatch(loadUserList(dataTab)),
    updateData: (dataTab) => dispatch(updateData(dataTab)),
    loadGetTask: (dataTab) => dispatch(loadGetTask(dataTab)),
    loadAddTask: (dataTab, token) => dispatch(loadAddTask(dataTab, token)),
    loadSingleTask: (id, dataTab) => dispatch(loadSingleTask(id, dataTab)),
    loadDeleteTask: (dataTab, token) => dispatch(loadDeleteTask(dataTab, token)),
    loadUpdateTask: (dataTab, taskId, token) => dispatch(loadUpdateTask(dataTab, taskId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Taskbox)