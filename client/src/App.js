import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import {loadUser} from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    
    render() {
        return (
            <Provider store={store}>
                <div>
                    <AppNavBar/>
                    <Container>
                        <ItemModal/>
                        <ShoppingList/>
                    </Container>
                </div>
            </Provider>  
        );
    }
}

export default App;