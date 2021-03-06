import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state={
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps, prevState) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            //Check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null})
            }
        }

        //If authenticated, close modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }
    

    toggle = () =>{
        //Clear errors
        this.props.clearErrors(); 
        this.setState({modal: !this.state.modal})
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();

        const { name, email, password } = this.state;
    
        //Create user object
        const newUser = {
            name,
            email,
            password
        }

        //Attept to register
        this.props.register(newUser);

    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert>: null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Item</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mb-3"
                                    placeholder="Name"
                                    onChange={this.onChange}
                                />

                                <Label for="email">Email</Label>
                                <Input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mb-3"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="mb-3"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop:"2rem"}}
                                    block
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        isAuthenticated : state.auth.isAuthenticated,
        error: state.error
    }
}

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);