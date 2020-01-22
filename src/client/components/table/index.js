import React, { memo } from 'react';
import './index.scss'

function TableComponent({columns, data, onClickHandler}) {

        const tableHeaders = (
            <thead className='thead-dark'>
                <tr>
                    {columns.map(column => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>);

        const tableBody = data.map(function(row) {
            return (
                <tbody key={row.id}>
                    <tr onClick={onClickHandler.bind(this, row.id)}>
                        {columns.map(column => (
                            <td key={row[column]}>{row[column]}</td>))
                        }
                    </tr>
                </tbody>); });

        // Decorate with Bootstrap CSS
        return (
            <table className='table table-bordered table-hover' width="100%">
            {tableHeaders}
            {tableBody}

        </table>)
}

export default memo(TableComponent)