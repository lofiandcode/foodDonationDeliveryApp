import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import MatchContainer from '../containers/MatchContainer';
require("dotenv").config()
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(REACT_APP_API_KEY);
 
// set response language. Defaults to english.
Geocode.setLanguage("en");



const mapStyles = {
    width: '100%',
    height: '90%',
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
        const newMatchesWithObjsArray = []
        this.state.matches.forEach(match => {
            const driver = this.state.users.find(user => user.id === match.driver_user_id)
            const foodBank = this.state.users.find(user => user.id === match.food_bank_user_id)
            const donor_user_item = this.state.user_items.find(user_item => user_item.id === match.donor_user_item_id);
            const newMatchObj = {...match, driver, foodBank, donor_user_item}
            newMatchesWithObjsArray.push(newMatchObj)
        })
        this.setState({ matchesWithObjs: newMatchesWithObjsArray }, () => this.setGeocodes())
    }
    setGeocodes = () => {
        this.state.matchesWithObjs.map((match, idx) => {
            this.geocodeAddressAndSetStateOfDonor(idx, 0)
            this.geocodeAddressAndSetStateOfDriver(idx, 0)
            this.geocodeAddressAndSetStateOfFoodBank(idx, 0)
            return match
        })
    }
    geocodeAddressAndSetStateOfDonor = (match_idx, location_idx) => {
        Geocode.fromAddress(this.state.matchesWithObjs[match_idx].donor_user_item.user.locations[location_idx].address)
        .then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
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
        Geocode.fromAddress(this.state.matchesWithObjs[match_idx].driver.locations[location_idx].address)
        .then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
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
        Geocode.fromAddress(this.state.matchesWithObjs[match_idx].foodBank.locations[location_idx].address)
        .then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
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
    }
    displayDonorMarkers = () => {
        if (this.state.matchesWithObjs.length !== 0 ){
            if (this.state.matchesWithObjs[0].donorLatLng && this.state.matchesWithObjs[1].donorLatLng) {
                return this.state.matchesWithObjs.map((match, index) => {
                    return <Marker key={index} id={index} position={{
                                lat: match.donorLatLng.lat,
                                lng: match.donorLatLng.lng
                            }}
                            label={'A'}
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
        if (this.state.matchesWithObjs.length !== 0 ){
            if (this.state.matchesWithObjs[0].driverLatLng && this.state.matchesWithObjs[1].driverLatLng) {
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
        if (this.state.matchesWithObjs.length !== 0 ){
            if (this.state.matchesWithObjs[0].foodBankLatLng && this.state.matchesWithObjs[1].foodBankLatLng) {
                return this.state.matchesWithObjs.map((match, index) => {
                    return <Marker key={index} id={index} position={{
                                lat: match.foodBankLatLng.lat,
                                lng: match.foodBankLatLng.lng
                            }}
                            label={'B'}
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
                <MatchContainer 
                    matches={this.state.matchesWithObjs}
                />
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{lat: 47.616280, lng: -122.328375}}
                >
                    {this.displayDonorMarkers()}
                    {this.displayFoodBankMarkers()}
                </Map>
            </Fragment>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: REACT_APP_API_KEY
  })(MatchesView);
