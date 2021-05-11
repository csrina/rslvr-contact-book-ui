import { Component } from "react";
import ContactForm from "./ContactForm";

export default class ContactFull extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewPrompt: true
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            fetch(`https://rslvr-contact-book-api.herokuapp.com/_api/v1.0/contact/${this.props.id}`)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        viewPrompt: false,
                        id: this.props.id,
                        data: json
                    });
                });
        }
    }

    render() {
        let formBody;
        if (this.state.viewPrompt) {
            formBody = <p>select one of the contacts to view</p>
        } else {
            formBody = <ContactForm details={this.state.data.output} mode={1} />
        }
        return (
            <div>
                {formBody}
            </div>
        )
    }

}