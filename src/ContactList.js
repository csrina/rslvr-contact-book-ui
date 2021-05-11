import { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Contact from './Contact';

export default class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: {
                count: 0,
                data: []
            }
        };
        this.contactToGetFull = this.contactToGetFull.bind(this);
    }

    componentDidMount() {
        fetch(`https://rslvr-contact-book-api.herokuapp.com/_api/v1.0/contacts`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
    }

    contactToGetFull(id) {
        this.props.contactToViewId(id);
    }

    render() {
        var { isLoaded, items } = this.state;
        if (!isLoaded) {
            return <p> Loading....</p>
        }
        else {
            if (items.count > 0) {
                const contactItems = items.data.map(item => <Contact key={item.id} contact={item} contactToGetFullProp={this.contactToGetFull} />)
                return (
                    <ListGroup data-testid="contact-list">{contactItems}</ListGroup>
                )
            } else {
                return (<div>No contacts found ....</div>)
            }
        }
    }
}