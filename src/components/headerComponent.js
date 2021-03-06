import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem,NavbarToggler, Collapse, Jumbotron,Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label  } from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            isNavOpen:false,
            isModalOpen:false
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen
        });
    }

    toggleModal(event){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }

    handleLogin = (event)=>{
        this.toggleModal();

        alert(`Username: ${this.username.value}, Password: ${this.password.value}, Remember: ${this.remember.checked}`);

        event.preventDefault();
    }

    render(){
        return (
            <>
                <Navbar color="dark" dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick ={this.toggleNav}/>
                    <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ratatouille' /></NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                        </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button onClick={this.toggleModal} outline color='success'>
                                    <span className="fa fa-sign-in fa-lg"></span> Login
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ratatouille</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit minima debitis tempore! Ducimus, minima dicta?</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor='username'>Username</Label>
                                <Input type='text' name='username' innerRef ={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>password</Label>
                                <Input type='password' name='password' innerRef ={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type='checkbox' name='remember' innerRef ={(input) => this.remember = input} />Remember Me
                                </Label>
                            </FormGroup>
                            <Button type='submit' color='primary'>Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </>
        )
    }
}

export default Header;