import React from "react"
import { Grid, Row, Col, } from 'react-bootstrap'

import tick from '../../images/tick.png';
import notify from '../../images/notify.svg';
import pen from '../../images/pen.svg';


class TaskBar extends React.Component {
    constructor(props) {
        super(props);
    }


render() {
    console.log("bar", this.props.details)
    return(
        this.props.details.map(d => 
    <Col lg={12} md={12} xs={12} sm={12} className="no-side task-header">
        <Col xs={2} className="no-side">
            <div id="profileBox"></div>
        </Col>
        <Col xs={5} className="no-side" id="descrptCol">
            <span id="descript">{d.task_msg}</span>
            <div id="descript" style={{color: "#d61a1a"}}>
                {d.task_date}
            </div>
        </Col>
        <Col xs={5} className="no-side" >
         <span onClick={()=>this.props.editHandler(d.id)}> <img id="pen" src={pen} alt="pen" /> </span>
        <img id="notify" src={notify} alt="notofication" />
        <img id="tick" src={tick} alt="tick" />
        </Col>
    </Col> 
        )
    )
}
}

export default TaskBar;