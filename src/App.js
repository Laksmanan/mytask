import './App.css';
import Taskbox from './container/Taskbox'


import { Grid, Row, Col } from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <Grid fluid={true} className="task-app">
        <Row>
          <Col lg={12} md={12} xs={12} sm={12} className="no-side">
            <Col lg={2} md={2} xs={2} sm={2} className="leftrail no-side"></Col>
            <Col lg={10} md={10} xs={10} sm={10}>
                <Row>
                  <Col lg={12} md={12} xs={12} sm={12} className="horizontal-line"></Col>
                  <Col lg={12} md={12} xs={12} sm={12} className="empty-space no-side"></Col>
                  <Col lg={12} md={12} xs={12} sm={12} >
                    <Taskbox />
                  </Col>
                </Row>
            </Col>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default App;
