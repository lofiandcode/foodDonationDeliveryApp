import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
require("dotenv").config()
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(REACT_APP_API_KEY);
 
// set response language. Defaults to english.
Geocode.setLanguage("en");



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
        this.setState({ matchesWithObjs: newMatchesWithObjsArray }, () => this.setGeocodes())
    }
    setGeocodes = () => {
        console.log('IN TEST CALL FUNCTION')
        const matches = [...this.state.matchesWithObjs]
        console.log('matches = ', matches)
        this.testPrintFunctionDonor( matches[0], 0)
        this.testPrintFunctionDriver( matches[0], 0)
        this.testPrintFunctionFoodBank( matches[0], 0)
        this.testPrintFunctionDonor( matches[1], 1)
        this.testPrintFunctionDriver( matches[1], 1)
        this.testPrintFunctionFoodBank( matches[1], 1)
        this.state.matchesWithObjs.map((match, idx) => {
            this.geocodeAddressAndSetStateOfDonor(idx, 0)
            this.geocodeAddressAndSetStateOfDriver(idx, 0)
            this.geocodeAddressAndSetStateOfFoodBank(idx, 0)
            return match
        })
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
    
    
    geocodeAddressAndSetStateOfDonor = (match_idx, location_idx) => {
        console.log('IN GECODE DONOR AND STATE ADDRESS RETURNED IS = ', this.state.matchesWithObjs[match_idx].donor_user_item.user.locations[location_idx].address)
        
        Geocode.fromAddress(this.state.matchesWithObjs[match_idx].donor_user_item.user.locations[location_idx].address)
        .then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log("IN NEW GECODE. DONOR LAT LNG = ", lat, lng);
                this.setState(prevState => ({
                    matchesWithObjs: prevState.matchesWithObjs.map(
                        (el,idx) => idx === match_idx? { ...el, donorLatLng: {lat, lng}}: el
                    )
                }), () => console.log('state.matchesWithObjs = ', this.state.matchesWithObjs))
            },
            error => {
                console.error(error);
            }
        );
    }
    geocodeAddressAndSetStateOfDriver= (match_idx, location_idx) => {
        console.log('IN GECODE DRIVER AND STATE ADDRESS RETURNED IS = ', this.state.matchesWithObjs[match_idx].driver.locations[location_idx].address)
        Geocode.fromAddress(this.state.matchesWithObjs[match_idx].driver.locations[location_idx].address)
        .then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log("IN NEW GECODE. DRIVER LAT LNG = ", lat, lng);
                this.setState(prevState => ({
                    matchesWithObjs: prevState.matchesWithObjs.map(
                        (el,idx) => idx === match_idx? { ...el, driverLatLng: {lat, lng}}: el
                    )
                }), () => console.log('state.matchesWithObjs = ', this.state.matchesWithObjs))
            },
            error => {
                console.error(error);
            }
        );
    }
    geocodeAddressAndSetStateOfFoodBank = (match_idx, location_idx) => {
        console.log('IN GECODE FOOD BANK AND STATE ADDRESS RETURNED IS = ', this.state.matchesWithObjs[match_idx].foodBank.locations[location_idx].address)
        Geocode.fromAddress(this.state.matchesWithObjs[match_idx].foodBank.locations[location_idx].address)
        .then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log("IN NEW GECODE. FOOD BANK LAT LNG = ", lat, lng);
                this.setState(prevState => ({
                    matchesWithObjs: prevState.matchesWithObjs.map(
                        (el,idx) => idx === match_idx? { ...el, foodBankLatLng: {lat, lng}}: el
                    )
                }), () => console.log('state.matchesWithObjs = ', this.state.matchesWithObjs))
            },
            error => {
                console.error(error);
            }
        );
        // const geocoder = new this.props.google.maps.Geocoder()
        // geocoder.geocode({address: this.state.matchesWithObjs[match_idx].foodBank.locations[location_idx].address}, (response, status) => {
        //     console.log('food bank gecode response = ', response)
        //     if (status === 'OK') {
        //         console.log('Geocoder lat = ', response[0].geometry.viewport.na.l)
        //         console.log('Geocoder lng = ', response[0].geometry.viewport.ga.l)
        //         this.setState(prevState => ({
        //             matchesWithObjs: prevState.matchesWithObjs.map(
        //                 (el,idx) => idx === match_idx? { ...el, foodBankLatLng: {lat: response[0].geometry.viewport.na.l, lng: response[0].geometry.viewport.ga.l}}: el
        //             )
        //         }), () => console.log('state.matchesWithObjs = ', this.state.matchesWithObjs))
        //     } else {
        //         alert('Geocode was not successful for the following reason: ' + status);
        //     }
        // })
    }
    displayDonorMarkers = () => {
        // console.log('Matches in displayMatches = ', this.state.locations)
        console.log('ABOUT TO CHECK FIRST CONDITIONAL AND this.state.matchesWithObjs = ', this.state.matchesWithObjs)
        if (this.state.matchesWithObjs.length !== 0 ){
            // debugger
            console.log('ABOVE TO CHECK CONDITIONAL AND this.state.matchesWithObjs[0].donorLatLng = ',this.state.matchesWithObjs[0].donorLatLng)
            if (this.state.matchesWithObjs[0].donorLatLng && this.state.matchesWithObjs[1].donorLatLng) {
                console.log('IN SECOND CONDITIONAL this.state.matchesWithObjs[0].donorLatLng = ', this.state.matchesWithObjs[0].donorLatLng)
                return this.state.matchesWithObjs.map((match, index) => {
                    return <Marker key={index} id={index} position={{
                                lat: match.donorLatLng.lat,
                                lng: match.donorLatLng.lng
                            }}
                            onClick={() => console.log("You clicked me!")} 
                            animation={this.props.google.maps.Animation.DROP}/>
                })
            } else {
                return null
            }
        } else {
            return null
        }
    }
    displayDriverMarkers = () => {
        // console.log('Matches in displayMatches = ', this.state.locations)
        console.log('ABOUT TO CHECK FIRST CONDITIONAL AND this.state.matchesWithObjs = ', this.state.matchesWithObjs)
        if (this.state.matchesWithObjs.length !== 0 ){
            // debugger
            console.log('ABOVE TO CHECK CONDITIONAL AND this.state.matchesWithObjs[0].donorLatLng = ',this.state.matchesWithObjs[0].driverLatLng)
            if (this.state.matchesWithObjs[0].driverLatLng && this.state.matchesWithObjs[1].driverLatLng) {
                console.log('IN SECOND CONDITIONAL this.state.matchesWithObjs[0].donorLatLng = ', this.state.matchesWithObjs[0].driverLatLng)
                return this.state.matchesWithObjs.map((match, index) => {
                    return <Marker key={index} id={index} position={{
                                lat: match.driverLatLng.lat,
                                lng: match.driverLatLng.lng
                            }}
                            onClick={() => console.log("You clicked me!")} 
                            animation={this.props.google.maps.Animation.DROP}/>
                })
            } else {
                return null
            }
        } else {
            return null
        }
    }
    displayFoodBankMarkers = () => {
        // console.log('Matches in displayMatches = ', this.state.locations)
        console.log('ABOUT TO CHECK FIRST CONDITIONAL AND this.state.matchesWithObjs = ', this.state.matchesWithObjs)
        if (this.state.matchesWithObjs.length !== 0 ){
            // debugger
            console.log('ABOVE TO CHECK CONDITIONAL AND this.state.matchesWithObjs[0].donorLatLng = ',this.state.matchesWithObjs[0].foodBankLatLng)
            if (this.state.matchesWithObjs[0].foodBankLatLng && this.state.matchesWithObjs[1].foodBankLatLng) {
                console.log('IN SECOND CONDITIONAL this.state.matchesWithObjs[0].donorLatLng = ', this.state.matchesWithObjs[0].foodBankLatLng)
                return this.state.matchesWithObjs.map((match, index) => {
                    return <Marker key={index} id={index} position={{
                                lat: match.foodBankLatLng.lat,
                                lng: match.foodBankLatLng.lng
                            }}
                            onClick={() => console.log("You clicked me!")} 
                            animation={this.props.google.maps.Animation.DROP}/>
                })
                } else {
                    return null
                }
            } else {
                return null
            }
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
                    {this.displayDonorMarkers()}
                    {/*this.displayDriverMarkers()*/}
                    {this.displayFoodBankMarkers()}
                    {/* <Marker position={{lat: 47.62227910000001, lng: -122.33990849999998}} animation={this.props.google.maps.Animation.DROP}/> */}
                    {/* <Marker position={{lat: 47.618475, lng: -122.337975}} animation={this.props.google.maps.Animation.DROP}/> */}
                </Map>
            </Fragment>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: REACT_APP_API_KEY
  })(MatchesView);

//   () => {
//     console.log('ABOVE TO CHECK CONDITIONAL AND this.state.matchesWithObjs[0].donorLatLng = ',this.state.matchesWithObjs[0].donorLatLng)
//     if (this.state.matchesWithObjs[0].donorLatLng) {
//         console.log('IN JXS DONOR IF')
//     }
// }