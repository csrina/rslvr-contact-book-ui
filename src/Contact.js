import { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';


export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleContactCardClick = this.handleContactCardClick.bind(this);
    }

    handleContactCardClick() {
        if (this.props.contactToGetFullProp) {
            this.props.contactToGetFullProp(this.props.contact.id);
        }
    }

    render() {
        return (
            <ListGroup.Item data-testid={`contact-card-${this.props.contact.id}`} action onClick={this.handleContactCardClick}>
                <b>{this.props.contact.first_name} {this.props.contact.last_name}</b> - {this.props.contact.email}
            </ListGroup.Item>

        )
    }
}