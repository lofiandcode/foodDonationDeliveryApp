import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {GoogleApiWrapper} from 'google-maps-react';
// import logo from './logo.svg';
import './App.css';
import UserView from './views/UserView';
import NavBar from './containers/NavBar';
import LoginView from './views/LoginView';
import UserEditView from './views/UserEditView';
import CreateProfileView from './views/CreateProfileView';
import AddressView from './views/AddressView';
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
        loggedIn: false,
        loginError: false,
        testDriver: '',
        testDonor: '',
        testFoodBank: '',
        testItem: '',
        donationNeededFoodBanks: [],
        foodBankDistancesToDonor: [],
        drivers: [],
        driverDistancesToDonor: [],
        possiblDrivers: []
    }
  }
  componentDidMount() {
      this.getUsers();
      console.log(REACT_APP_API_KEY)
      // console.log('About to fetch')
      // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1411+4th+Avenue,
      // +Seattle,+WA+98101&key=${REACT_APP_API_KEY}`)
      // .then(response => response.json())
      // .then(data => console.log('Geocode API response = ', data))
      // console.log("currentUser = ", this.state.currentUser)
      // this.distanceAPITest();
  }

  distanceAPITest = () => {
    this.getUsers(this.callDistanceAPI)
  }

  callDistanceAPI = (origins, destinations, callback = () => console.log('')) => {
    // console.log('users[0].location = ',this.state.users[0].locations[0].address)
    // console.log('users[12].location.address = ',this.state.users[12].locations[0].address)
    // console.log('users[18].location.address = ',this.state.users[18].locations[0].address)
    // console.log('users[20].location.address = ',this.state.users[20].locations[0].address)
    // console.log('users[21].location.address = ',this.state.users[21].locations[0].address)
    // console.log('users[23].location.address = ',this.state.users[23].locations[0].address)
    // const origin1 = this.state.users[0].locations[0].address;
    // const destinationA = this.state.users[12].locations[0].address;
    // const destinationB = this.state.users[18].locations[0].address;
    // const destinationC = this.state.users[20].locations[0].address;
    // const destinationD = this.state.users[21].locations[0].address;
    // const destinationE = this.state.users[23].locations[0].address;
    // const origins = [origin1];
    // const destinations = [destinationA, destinationB, destinationC, destinationD, destinationE];
    // const travelMode = 'DRIVING';
    console.log('ABOUT TO CALL DISTANCE API')
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
    console.log('Distance API response = ', response)
    console.log('status = ', status)
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
  resetUsersAndDonation = (callback = ()=>console.log('')) => {
    // console.log('IN resetUsers(), currentUser = ', this.state.currentUser)
    // console.log('In resetUsers() and about to reset users')
      this.getUsers(callback);
      this.setState({newDonation: ''})
  }
  setCurrentUser = (username, password) => {
    // console.log('IN setCurrentUser(), username = ', username)
    // console.log('IN setCurrentUser(), password = ', password)
    const users = [...this.state.users]
    const loginUser = users.filter ( user => {
        // console.log('***********************************')
        // console.log('username = ', username)
        // console.log('password = ', password)
        // console.log('user.username = ', user.username)
        // console.log('user.password = ', user.password)
        // console.log("user.username === username && user.password === password is ", user.username === username && user.password === password)
        // console.log('***********************************')
        if (user.username === username && user.password === password) {
            // console.log('returned true')
            return true;
        } else {
            // console.log('returned false')
            return false;
        }
    })
    //  console.log('ABOUT TO SET CURRENTUSER IN STATE')
  if (loginUser.length === 1) {
    this.setState({currentUser: loginUser[0], loggedIn: true}, () => console.log('currentUser = ', this.state.currentUser))
  } else {
    this.setState({loginError: true, loggedIn: false, currentUser: {}}, () => console.log('LOGIN ERROR = ', this.state.loginError))
    
  }
    //  , () => console.log('After setCurrentUser, currentUser = ', this.state.currentUser)
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
      .then(resp => resp.json())
      .then(data => this.resetUsersAndDonation(() => this.getFoodBanksThatNeedDonation(data)))
      .catch(err => alert(err.message));
      // .then(response => response.json())
      // .then(json => console.log('join post = ', json))

  }

  getFoodBanksThatNeedDonation = (user_item) => {
    console.log('In getFoodBanksThatNeedDonation user_item = ', user_item)
    const donation = user_item.item.name
    console.log('donation = ', donation)
    console.log('Users = ', this.state.users)
    const foodBanks = this.getFoodBanks()
    console.log('foodBanks = ', foodBanks)
    const donationNeededFoodBanks = foodBanks.filter(foodBank => {
      const matchedItems = foodBank.items.filter(item => item.name === donation)
      return matchedItems.length > 0; 
    })
    console.log('donationNeededFoodBanks = ', donationNeededFoodBanks)
    const foodBankAddresses = donationNeededFoodBanks.map(foodBank => foodBank.locations[0].address)
    console.log('foodBankAddresses = ', foodBankAddresses)
    this.setState({donationNeededFoodBanks: donationNeededFoodBanks},this.callDistanceAPI([this.state.currentUser.locations[0].address], foodBankAddresses, this.saveFoodBankDistancesToDonor));
  }
  saveFoodBankDistancesToDonor = (distanceMatrix) => {
    console.log('In sortFoodBanksByDistanceFromCurrentUser()')
    console.log('**ATTENTION** this.state.donationNeededFoodBanks = ',this.state.donationNeededFoodBanks);
    console.log('distanceMatrix = ', distanceMatrix);
    const distances = this.parseDistanceDataOneOrigin(distanceMatrix, 0)
    console.log(distances)
    const foodBankDistances = this.createUserDistancesObjects([...this.state.donationNeededFoodBanks], distances, 'distanceToDonor')
    console.log('foodBankDistances',foodBankDistances)
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
    const drivers = this.getDrivers()
    // console.log('drivers = ', drivers)
    const driversLocations = drivers.map(driver => driver.locations[0].address)
    console.log('driversLocations = ', driversLocations)
    console.log('currentUserLOcation= ', this.state.currentUser.locations[0].address)
    this.setState({drivers: drivers},() => this.callDistanceAPI(driversLocations, [this.state.currentUser.locations[0].address], this.saveDriversDistancesToDonor));
  }
  saveDriversDistancesToDonor = (distanceMatrix) => {
    console.log('distanceMatrix = ', distanceMatrix)
    const distances = this.parseDistanceDataOneDestination(distanceMatrix, 0)
    console.log('distances = ', distances)
    console.log('drivers = ', this.state.drivers)
    const drivers = [...this.state.drivers]
    const driverDistancesToDonor = this.createUserDistancesObjects(drivers, distances, 'distanceToDonor')
    console.log('driverDistancesToDonor = ', driverDistancesToDonor)
    this.setState({ driverDistancesToDonor }, () => this.setPossibleDrivers())
  }
  setPossibleDrivers = () => {
    const driverDistancesToDonor = [...this.state.driverDistancesToDonor]
    const possiblDrivers = driverDistancesToDonor.filter(distanceObj => distanceObj.distanceToDonor <= distanceObj.driver.locations[0].milesFrom)
    console.log('possibleDrivers = ', possiblDrivers)
    this.setState({possiblDrivers}, () => this.findPossibleDriverDistancesToFoodBanks())
  }
  findPossibleDriverDistancesToFoodBanks = () => {
    console.log('In findPossibleDriverDistancesToFoodBanks')
    const drivers = [...this.state.possiblDrivers]
    const foodBanks = [...this.state.donationNeededFoodBanks]
    console.log('drivers = ', drivers)
    console.log('foodBanks = ', foodBanks)
    // console.log('drivers = ', drivers)
    const driversLocations = drivers.map(obj => obj.driver.locations[0].address)
    const foodBanksLocations = foodBanks.map(foodBank => foodBank.locations[0].address)
    console.log('driversLocations = ', driversLocations)
    console.log('foodBanksLocations = ', foodBanksLocations)
    this.callDistanceAPI(driversLocations, foodBanksLocations, this.filterDriversDistancesToFoodBanks)
  }
  filterDriversDistancesToFoodBanks = (distanceMatrix) => {
    console.log('***ATTENTION*** IN filterDriversDistancesToFoodBanks')
    console.log('this.state = ', this.state )
    console.log('distanceMatrix = ', distanceMatrix)
    const possibleDrivers = [...this.state.possiblDrivers]
    const drivers = possibleDrivers.map(obj => obj.driver)
    console.log('possibleDrivers = ', drivers)
    let tempObj = {};
    let tempDistances = []
    console.log('this.state.donationNeededFoodBanks = ', [...this.state.donationNeededFoodBanks])
    // const donationNeededFoodBanks = [...this.state.donationNeededFoodBanks];
    // console.log('foodBanks = ', donationNeededFoodBanks)
    console.log('this.state.donationNeededFoodBanks = ', [...this.state.donationNeededFoodBanks])
    const distanceResultsObj = drivers.map((driverObj, idx)=> {
      const tempFoodBanks = [...this.state.donationNeededFoodBanks];
      tempDistances = this.parseDistanceDataOneOrigin(distanceMatrix, idx)
      const foodBankDistancesObjects = tempFoodBanks.map((foodBank, idx) => {
        return {foodBank: {...foodBank}, distanceToFoodBank: tempDistances[idx]}
      })
      tempObj = {driver: driverObj, distancesToFoodBanks: foodBankDistancesObjects}
      console.log('tempObj = ', tempObj)
      return tempObj
    })
    console.log('***ATTENTION*** distanceResultsObj = ',distanceResultsObj)

    const filterResult = distanceResultsObj.map(obj => {
      console.log('STARTING NEXT distanceResultsObj MAP') 
      console.log('obj = ', obj)
      console.log('obj.distancesToFoodBanks = ',obj.distancesToFoodBanks)
      const distances = [...obj.distancesToFoodBanks]
      const milesFrom = obj.driver.locations[0].milesFrom
      const temp = distances.filter(distanceObj => distanceObj.distanceToFoodBank <= milesFrom)
      console.log('FILTER RESULT temp = ', temp)
      const objResult = {...obj, distancesToFoodBanks: temp}
      return objResult
    })
    console.log("filterResult = ", filterResult)
    //********************************* */
    //Okay distanceResultObj has the right distances with the right driver.
    //Now you just have to filter our the distances that aren't in drivers range
    //********************************* */

    // const distancesIdx0 = this.parseDistanceDataOneOrigin(distanceMatrix, 0)
    // const distancesIdx1 = this.parseDistanceDataOneOrigin(distanceMatrix, 1)
    // console.log('distancesIdx0 = ', distancesIdx0)
    // console.log('distancesIdx1 = ', distancesIdx1)
  }
  // saveDriversDistancesToFoodBanks = (distanceMatrix) => {
  //   console.log('IN saveDriversDistancesToFoodBanks')
  //   console.log('distanceMatrix = ', distanceMatrix)
  //   const driversDistancesToFoodBanksTemp = this.createDriversDistancesToFoodBanks()
  //   const driversDistancesToFoodBanks = driversDistancesToFoodBanksTemp.map((obj, idx) => {
  //     const distances = this.parseDistanceDataOneOrigin(distanceMatrix, idx);
  //     console.log('IN saveDriversDistancesToFoodBanks map, distances = ', distances);
  //     return this.setDriverDistancesToFoodBanks(obj.distancesToFoodBanks, distances);
  //   })
  //   console.log('driversDistancesToFoodBanks = ', driversDistancesToFoodBanks)
  // }
  // setDriverDistancesToFoodBanks = (distancesToFoodBanksArray, distances) => {
  //   console.log('IN setDriverDistancesToFoodBanks')
  //   console.log('distancesToFoodBanksArray = ', distancesToFoodBanksArray)
  //   console.log('distances = ', distances)
  //   const setDistancesToFoodBanks = distancesToFoodBanksArray.map((obj, idx) => {
  //     console.log('in setDriverDistancesToFoodBanks')
  //     console.log('distances[idx] =', distances[idx])
  //     obj.distance = distances[idx];
  //     console.log('set obj = ', obj)
  //     return obj
  //   })
  //   console.log('**CONCERN** setDistancesToFoodBanks = ', setDistancesToFoodBanks)
  //   return setDistancesToFoodBanks
  // }
  // createDriversDistancesToFoodBanks = () => {
  //   const drivers = this.state.possiblDrivers.map(obj => obj.driver)
  //   const foodBanks = this.state.donationNeededFoodBanks
  //   const foodBankObjects = foodBanks.map(foodBankObj => {
  //     const obj = {foodBank: foodBankObj, distance: 0.0}
  //     return obj;
  //   })
  //   console.log('IN createDriversDistancesToFoodBanks')
  //   console.log('drivers = ', drivers)
  //   console.log('foodBanksObjects = ', foodBankObjects)
  //   const driversDistancesToFoodBanks = drivers.map(driver => {
  //     const obj = {driver: driver, distancesToFoodBanks: foodBankObjects}
  //     return obj;
  //   })
  //   console.log("driversDistancesToFoodBanks = ", driversDistancesToFoodBanks)
  //   return driversDistancesToFoodBanks
  // }


  joinLocationAndCurrentUser = (location) => {
    // console.log('currentUser.id = ', this.state.currentUser.id)
    // console.log('location.id = ', location.id)
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
  // clearForm = () => {
  //     // console.log('In ClearForm user_item = ', user_item)
  //     // console.log('clearForm users = ', this.state.users);
  //     // this.setState({
  //     //     testDriver: {
  //     //     name: 'John Doe',
  //     //     phoneNum: '(206) 555-5555'
  //     //     },
  //     //     testDonor: {
  //     //     name: 'Icicle Seafoods',
  //     //     address: "4019 21st Ave W, Seattle, WA 98199"
  //     //     },
  //     //     testFoodBank: {
  //     //     name: 'Ballard Food Bank',
  //     //     address: '5130 Leary Ave NW, Seattle, WA 98107'
  //     //     },
  //     //     testItem: {
  //     //     name: this.state.newDonation
  //     //     }
  //     // },() =>  )
  //     this.resetUsersAndDonation()
      
  // }

  // handleFormChange = (event) => {
  //   event.preventDefault();
  //   event.persist();
  //   // console.log(event.target.value)
  //   // console.log(event.target.name)
  //   this.setState({
  //       currentUser: {
  //           ...this.state.currentUser,
  //           [event.target.name]: event.target.value
  //       }
  //   })
  //   // , () => console.log(this.state.currentUser[event.target.name])
  // }
  handleDonationChange = (event) => {
    event.preventDefault();
    event.persist();
    this.setState({
        newDonation: event.target.value
    })
  }
  // , () => console.log("newDonation = ", this.state.newDonation)

  handleLoginSubmit = (loginData) => {
      // console.log("IN handleLoginSubmit")
      // console.log('Username/Password = ', loginData)
      this.setCurrentUser(loginData.username, loginData.password)
  }
  handleCreateAccountSubmit = (event, newUser) => {
      event.preventDefault();
      // console.log('newUser = ', newUser)
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
    // console.log('IN App handler newAddress = ', newAddress)
    // console.log("LocationName = ", locationName)
    // console.log("mileFrom = ", milesFrom)
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

//


  }
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
  handleDonationSubmit = (event) => {
    event.preventDefault();
    console.log('About to POST newDonation')
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

  render() {
    return (
      <Fragment>
        <Router>
          <NavBar />
          <Route
            exact path='/login'
            render={() => 
              <LoginView 
                handleLoginSubmit={this.handleLoginSubmit}
                loggedIn={this.state.loggedIn}
              />
            }
          />
          <Route 
            exact path='/profile/create'
            render={() =>
              <CreateProfileView handleCreateAccountSubmit={this.handleCreateAccountSubmit}/>
            }
          />
          <Route 
            exact path='/profile/address'
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
            exact path="/profile/edit"
            render={() => 
              <UserEditView 
                currentUser={this.state.currentUser} 
                handleFormChange={this.handleFormChange} 
                handleSubmit={this.handleSubmit}
              />
            }
          />
        </Router>
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: REACT_APP_API_KEY
})(App);
