import { Component } from 'react';
import ContactList from './ContactList';
import ContactFull from './ContactFull';
import ContactForm from "./ContactForm";
import Button from 'react-bootstrap/Button'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactId: 0,
      createNew: false
    };
    this.handleCreateNewClick = this.handleCreateNewClick.bind(this);
    this.contactToViewId = this.contactToViewId.bind(this);
  }

  contactToViewId(id) {
    this.setState({
      contactId: id,
      createNew: false
    });
  }
  handleCreateNewClick() {
    this.setState({
      contactId: 0,
      createNew: true
    });
  }

  render() {
    let contactArea;
    if (this.state.createNew) {
      contactArea = <ContactForm mode={0} />
    } else {
      contactArea = <ContactFull id={this.state.contactId} />
    }
    return (
      <div>
        <h1>My Contact Book</h1>
        <div className="container">
          <div className="row align-items-start">
            <div className="col">
              <h2>Contact List</h2>
              <ContactList contactToViewId={this.contactToViewId} />
            </div>
            <div className="col">
              <div className="row align-items-start">
                <div className="col">
                  <h2>Contact</h2>
                </div>
                <div className="col">
                  <Button variant="primary" onClick={this.handleCreateNewClick} value="create">Create New</Button>
                </div>
              </div>
              {contactArea}
            </div>
          </div>
        </div>

      </div>
    )
  }
}
