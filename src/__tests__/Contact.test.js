import React from 'react';
import ReactDOM from 'react-dom';
import Contact from '../Contact';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from "react-test-renderer";

afterEach(cleanup);

it("Contact renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Contact contact={{id: 0, first_name: "react", last_name: "test", email: "react@test.com"}} />, div);
})

it("Contact renders correctly", () => {
    const {getByTestId} = render(<Contact contact={{id: 0, first_name: "react", last_name: "test", email: "react@test.com"}} />);
    expect(getByTestId('contact-card-0')).toHaveTextContent("react testreact@test.com");
})


it("matches snapshot", () => {
    const tree = renderer.create(<Contact contact={{id: 0, first_name: "react", last_name: "test", email: "react@test.com"}} />).toJSON();
    expect(tree).toMatchSnapshot();
}) 