import React, { Component } from 'react';
import '../App.css';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) =>{
        this.props.deleteItem(id); 
    }
    
    render() {
        const {items} = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-group">
                        {items.map(({ _id, name })=>(
                            <CSSTransition key={_id} timeout={500} className="">
                                <ListGroupItem>
                                    {this.props.isAuthenticated ? 
                                    <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={()=>this.onDeleteClick(_id)}
                                >&times;</Button>: '' }
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        item: state.item,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);