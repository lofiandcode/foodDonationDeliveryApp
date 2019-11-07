import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import User from '../components/User';
import About from '../components/About';
import DonationsContainer from '../containers/DonationsContainer';
import Contact from '../components/Contact';
import UserEditView from './UserEditView';
import MatchContainer from '../containers/MatchContainer';
import NavBar from '../containers/NavBar';
import LoginView from './LoginView';

class UserView extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            currentUser: {},
            newDonation: '',
            testDriver: {},
            testDonor: {},
            testFoodBank: {},
            testItem: {}
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        fetch("http://localhost:3000/api/v1/users")
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                users: data
            });
        })
        .catch(err=>console.log(err))
    }

    handleFormChange = (event) => {
        event.preventDefault();
        event.persist();
        // console.log(event.target.value)
        // console.log(event.target.name)
        this.setState({
            currentUser: {
                ...this.state.currentUser,
                [event.target.name]: event.target.value
            }
        })
        // , () => console.log(this.state.currentUser[event.target.name])
    }

    handleDonationChange = (event) => {
        event.preventDefault();
        event.persist();
        this.setState({
            newDonation: event.target.value
        })
    }
    // , () => console.log("newDonation = ", this.state.newDonation)

    handleDonationSubmit = (event) => {
        event.preventDefault();
        // console.log('About to POST newDonation')
        fetch(`http://localhost:3000/api/v1/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                item: {name: this.state.newDonation}
            })
        })
        .then(response => response.json())
        .then(json => this.joinItemAndCurrentUser(json))
        .catch(err => alert(err.message));
    }

    joinItemAndCurrentUser = (item) => {
        // console.log('item = ', item)
        // console.log('item.id = ', item.id)
        fetch('http://localhost:3000/api/v1/user_items', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_item: {
                    user_id: this.state.currentUser.id,
                    item_id: item.id
                }
            })
        })
        .then(() => this.clearForm())
        .catch(err => alert(err.message));
        // .then(response => response.json())
        // .then(json => console.log('join post = ', json))

    }

    clearForm = () => {
        // console.log('In ClearForm user_item = ', user_item)
        console.log('clearForm users = ', this.state.users);
        this.setState({
            testDriver: {
            name: 'John Doe',
            phoneNum: '(206) 555-5555'
            },
            testDonor: {
            name: 'Icicle Seafoods',
            address: "4019 21st Ave W, Seattle, WA 98199"
            },
            testFoodBank: {
            name: 'Ballard Food Bank',
            address: '5130 Leary Ave NW, Seattle, WA 98107'
            },
            testItem: {
            name: this.state.newDonation
            }
        }, () => this.resetUsers())
        
    }

    resetUsers = () => {
        console.log('IN resetUsers()')
        this.getUsers();
        this.setCurrentUser(this.state.currentUser.username, this.state.currentUser.password)
        this.setState({newDonation: ''})
    }

    handleLoginSubmit = (loginData) => {
        console.log("IN handleLoginSubmit")
        console.log('Username/Password = ', loginData)
        this.setCurrentUser(loginData.username, loginData.password)
    }

    setCurrentUser = (username, password) => {
        console.log('IN setCurrentUser()')
        const loginUser = this.state.users.filter ( user => {
            // console.log('***********************************')
            // console.log('username = ', username)
            // console.log('password = ', password)
            // console.log('user.username = ', user.username)
            // console.log('user.password = ', user.password)
            // console.log("user.username === username && user.password === password is ", user.username === username && user.password === password)
            // console.log('***********************************')
            if (user.username === username && user.password === password) {
                console.log('returned true')
                 return true;
            } else {
                console.log('returned false')
                 return false;
            }
         })
        //  console.log('ABOUT TO SET CURRENTUSER IN STATE')
         this.setState({currentUser: loginUser[0]}, () => console.log('After setCurrentUser, currentUser = ', this.state.currentUser))
    }

//   this.props.history.push('/moneyform');

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({
                name: this.state.currentUser.name,
                role: this.state.currentUser.role,
                phoneNum: this.state.currentUser.phoneNum,
                about: this.state.currentUser.about
            })
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => alert(err.message));
    }

    render() {
        // console.log("%crender fires", "color:red;")
        // console.log('currentUser at render = ', this.state.currentUser)
        return (
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
                    exact path="/profile"
                    render={() => {
                        // console.log("%cProfile render fires", "color:RED;")
                        return (
                            <div>
                                <User user={this.state.currentUser}/>
                                <About user={this.state.currentUser}/>
                                <DonationsContainer 
                                    user={this.state.currentUser} 
                                    handleDonationChange={this.handleDonationChange} 
                                    newDonation={this.state.newDonation} 
                                    handleDonationSubmit={this.handleDonationSubmit}
                                />
                                <Contact user={this.state.currentUser}/>
                                <MatchContainer 
                                    driver={this.state.testDriver}
                                    donor={this.state.testDonor}
                                    food_bank={this.state.testFoodBank} 
                                    items={this.state.testItem}
                                />
                            </div>
                        )
                    }}
                />
                <Route
                    exact path="/profile/edit"
                    render={() => <UserEditView user={this.state.currentUser} handleFormChange={this.handleFormChange} handleSubmit={this.handleSubmit}/>}
                    />
            </Router>
        );
    };

}

export default UserView;