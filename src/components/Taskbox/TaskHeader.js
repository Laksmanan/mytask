import React from "react"
import { Grid, Row, Col, Form, FormControl, FormGroup, Dropdown, MenuItem, DropdownButton } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import TaskBar from './TaskBar';

import "react-datepicker/dist/react-datepicker.css";
import calendar from '../../images/cal.png';
import trash from '../../images/trash.svg';
import clock from '../../images/clock.svg';



class TaskHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskbox: false,
            date: "",
            taskId: "",
            taskData: {
                message: "",
                selectedDate: "",
                selectedTime: "",
                assignedUser: "",
            }
        }
    }

    openTaskHandler = () => {
        const task = this.state.taskbox
        const taskData = {...this.state.taskData}
        taskData.message = ""
        taskData.selectedDate = ""
        taskData.selectedTime = ""
        taskData.assignedUser = ""
        this.setState({taskData, taskId: "", date: "", taskbox: !task})
    }

    editHandler = async(id) => {
        const taskData = {...this.state.taskData}
        const res = await this.props.loadSingleTask(id, this.props.userData.token.token)
        if(res.status === "success") {
            const resData = res.results
            taskData.message = resData.task_msg
            taskData.selectedDate = this.selectedDate(resData.task_date, false)
            taskData.selectedTime = this.hourConvHandler(resData.task_time)
            taskData.assignedUser = resData.assigned_user
            const taskId = resData.id
            this.setState({taskData, taskId, taskbox: true})
        }
    }

    onChangeHandler = async(field, value) => {
        const taskData = {...this.state.taskData}
        taskData[field] = value
        this.setState({taskData})
    }

    hourConvHandler = (sec) => {
        let hours = Math.floor(sec / 3600);
        sec %= 3600;
        let minutes = Math.floor(sec / 60);
        if(hours >= 12) {
            return hours+":"+this.pad(minutes,2)+"pm"
        } else {
            return hours+":"+this.pad(minutes,2)+"am"
        }
    }

    secConvHandler = (time) => {
        const timeString = time.substring(0, time.length - 2);
        const arr = timeString.split(":");
        return arr[0]*3600+arr[1]*60;
    }

    dateFormatter = (date) => {
        const d = new Date(date)
        let curr_date = d.getDate();
        let curr_month = d.getMonth() + 1; 
        let curr_year = d.getFullYear();
        const selectedDate = curr_year + "-" + this.pad(curr_month, 2) + "-" + this.pad(curr_date, 2)
        return selectedDate
    }

    pad=(num, size)=> {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    selectedDate = (m, flow=true) => {
        const d = new Date(m)
        this.setState({date: m})
        let curr_date = d.getDate();
        let curr_month = d.getMonth() + 1; 
        let curr_year = d.getFullYear();
        const selectedDate = curr_month + "/" + curr_date + "/" + curr_year;
        return flow ? this.onChangeHandler("selectedDate", selectedDate) : selectedDate
    }

    selectHandler = () => {
        let selectBox = document.getElementById("user");
        let selectedValue = selectBox.options[selectBox.selectedIndex].value;
        this.onChangeHandler("assignedUser", selectedValue)
    }

    deleteHandler = async() => {
        const result = await this.props.loadDeleteTask(this.state.taskId, this.props.userData.token.token)
        if(result.code === 204){
            window.location.reload();
        }
    }

    cancelHandler = () => {
        this.setState({taskbox: false, date: "", taskId: ""});
    }

    saveHandler = async() => {
        const data = {...this.state.taskData}
        let taskData = {
            assigned_user : data.assignedUser,
            task_date: this.dateFormatter(data.selectedDate),
            task_time: this.secConvHandler(data.selectedTime),
            is_completed: 0,
            time_zone: -300,
            task_msg: data.message
        }
        console.log("taskData", taskData)
        const result = this.state.taskId ? await this.props.loadUpdateTask(taskData, this.state.taskId, this.props.userData.token.token) :
                await this.props.loadAddTask(taskData, this.props.userData.token.token)                            
        if(result.code === 201 || result.code === 202) {
            window.location.reload();
        }
    }

    calendarOpen= () => {
        this.calendar.setOpen(true);
    }

    render() {
        const taskCount = this.props.data.taskData.results ? this.props.data.taskData.results.length : 0;
        const userArr = this.props.userData.userList.length ? this.props.userData.userList.filter((user)=> user.user_status === "accepted") : []
        const time = ["0:30am", "1:00am", "1:30am", "2:00am", "2:30am", "3:00am", "3:30am", "4:00am",
                        "4:30am", "5:00am", "5:30am", "6:00am", "6:30am", "7:00am", "7:30am", "8:00am",
                        "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm",
                        "12:30pm", "13:00pm", "13:30pm", "14:00pm", "14:30pm", "15:00pm", "15:30pm", "16:00pm",
                        "16:30pm", "17:00pm", "17:30pm", "18:00pm", "18:30pm", "19:00pm", "19:30pm", "20:00pm",
                        "20:30pm", "21:00pm", "21:30pm", "22:00pm", "22:30pm", "23:00pm", "23:30pm", "0:00pm"  ]
        const formattedDate = this.state.date ? new Date(this.state.date):null
        return (
            <div>
            <Col lg={12} md={12} xs={12} sm={12} className="no-side task-header">
                <div>TASKS&nbsp;<span>{taskCount}</span>
                    <span className="plus-icon" 
                        onClick={()=>this.openTaskHandler()}>+</span>
                </div>
            </Col>

            {!this.state.taskbox  ? 
                <TaskBar editHandler={this.editHandler}
                details={this.props.data.taskData.results ? this.props.data.taskData.results : []} />: ''
            }
            
            {this.state.taskbox && 
                <Col lg={12} md={12} xs={12} sm={12} className="no-side task-open">
                    <Form>
                        <FormGroup controlId="description"  className="task-content">
                            <Col sm={12}>
                                Task Description
                            </Col>
                            <Col sm={12}>
                                <FormControl className="cust-input"
                                    name="description"
                                    value={this.state.taskData.message || ''}
                                    onChange={(e)=>this.onChangeHandler("message", e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        
                        <Col xs={6} className="no-side marginTop">
                        <FormGroup controlId="date"  className="task-content">
                            <Col sm={6}>
                                Date
                            </Col>
                            <Col sm={12} className="no-side1" >
                                <div>
                                <img src={calendar} alt="" className="calendarImg" 
                                    onClick={this.calendarOpen} />
                                <DatePicker 
                                    className="cust-input cust-inputDate"  
                                    popperPlacement="top"
                                    selected = {formattedDate}
                                    onChange={this.selectedDate} 
                                    ref={(r)=> this.calendar=r} />
                                </div>
                            </Col>
                        </FormGroup></Col>
                        
                        <Col xs={6} className="no-side marginTop">
                        <FormGroup controlId="iconClock"  className="task-content">
                            <Col sm={6}>
                                Time
                            </Col>
                            <Col sm={12}>
                                <div class="w3-dropdown-hover">
                                    <img src={clock} alt="clock" id="clockImg" />
                                    <input placeholder="Time" className="timeBtn" value={this.state.taskData.selectedTime || ''}/>
                                    <div class="w3-dropdown-content w3-bar-block w3-border">
                                        {time.map(item => <a href="#" class="w3-bar-item w3-button" value={item}
                                            onClick={()=>this.onChangeHandler("selectedTime", item)}>
                                                                {item}
                                                            </a>)}
                                    </div>
                                </div>
                            </Col>
                        </FormGroup></Col>

                        
                        <FormGroup controlId="user"  className="task-content">
                            <Col sm={12} className="marginTop">
                                Assigned User
                            </Col>
                            <Col sm={12}>

                                <select name="user" id="user" className="dropdown" onChange={()=>this.selectHandler()}>
                                    <option key="" value="-Select-">-Select-</option>
                                    {userArr.map(item => <option key={item.id} value={item.name}
                                        selected={this.state.taskData.assignedUser === item.name ? true : false}
                                        onClick={()=>this.selectHandler(item)}>{item.name}</option>)}
                                </select>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="saveCancelBtn">
                            <Col sm={4}>
                                {this.state.taskId && <span onClick={()=>this.deleteHandler()}>
                                    <img src={trash} id="deleteIcon" alt="delete" />
                                </span>
                                }
                            </Col>
                            <Col xs={4}>
                                <a className="cancelBtn" 
                                    onClick={()=>{this.cancelHandler()}}><span>Cancel</span>&nbsp;&nbsp;</a>
                            </Col>
                            <Col xs={4}>
                                <a className="saveBtn"
                                 onClick={()=>this.saveHandler()}><span>Save</span>&nbsp;&nbsp;</a>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            }   
            </div>
        );
    }
}

export default TaskHeader;