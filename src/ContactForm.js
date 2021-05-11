import { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Multiselect } from 'multiselect-react-dropdown';

export default class ContactForm extends Component {
    //mode = 0 create  > fields are empty create button
    //mode = 1  view/edit > fields are filled, save and delete buttons
    constructor(props) {
        super(props);
        this.state = {
            dbGroups: [],
            selectedGroups: [],
            id: 0,
            firstNameValue: '',
            lastNameValue: '',
            emailValue: '',
            phoneValue: '',
            streetValue: '',
            postalValue: '',
            cityValue: '',
            provinceValue: '',
            countryValue: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.handlePOST = this.handlePOST.bind(this);
        this.handlePUT = this.handlePUT.bind(this);
        this.handleDELETE = this.handleDELETE.bind(this);
    }

    componentDidMount() {
        fetch(`https://rslvr-contact-book-api.herokuapp.com/_api/v1.0/groups`)
            .then(res => res.json())
            .then(json => {
                if (this.props.mode === 1) {
                    this.setState({
                        dbGroups: json.data,
                        selectedGroups: (this.props.details.groups) ? json.data.filter(a => this.props.details.groups.includes(a.id)) : [],
                        id: this.props.details.id || 0,
                        firstNameValue: this.props.details.first_name || '',
                        lastNameValue: this.props.details.last_name || '',
                        emailValue: this.props.details.email || '',
                        phoneValue: this.props.details.phone_number || '',
                        streetValue: (this.props.details.address) ? this.props.details.address.street || '' : '',
                        postalValue: (this.props.details.address) ? this.props.details.address.postal || '' : '',
                        cityValue: (this.props.details.address) ? this.props.details.address.city || '' : '',
                        provinceValue: (this.props.details.address) ? this.props.details.address.province || '' : '',
                        countryValue: (this.props.details.address) ? this.props.details.address.country || '' : '',
                    });
                } else if (this.props.mode === 0) {
                    this.setState({
                        dbGroups: json.data,
                        selectedGroups: [],
                        firstNameValue: '',
                        lastNameValue: '',
                        emailValue: '',
                        phoneValue: '',
                        streetValue: '',
                        postalValue: '',
                        cityValue: '',
                        provinceValue: '',
                        countryValue: '',
                    });
                }
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.mode === 1 && prevProps.details.id !== this.props.details.id) {
            fetch(`https://rslvr-contact-book-api.herokuapp.com/_api/v1.0/groups`)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        dbGroups: json.data,
                        selectedGroups: (this.props.details.groups) ? json.data.filter(a => this.props.details.groups.includes(a.id)) : [],
                        id: this.props.details.id || 0,
                        firstNameValue: this.props.details.first_name || '',
                        lastNameValue: this.props.details.last_name || '',
                        emailValue: this.props.details.email || '',
                        phoneValue: this.props.details.phone_number || '',
                        streetValue: (this.props.details.address) ? this.props.details.address.street || '' : '',
                        postalValue: (this.props.details.address) ? this.props.details.address.postal || '' : '',
                        cityValue: (this.props.details.address) ? this.props.details.address.city || '' : '',
                        provinceValue: (this.props.details.address) ? this.props.details.address.province || '' : '',
                        countryValue: (this.props.details.address) ? this.props.details.address.country || '' : '',
                    });
                });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    onSelect(selectedList) {
        this.setState(prevState => {
            return {
                ...prevState,
                selectedGroups: selectedList
            }
        })
    }

    onRemove(selectedList) {
        this.setState(prevState => {
            return {
                ...prevState,
                selectedGroups: selectedList
            }
        })
    }

    handlePOST(event) {
        fetch(`https://rslvr-contact-book-api.herokuapp.com/_api/v1.0/contact`, {
            method: 'POST',
            body: JSON.stringify({
                first_name: this.state.firstNameValue,
                last_name: this.state.lastNameValue,
                email: this.state.emailValue,
                phone: this.state.phoneValue,
                address: {
                    street: this.state.streetValue,
                    postal: this.state.postalValue,
                    city: this.state.cityValue,
                    province: this.state.provinceValue,
                    country: this.state.countryValue
                },
                groups: this.state.selectedGroups.map(e => e.id)
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            if (res.ok) {
                window.location.reload()
            }
        })
    }
    handlePUT(event) {
        fetch(`https://rslvr-contact-book-api.herokuapp.com/_api/v1.0/contact/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                first_name: this.state.firstNameValue,
                last_name: this.state.lastNameValue,
                email: this.state.emailValue,
                phone: this.state.phoneValue,
                address: {
                    street: this.state.streetValue,
                    postal: this.state.postalValue,
                    city: this.state.cityValue,
                    province: this.state.provinceValue,
                    country: this.state.countryValue
                },
                groups: this.state.selectedGroups.map(e => e.id)
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            if (res.ok) {
                window.location.reload()
            }
        })

    }
    handleDELETE(event) {
        fetch(`https://rslvr-contact-book-api.herokuapp.com/_api/v1.0/contact/${this.state.id}`, {
            method: 'DELETE'
        }).then((res) => {
            if (res.ok) {
                window.location.reload()
            }
        })
    }

    render() {

        let buttons;
        if (this.props.mode === 1) { //view existing contact
            buttons = <div>
                <Button variant="primary" onClick={this.handlePUT} value="save">Save</Button>
                <Button variant="danger" onClick={this.handleDELETE} value="delete">Delete</Button>
            </div>
        } else if (this.props.mode === 0) {
            buttons = <Button variant="primary" onClick={this.handlePOST} value="create">Create</Button>
        }
        return (
            <div>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Control
                            name="firstNameValue"
                            type="text"
                            placeholder="Enter First Name"
                            required
                            value={this.state.firstNameValue}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formLastName">
                        <Form.Control
                            name="lastNameValue"
                            type="text"
                            placeholder="Enter Last Name"
                            required
                            value={this.state.lastNameValue}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formEmail">
                        <Form.Control
                            name="emailValue"
                            type="email"
                            placeholder="Enter Email"
                            required
                            value={this.state.emailValue}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formPhone">
                        <Form.Control
                            name="phoneValue"
                            type="text"
                            placeholder="Enter Phone Number"
                            required
                            value={this.state.phoneValue}
                            onChange={this.handleInputChange}
                        />
                        {/* <Form.Control type="text" placeholder="Enter Phone" value={this.state.phoneValue} /> */}
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formStreet">
                        <Form.Control
                            name="streetValue"
                            type="text"
                            placeholder="Enter Street"
                            required
                            value={this.state.streetValue}
                            onChange={this.handleInputChange}
                        />
                        {/* <Form.Control type="text" placeholder="Enter Street" value={this.state.streetValue} /> */}
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formPostalCode">
                        <Form.Control
                            name="postalValue"
                            type="text"
                            placeholder="Enter Postal Code"
                            required
                            value={this.state.postalValue}
                            onChange={this.handleInputChange}
                        />
                        {/* <Form.Control type="text" placeholder="Enter Postal Code" value={this.state.postalValue} /> */}
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formCity">
                        <Form.Control
                            name="cityValue"
                            type="text"
                            placeholder="Enter City"
                            required
                            value={this.state.cityValue}
                            onChange={this.handleInputChange}
                        />
                        {/* <Form.Control type="text" placeholder="Enter City" value={this.state.cityValue} /> */}
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formProvince">
                        <Form.Control
                            name="provinceValue"
                            type="text"
                            placeholder="Enter Province/State"
                            required
                            value={this.state.provinceValue}
                            onChange={this.handleInputChange}
                        />
                        {/* <Form.Control type="text" placeholder="Enter Province" value={this.state.provinceValue} /> */}
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formCountry">
                        <Form.Control
                            name="countryValue"
                            type="text"
                            placeholder="Enter Country"
                            required
                            value={this.state.countryValue}
                            onChange={this.handleInputChange}
                        />
                        {/* <Form.Control type="text" placeholder="Enter Country" value={this.state.countryValue} /> */}
                    </Form.Group>
                    <br />
                    <Form.Group controlId="GroupMultiSelect">
                        <Form.Label>Groups: </Form.Label>
                        <Multiselect
                            name="selectedGroups"
                            options={this.state.dbGroups} // Options to display in the dropdown
                            selectedValues={this.state.selectedGroups} // Preselected value to persist in dropdown
                            displayValue="name" // Property name to display in the dropdown options
                            onSelect={this.onSelect} // Function will trigger on select event
                            onRemove={this.onRemove} // Function will trigger on remove event
                        />
                    </Form.Group>
                    <br />
                    <ButtonGroup>
                        {buttons}
                    </ButtonGroup>
                </Form>
            </div>
        )
    }
}