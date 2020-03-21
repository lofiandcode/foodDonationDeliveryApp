import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class AddressForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            street: '',
            city: '',
            state: '',
            zipcode: '',
            milesFrom: ''
        }
    }
    handleChange = (e) => {
        e.persist();
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const submittedAddress = this.state.street.concat(', ', this.state.city, ', ', this.state.state, ' ', this.state.zipcode)
        const submittedMilesFrom = parseFloat(this.state.milesFrom)
        this.props.handleAddressSubmit(this.state.name, submittedAddress, submittedMilesFrom);
        this.clearForm();
        this.props.history.push('/profile')
    }
    clearForm = () => this.setState({
        name: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        milesFrom: ''
    });
    
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <label>Location Name</label>
                <input 
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder='Location Name (Optional)' 
                />
                </Form.Field>
                <Form.Field>
                <label>Address</label>
                <input 
                    name='street'
                    value={this.state.street}
                    onChange={this.handleChange}
                    placeholder='Street Address' 
                />
                </Form.Field>
                <Form.Group widths='equal'>
                <Form.Field>
                    <label>City</label>
                    <input 
                        name='city'
                        value={this.state.city}
                        onChange={this.handleChange}
                        placeholder='City' 
                    />
                </Form.Field>
                <Form.Field>
                    <label>State</label>
                    <input 
                        name='state'
                        value={this.state.state}
                        onChange={this.handleChange}
                        placeholder='State' 
                    />
                </Form.Field>
                <Form.Field>
                    <label>Zipcode</label>
                    <input 
                        name='zipcode'
                        value={this.state.zipcode}
                        onChange={this.handleChange}
                        placeholder='Zipcode' 
                    />
                </Form.Field>
                </Form.Group>
                <Form.Field>
                    <label>Distance (Drivers Only)</label>
                    <input 
                        name='milesFrom'
                        value={this.state.milesFrom}
                        onChange={this.handleChange}
                        placeholder="Enter miles from this address you're willing to drive" 
                    />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

export default withRouter(AddressForm)