import React, { memo } from 'react';
// import PropTypes from 'prop-types';

function TableComponent({columns, data}) {

        const tableHeaders = (<thead>
        <tr>
            {columns.map(function(column) {
                return <th>{column}</th>; })}
        </tr>
        </thead>);

        const tableBody = data.map(function(row) {
            return (
                <tr>
                    {columns.map(function(column) {
                        return <td>{row[column]}</td>; })}
                </tr>); });

        // Decorate with Bootstrap CSS
        return (
            <table className="table table-bordered table-hover" width="100%">
            {tableHeaders}
            {tableBody}
        </table>)
}

export default memo(TableComponent)