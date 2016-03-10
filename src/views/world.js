import React from 'react'
import { Link } from 'react-router'
import { Row, Col, Panel } from 'react-bootstrap'

export default class World extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={18} md={12}>
          <Panel header="Test">
            <Link to="/simulation">Simulation</Link>
          </Panel>
        </Col>
      </Row>
    )
  }
}
