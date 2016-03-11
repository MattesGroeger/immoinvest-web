import React from 'react'
import { IndexLink } from 'react-router'
import { Grid, Row, Navbar, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'

export default class App extends React.Component {
  render() {
    return (
      <Grid>
        <Navbar fixedTop>
          <Navbar.Brand className="navbar-right">
            <IndexLink to="/" activeClassName="active">Geldregler.de</IndexLink>
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
