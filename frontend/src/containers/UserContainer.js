import React, { Component } from 'react';
import User from '../components/User';
import About from '../components/About';
import Donation from '../components/Donation';
import Contact from '../components/Contact';

class UserContainer extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            currentUser: {}
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/users")
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                users: data,
            }, () => this.setCurrentUser());
        })
        .catch(err=>console.log(err))
    }

    setCurrentUser() {
        console.log('IN setCurrentUser')
        this.setState({currentUser: this.state.users[3]}, () => console.log(this.state))
    }

    render() {
        return (
            <div>
                <User user={this.state.currentUser}/>
                <About about={this.state.currentUser.about}/>
                <Donation items={this.state.currentUser.items}/>
                <Contact user={this.state.currentUser}/>
            </div>
        );
    };

}

export default UserContainer;