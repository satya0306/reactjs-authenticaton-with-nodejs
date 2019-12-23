import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem, 
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal'; 
import Logout from './auth/Logout';

class AppNavBar extends Component {
    state={
        isOpen: false
    }

    toggle = () =>{
        this.setState({isOpen: !this.state.isOpen})
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <>
                <NavItem className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.name}`: ''}</strong>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </>
        );

        const guestLinks = (
            <>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </>
        );

        return (
            <div>
                <Navbar color="dark" dark expend="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href='/'>ShoppingList</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen = {this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(AppNavBar);