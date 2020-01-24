import React from 'react';
import ReactDOM from "react-dom";
import {create} from 'react-test-renderer';
import Table from './index';
import {act} from "react-dom/test-utils";

let container, tableComponent, clickedId;

const FOOTBALL = 'Football';
const CRICKET = 'Cricket';
const TENNIS = 'Tennis';
const COLUMNS = {
    COLUMN_ID: 'id',
    COLUMN_NAME: 'name',
};

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    tableComponent = getTableComponent();
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
    tableComponent = null;
});

function getTableComponent() {
    return <Table
        columns={[COLUMNS.COLUMN_ID, COLUMNS.COLUMN_NAME]}
        data={[
            {id: 1, name: FOOTBALL},
            {id: 2, name: CRICKET},
            {id: 3, name: TENNIS},
        ]}
        onClickHandler={clicked => clickedId = clicked.id}
    />;
}

test('renders a table - snapshot test', () => {
    const component = create(tableComponent);
    const instance = component.root;
    // const table = instance.findByType('table');

    /**
     * Testing the snapshot
     */
    function snapshotTableTest() {
        const tableJSON = component.toJSON();
        expect(tableJSON).toMatchSnapshot();
    }

    snapshotTableTest();
});


test('renders a table - testing more real rendering and interaction', () => {
    act(() => {
        ReactDOM.render(tableComponent, container);
    });
    const table = container.getElementsByTagName("table")[0];

    /**
     * Checking table renders it's table headings correctly
     * @param table
     */
    function testHeadings(table) {
        const ths = table.getElementsByTagName('th');
        expect(ths.length).toBe(2);
        expect(ths[0].textContent).toBe(COLUMNS.COLUMN_ID);
        expect(ths[1].textContent).toBe(COLUMNS.COLUMN_NAME);
    }

    /**
     * Performs a click on a row and tests the clicked id to be correct
     * @param row
     * @param value
     */
    function testClickingARow(row, value) {
        act(() => {
            row.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });
        expect(clickedId).toBe(value);
    }

    /**
     * testing each td content to have the expected value
     * @param row
     * @param id
     * @param value
     */
    function testTDContent(row, id, value) {
        let tds = row.getElementsByTagName('td');
        expect(tds[0].textContent).toBe(id);
        expect(tds[1].textContent).toBe(value);
    }
    /**
     * Testing the table content
     * @param table
     */
    function testTableContent(table) {
        const tbody = table.getElementsByTagName('tbody')[0];
        const rows = tbody.getElementsByTagName('tr');
        expect(rows.length).toBe(3);


        testTDContent(rows[0], '1', FOOTBALL);
        testTDContent(rows[1], '2', CRICKET);
        testTDContent(rows[2], '3', TENNIS);

        testClickingARow(rows[0], 1);
        testClickingARow(rows[1], 2);
        testClickingARow(rows[2], 3);

    }
    testHeadings(table);
    testTableContent(table);

    expect(table.className).toContain('table');
    expect(table.className).toContain('table-bordered');
    expect(table.className).toContain('table-hover');



});