import React, { Component } from 'react'
import AddressForm from '../components/AddressForm'

class AddressView extends Component {
    render() {
        return(
            <AddressForm handleAddressSubmit={this.props.handleAddressSubmit}/>
        )
    }
}
export default AddressView