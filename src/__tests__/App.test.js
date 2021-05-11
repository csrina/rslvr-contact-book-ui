import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {cleanup} from '@testing-library/react';


afterEach(cleanup);

it("App renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App contacts />, div);
})