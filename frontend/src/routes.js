import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from '../containers/NavBar';
import LoginView from './views/LoginView';
import UserView from './views/UserView';
import UserEditView from './views/UserEditView';

export default (
    <Router>
        <NavBar />
        <Route
            exact path='/'
            render={() => 
                <LoginView 
                handleLoginSubmit={this.handleLoginSubmit}
                />
            }
        />
        <Route
            exact path='/profile'
            render={() => 
                <UserView 
                handleLoginSubmit={this.handleLoginSubmit}
                />
            }
        />
        <Route
            exact path="/profile/edit"
            render={() => <UserEditView user={this.state.currentUser} handleFormChange={this.handleFormChange} handleSubmit={this.handleSubmit}/>}
        />
    </Router>
)

