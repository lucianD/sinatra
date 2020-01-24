import React from 'react';
import ReactDOM from "react-dom";
import { create } from 'react-test-renderer';
import Button from './index';
import { act } from "react-dom/test-utils";

let container, clicked = false;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
    clicked = false;
});

/**
 * Generates a Button component to be reused by different tests below
 * @returns {*}
 */
function getAButton() {
    return <Button label="New Button" onClick={() => clicked = true}/>;
}

test('renders a button - test by snapshot', () => {
    const component = create(getAButton());
    const instance = component.root;
    const button = instance.findByType('button');
    const buttonJSON = component.toJSON();
    expect(buttonJSON).toMatchSnapshot();

    expect(button.props.className).toContain('button');
    expect(button.props.className).toContain('btn-primary');
    expect(button.props.children).toBe('New Button');
});

/**
 * Tests the clicking ability of a button
 */
function testClickingFunctionality(button) {
    expect(clicked).toBe(false);
    act(() => {
        button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    expect(clicked).toBe(true);
}

test('renders a button - testing more real rendering and interaction', () => {
    act(() => {
        ReactDOM.render(getAButton(), container);
    });

    const button = container.getElementsByTagName("button")[0];
    expect(button.textContent).toBe("New Button");
    expect(button.className).toContain('button');

    expect(button.className).toContain('btn-primary');

    testClickingFunctionality(button);
});