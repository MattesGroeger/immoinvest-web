import React from 'react'
import ga from 'react-ga'
import { IndexLink } from 'react-router'
import { Grid, Row, Navbar, Nav, NavItem, Modal, Button } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    ga.modalview('/disclaimer')
    this.state = { showModal: process.env.ENV === 'production' }
  }

  close() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <Grid>
        <Navbar fixedTop>
          <Navbar.Brand className="navbar-right">
            <IndexLink to="/" activeClassName="active">Immoinvest</IndexLink>
          </Navbar.Brand>
          <Nav>
            <IndexLinkContainer to="/" activeClassName="active">
              <NavItem>Immobilien-Regler</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to="/faq" activeClassName="active">
              <NavItem>FAQ</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to="/imprint" activeClassName="active">
              <NavItem>Impressum</NavItem>
            </IndexLinkContainer>
          </Nav>
        </Navbar>
        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Hinweis</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Mit diesem Tool können Sie die Auswirkungen verschiedenster Parameter auf Ihr Immobilieninvestment simulieren.</p>
            <p>Die zugrundeliegenden Berechnungen erfolgen nach besten Wissen und Gewissen und erheben keinen Anspruch auf Korrektheit und Vollständigkeit.</p>
            <p>Die Benutzung erfolgt daher auf eigene Gefahr. Eine Investmententscheidung sollte nicht allein auf diesem Tool beruhen.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Ok, Verstanden</Button>
          </Modal.Footer>
        </Modal>
        {this.props.children}
      </Grid>
    )
  }
}

// <IndexLinkContainer to="/simulation" activeClassName="active">
//   <NavItem>Investment</NavItem>
// </IndexLinkContainer>
// <IndexLinkContainer to="/world" activeClassName="active">
//   <NavItem>Test</NavItem>
// </IndexLinkContainer>
