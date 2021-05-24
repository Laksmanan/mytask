import React from "react"
import { Grid, Row, Col } from 'react-bootstrap'

import TaskHeader from './TaskHeader'

class Taskbox extends React.Component {
    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        console.log("123")
        const data = {
            email : 'smithcheryl@yahoo.com',
            password : '12345678'
          }
        await this.props.loadToken(data)
        const token = this.props.userData.token.token
        if(token) {
            await this.props.loadUserId(token)
            await this.props.loadUserList()
            await this.props.loadGetTask(token)
        }

    }

    render() {
        return (
            <div>
                <Col lg={3} md={3} xs={4} sm={4} className="no-side">
                    <TaskHeader {...this.props} />
                </Col>
                
                <Col lg={2} md={2} xs={2} sm={2}></Col>
                
                <Col lg={4} md={4} xs={4} sm={4} className="no-side">
                </Col>
            </div>
        )
    }

}

export default Taskbox;