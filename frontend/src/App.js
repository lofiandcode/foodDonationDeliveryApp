import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import UserView from './views/UserView';
import NavBar from './containers/NavBar';
import LoginView from './views/LoginView';
import UserEditView from './views/UserEditView';
import CreateProfileView from './views/CreateProfileView';
import AddressView from './views/AddressView';
import MatchesView from './views/MatchesView';
require("dotenv").config()

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import NavBar from './containers/NavBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
        users: [],
        currentUser: {},
        newDonation: '',
        activeItem: 'logout',
        loggedIn: false,
        loginError: false,
        testDriver: '',
        testDonor: '',
        testFoodBank: '',
        testItem: '',
        donorUserItem: {},
        donationNeededFoodBanks: [],
        foodBankDistancesToDonor: [],
        drivers: [],
        driverDistancesToDonor: [],
        possiblDrivers: [],
        matches: []
    }
  }
  componentDidMount() {
      this.getUsers();
  }

  distanceAPITest = () => {
    this.getUsers(this.callDistanceAPI)
  }

  callDistanceAPI = (origins, destinations, callback = () => console.log('')) => {
    const service = new this.props.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: origins,
        destinations: destinations,
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: false,
        unitSystem: window.google.maps.UnitSystem.IMPERIAL
      }, (response, status) => this.handleAPIResponse(response, status, callback));
  }
  handleAPIResponse = (response, status,callback = () => console.log('')) => {
    if (status === 'OK') {
      callback(response);
    } else {
      console.log('status: ', status)
    }
  }

  getUsers = (callback = ()=>console.log('')) => {
      fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(data => {
          this.setState({
              users: data
          });
      })
      .then(() => {
        if (this.state.currentUser !== {}) {
          this.setCurrentUser(this.state.currentUser.username, this.state.currentUser.password)
        }
      })
      .then(callback)
      .catch(err=>console.log(err))
  }
  getUserItems = (callback = ()=>console.log('')) => {
    fetch("http://localhost:3000/api/v1/user_items")
    .then(resp => resp.json())
    .then(data => {
        this.setState({
            user_items: data
        });
    })
    .then(() => {
      if (this.state.currentUser !== {}) {
        this.setCurrentUser(this.state.currentUser.username, this.state.currentUser.password)
      }
    })
    .then(callback)
    .catch(err=>console.log(err))
}
  resetUsersAndDonation = (callback = ()=>console.log('')) => {
      this.getUsers(callback);
      this.setState({newDonation: ''})
  }
  setCurrentUser = (username, password) => {
    const users = [...this.state.users]
    const loginUser = users.filter ( user => {
        if (user.username === username && user.password === password) {
            return true;
        } else {
            return false;
        }
    })
    if (loginUser.length === 1) {
      this.setState({currentUser: loginUser[0], loggedIn: true}, () => console.log('currentUser = ', this.state.currentUser))
    } else {
      this.setState({loginError: true, loggedIn: false, currentUser: {}}, () => console.log('LOGIN ERROR = ', this.state.loginError))
      
    }
  }
  joinItemAndCurrentUser = (item) => {
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
    .then(resp => resp.json())
    .then(data => this.resetUsersAndDonation(() => this.getFoodBanksThatNeedDonation(data)))
    .catch(err => alert(err.message));
  }

  getFoodBanksThatNeedDonation = (user_item) => {
    const donation = user_item.item.name;
    const foodBanks = this.getFoodBanks();
    const donationNeededFoodBanks = foodBanks.filter(foodBank => {
      const matchedItems = foodBank.items.filter(item => item.name === donation)
      return matchedItems.length > 0; 
    });
    const foodBankAddresses = donationNeededFoodBanks.map(foodBank => foodBank.locations[0].address);
    this.setState({donorUserItem: user_item, donationNeededFoodBanks: donationNeededFoodBanks},this.callDistanceAPI([this.state.currentUser.locations[0].address], foodBankAddresses, this.saveFoodBankDistancesToDonor));
  }
  saveFoodBankDistancesToDonor = (distanceMatrix) => {
    const distances = this.parseDistanceDataOneOrigin(distanceMatrix, 0);
    const foodBankDistances = this.createUserDistancesObjects([...this.state.donationNeededFoodBanks], distances, 'distanceToDonor');
    this.setState({foodBankDistancesToDonor: foodBankDistances},() => this.findDriversDistancesToDonor())
  }
  createUserDistancesObjects = (arrayOfUsers, arrayOfDistances, distanceTo) => {
    const result = [];
    arrayOfUsers.forEach((user, idx) => {
      result.push({[user.role]: user, [distanceTo]: arrayOfDistances[idx]})
    })
    return result;
  }
  parseDistanceDataOneOrigin = (distanceMatrix, idx) => {
    return distanceMatrix.rows[idx].elements.map(element => {
      const length = element.distance.text.length
      const distance = element.distance.text.slice(0,length-3)
      return parseFloat(distance)
    })
  }
  parseDistanceDataOneDestination = (distanceMatrix, idx) => {
    return distanceMatrix.rows.map(row => {
      const length = row.elements[idx].distance.text.length
      const distance = row.elements[idx].distance.text.slice(0,length-3)
      return parseFloat(distance)
    })
  }
  getFoodBanks = () => {
    const users = [...this.state.users];
    const foodBands = users.filter(user => user.role === 'food bank')
    return foodBands
  }
  getDrivers = () => {
    const users = [...this.state.users];
    const drivers = users.filter(user => user.role === 'driver')
    return drivers
  }
  findDriversDistancesToDonor = () => {
    const drivers = this.getDrivers();
    const driversLocations = drivers.map(driver => driver.locations[0].address);
    this.setState({drivers: drivers},() => this.callDistanceAPI(driversLocations, [this.state.currentUser.locations[0].address], this.saveDriversDistancesToDonor));
  }
  saveDriversDistancesToDonor = (distanceMatrix) => {
    const distances = this.parseDistanceDataOneDestination(distanceMatrix, 0);
    const drivers = [...this.state.drivers];
    const driverDistancesToDonor = this.createUserDistancesObjects(drivers, distances, 'distanceToDonor');
    this.setState({ driverDistancesToDonor }, () => this.setPossibleDrivers());
  }
  setPossibleDrivers = () => {
    const driverDistancesToDonor = [...this.state.driverDistancesToDonor];
    const possiblDrivers = driverDistancesToDonor.filter(distanceObj => distanceObj.distanceToDonor <= distanceObj.driver.locations[0].milesFrom);
    this.setState({possiblDrivers}, () => this.findPossibleDriverDistancesToFoodBanks());
  }
  findPossibleDriverDistancesToFoodBanks = () => {
    const drivers = [...this.state.possiblDrivers]
    const foodBanks = [...this.state.donationNeededFoodBanks]
    const driversLocations = drivers.map(obj => obj.driver.locations[0].address)
    const foodBanksLocations = foodBanks.map(foodBank => foodBank.locations[0].address)
    this.callDistanceAPI(driversLocations, foodBanksLocations, this.filterDriversDistancesToFoodBanks)
  }
  filterDriversDistancesToFoodBanks = (distanceMatrix) => {
    const possibleDrivers = [...this.state.possiblDrivers]
    const drivers = possibleDrivers.map(obj => obj.driver)
    let tempObj = {};
    let tempDistances = []
    const distanceResultsObj = drivers.map((driverObj, idx)=> {
      const tempFoodBanks = [...this.state.donationNeededFoodBanks];
      tempDistances = this.parseDistanceDataOneOrigin(distanceMatrix, idx)
      const foodBankDistancesObjects = tempFoodBanks.map((foodBank, idx) => {
        return {foodBank: {...foodBank}, distanceToFoodBank: tempDistances[idx]}
      })
      tempObj = {driver: driverObj, distancesToFoodBanks: foodBankDistancesObjects}
      return tempObj
    })
    const filterResult = distanceResultsObj.map(obj => {
      const distances = [...obj.distancesToFoodBanks]
      const milesFrom = obj.driver.locations[0].milesFrom
      const temp = distances.filter(distanceObj => distanceObj.distanceToFoodBank <= milesFrom)
      const objResult = {...obj, distancesToFoodBanks: temp}
      return objResult
    })
    const matches = filterResult.filter(obj => obj.distancesToFoodBanks.length > 0)
    this.setState({matches}, () => this.saveMatchesToDB())
  }
  saveMatchesToDB = () => {
    this.state.matches.forEach((match, idx) => {
      match.distancesToFoodBanks.forEach(obj => {
        this.postToMatchTable(match.driver.id, this.state.donorUserItem.id, obj.foodBank.id, false, false)
      })
    })
    this.getUserItems()
  }

  postToMatchTable = (driver_user_id, donor_user_item_id, food_bank_user_id, completed = false, accepted = false) => {
    fetch('http://localhost:3000/api/v1/matches', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            match: {
              driver_user_id,
              donor_user_item_id,
              food_bank_user_id,
              completed,
              accepted
            }
        })
    })
    .then(response => response.json())
    .then(data => console.log('Match Table response = ', data))
    .then(() => this.getUserItems())
    // .catch(err => alert(err.message));
  }

  joinLocationAndCurrentUser = (location) => {
    fetch('http://localhost:3000/api/v1/user_locations', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user_location: {
                user_id: this.state.currentUser.id,
                location_id: location.id
            }
        })
    })
    .then(() => this.getUsers())
    .catch(err => alert(err.message));
    // .then(response => response.json())

}

  handleDonationChange = (event) => {
    event.preventDefault();
    event.persist();
    this.setState({
        newDonation: event.target.value
    });
  }

  handleLoginSubmit = (loginData) => {
      this.setCurrentUser(loginData.username, loginData.password);
      this.setState({activeItem: 'home'});
  }
  handleCreateAccountSubmit = (event, newUser) => {
      event.preventDefault();
      fetch('http://localhost:3000/api/v1/users/', {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
          },
          body: JSON.stringify({
              name: newUser.name,
              username: newUser.username,
              password: newUser.password,
              role: 'driver',
              phoneNum: newUser.phoneNum,
              about: newUser.about
          })
      })
      .then(response => response.json())
      .then(data => this.setState({currentUser: data}, () => this.getUsers()))
      .catch(err => alert(err.message));
  }
  handleAddressSubmit = (locationName, newAddress, milesFrom) => {
    this.setState({activeItem: 'home'})
    fetch('http://localhost:3000/api/v1/locations/', {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
            name: locationName,
            address: newAddress,
            milesFrom: milesFrom
        })
    })
    .then(response => response.json())
    .then(data => this.joinLocationAndCurrentUser(data))
    .catch(err => alert(err.message));
  }
  handleUserEditFormSubmit = (event, userUpdate) => {
    event.preventDefault();
    this.setState({activeItem: 'home'})
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
            name: userUpdate.name,
            role: userUpdate.role,
            username: userUpdate.username,
            password: userUpdate.password,
            phoneNum: userUpdate.phoneNum,
            about: userUpdate.about
        })
    })
    .then(response => response.json())
    .then(data => this.setState({currentUser: data}, () => console.log(this.state.currentUser)))
    .catch(err => alert(err.message));
}
  handleDonationSubmit = (event) => {
    event.preventDefault();
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

  handleNavBarItemClick = name => this.setState({ activeItem: name })
  handleNavBarLogoutClick = name => this.setState({activeItem: name, currentUser: {}, loggedIn: false, loginError: false})

  render() {
    return (
      <Fragment>
        <Router>
        <Route
            exact path='/'
            render={() => 
              <LoginView 
                handleLoginSubmit={this.handleLoginSubmit}
                loggedIn={this.state.loggedIn}
              />
            }
          />
          <Route path='/profile/'>
            <NavBar 
              handleNavBarItemClick={this.handleNavBarItemClick}
              handleNavBarLogoutClick={this.handleNavBarLogoutClick}
              activeItem={this.state.activeItem}
            />
            <Route 
              exact path='create'
              render={() =>
                <CreateProfileView handleCreateAccountSubmit={this.handleCreateAccountSubmit}/>
              }
            />
            <Route 
              exact path='address'
              render={() =>
                <AddressView handleAddressSubmit={this.handleAddressSubmit}/>
              }
            />
            <Route
              exact path='/profile'
              render={() => 
                <UserView 
                  currentUser={this.state.currentUser}
                  newDonation={this.state.newDonation}
                  handleDonationChange={this.handleDonationChange}
                  handleDonationSubmit={this.handleDonationSubmit}
                  testDriver={this.state.testDriver}
                  testDonor={this.state.testDonor}
                  testFoodBank={this.state.testFoodBank} 
                  testItem={this.state.testItem}
                />
              }
            />
            <Route
              exact path="/profile/matches"
              render={() => 
                <MatchesView />
              }
            />
            <Route
              exact path="/profile/edit"
              render={() => 
                <UserEditView 
                  currentUser={this.state.currentUser} 
                  handleUserEditFormSubmit={this.handleUserEditFormSubmit}
                />
              }
            />
          </Route>
        </Router>
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: REACT_APP_API_KEY
})(App);
