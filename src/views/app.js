import React from 'react'
import { Link } from 'react-router'
import { Grid, Row, Navbar, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'

export default class App extends React.Component {
  render() {
    return (
      <Grid>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Geldregler</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>

          </Nav>
        </Navbar>
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
