import React from 'react';
import ReactDOM from 'react-dom';
import ContactList from '../ContactList';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from "react-test-renderer";

afterEach(cleanup);

it("ContactList renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ContactList contacts={{count : 0}} />, div);
})

it("ContactList renders correctly", () => {
    const {getByTestId} = render(<ContactList contacts={{count: 2, data: [ {id : 1, first_name: "react", last_name: "test", email: "react@test.com"}, {id : 2, first_name: "react", last_name: "test2", email: "react2@test.com"}]}} />);
    expect(getByTestId('contact-list')).toHaveTextContent("react testreact@test.comreact test2react2@test.com");
})


it("ContactList snapshot when empty", () => {
    const tree = renderer.create(<ContactList contacts={{count : 0}} />).toJSON();
    expect(tree).toMatchSnapshot();
})

it("ContactList snapshot when not empty", () => {
    const tree = renderer.create(<ContactList contacts={{count: 2, data: [ {id : 1, first_name: "react", last_name: "test", email: "react@test.com"}, {id : 2, first_name: "react", last_name: "test2", email: "react2@test.com"}]}} />).toJSON();
    expect(tree).toMatchSnapshot();
})