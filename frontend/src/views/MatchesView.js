import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
require("dotenv").config()

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
const mapStyles = {
    width: '100%',
    height: '100%',
};

class MatchesView extends Component {

    constructor() {
        super();
        this.state = {
            locations: [],
            matches: [],
            matchesWithObjs: [],
            users: [],
            user_items: []
        }   
    }

    componentDidMount() {
        this.getMatches()
        // this.getUser()
        
        // this.getMatches()
        // this.displayMarkers()
    }

    getMatches = () => {
        fetch(`http://localhost:3000/api/v1/matches`)
        .then(resp => resp.json())
        .then(data => this.setState({matches: data}, () => this.getUsers()))
    }
    getUsers = () => {
        fetch(`http://localhost:3000/api/v1/users/`)
        .then(resp => resp.json())
        .then(data => this.setState({users: data}, () => this.getUserItems()))
    }
    getUserItems = () => {
        fetch(`http://localhost:3000/api/v1/user_items/`)
        .then(resp => resp.json())
        .then(data => this.setState({user_items: data}, () => this.getMatchObjects()))
    }
    getMatchObjects = () => {
        console.log('In getMatchObjs and state = ', this.state)
        console.log('In getMatchObjs and props = ', this.props)
        // debugger
        const newMatchesWithObjsArray = []
        this.state.matches.forEach(match => {
            console.log('MATCH = ', match)
            const driver = this.state.users.find(user => user.id === match.driver_user_id)
            const foodBank = this.state.users.find(user => user.id === match.food_bank_user_id)
            console.log('DRIVER = ', driver)
            console.log('FOOD BANK = ', foodBank)
            const donor_user_item = this.state.user_items.find(user_item => user_item.id === match.donor_user_item_id);
            const newMatchObj = {...match, driver, foodBank, donor_user_item}
            // console.log('NEW MATCH OBJ = ', newMatchObj)
            newMatchesWithObjsArray.push(newMatchObj)
            console.log('newMatchesWithObjsArray = ', newMatchesWithObjsArray)
        })
        this.setState({ matchesWithObjs: newMatchesWithObjsArray }, () => this.testCallFunction())
    }
    testCallFunction = () => {
        console.log('IN TEST CALL FUNCTION')
        const matches = [...this.state.matchesWithObjs]
        console.log('matches = ', matches)
        this.testPrintFunctionDonor( matches[0], 0)
        this.testPrintFunctionDriver( matches[0], 0)
        this.testPrintFunctionFoodBank( matches[0], 0)
        this.testPrintFunctionDonor( matches[1], 1)
        this.testPrintFunctionDriver( matches[1], 1)
        this.testPrintFunctionFoodBank( matches[1], 1)
        this.geocodeAddressAndSetStateOfDonor(0, 0)
        this.geocodeAddressAndSetStateOfDriver(0, 0)
        this.geocodeAddressAndSetStateOfFoodBank(1, 0)
    }
    testPrintFunctionDonor = (match, idx) => {
        console.log(`objType donor_user_item.user.locations[0].address = `, match.donor_user_item.user.locations[0].address)
    }
    testPrintFunctionDriver = (match, idx) => {
        console.log(`objType driver.locations[0].address = `, match.driver.locations[0].address)
    }
    testPrintFunctionFoodBank = (match, idx) => {
        console.log(`objType foodBank.locations[0].address = `, match.foodBank.locations[0].address)
    }
    // testPrintFunction = (match, objType) => {
    //     console.log(`objType ${objType}.locations[0].address = `, match[objType].name)
    // }
    // 
    // displayMarkers = () => {
    //     console.log('Matches in displayMatches = ', this.state.locations)
    //     return this.state.locations.map((location, index) => {
    //         return <Marker key={index} id={index} position={{
    //          lat: location.lat,
    //          lng: location.lng
    //        }}
    //        onClick={() => console.log("You clicked me!")} />
    //     })
    // }
    
    geocodeAddressAndSetStateOfDonor = (match_idx, location_idx) => {
        console.log('IN GECODE DONOR AND STATE ADDRESS RETURNED IS = ', this.state.matchesWithObjs[match_idx].donor_user_item.user.locations[location_idx].address)
        // const geocoder = new this.props.google.maps.Geocoder()
        // geocoder.geocode({address: }, (response, status) => {
        //     if (status === 'OK') {
        //         // console.log('Geocoder lat = ', response[0].geometry.bounds.na.l)
        //         // console.log('Geocoder lng = ', response[0].geometry.bounds.ga.l)
        //         this.setState(prevState => {
        //             return { matchesWithObjs: [...prevState.latlngs, {lat: response[0].geometry.bounds.na.l, lng: response[0].geometry.bounds.ga.l}]
        //             }
        //         })
        //     } else {
        //         alert('Geocode was not successful for the following reason: ' + status);
        //     }
        // })
        
    }
    geocodeAddressAndSetStateOfDriver= (match_idx, location_idx) => {
        console.log('IN GECODE DRIVER AND STATE ADDRESS RETURNED IS = ', this.state.matchesWithObjs[match_idx].driver.locations[location_idx].address)
        const geocoder = new this.props.google.maps.Geocoder()
        geocoder.geocode({address: this.state.matchesWithObjs[match_idx].driver.locations[location_idx].address}, (response, status) => {
            if (status === 'OK') {
                console.log('Geocoder lat = ', response[0].geometry.bounds.na.l)
                console.log('Geocoder lng = ', response[0].geometry.bounds.ga.l)
                this.setState(prevState => ({
                    matchesWithObjs: prevState.matchesWithObjs.map(
                        (el,idx) => idx === match_idx? { ...el, driverLatLng: {lat: response[0].geometry.bounds.na.l, lng: response[0].geometry.bounds.ga.l}}: el
                    )
                }), () => console.log('state.matchesWithObjs = ', this.state.matchesWithObjs))
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        })
    }
    geocodeAddressAndSetStateOfFoodBank = (match_idx, location_idx) => {
        console.log('IN GECODE FOOD BANK AND STATE ADDRESS RETURNED IS = ', this.state.matchesWithObjs[match_idx].foodBank.locations[location_idx].address)
    }
    render() {
        console.log('Matches props = ', this.props)
        return (
            <Fragment>
                <Map
                    google={this.props.google}
                    zoom={13}
                    style={mapStyles}
                    initialCenter={{lat: 47.618475, lng: -122.337975}}
                >
                    {/* {this.displayMarkers()} */}
                    {/* <Marker position={{lat: 47.62227910000001, lng: -122.33990849999998}} animation={this.props.google.maps.Animation.DROP}/> */}
                    <Marker position={{lat: 47.618475, lng: -122.337975}} animation={this.props.google.maps.Animation.DROP}/>
                </Map>
            </Fragment>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: REACT_APP_API_KEY
  })(MatchesView);

