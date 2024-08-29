import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import CustomModal from '../modal/custom-modal';

const data = [
    { id: 1, name: 'Priyanshay ', age: 28, email: 'priyu@example.com' },
    { id: 2, name: 'Shruti', age: 34, email: 'shruti@example.com' },
    { id: 3, name: 'Joe', age: 45, email: 'joe@example.com' },
];

const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Age',
        selector: row => row.age,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
];

const customStyles = {
    headRow: {
        style: {
            backgroundColor: 'fff',
            fontWeight: 'bold',
        },
    },
    headCells: {
        style: {
            backgroundColor: '#f9f9f9',
            color: '#333',
            fontSize: '15px'
        },
    },
    rows: {
        style: {
            backgroundColor: '#fff', // White background for rows
            '&:not(:last-of-type)': {
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderBottomColor: '#ddd', // Light gray border between rows
            },
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
            fontSize: '16px',
        },
    },
};

const alumniFields = [
    { label: 'Alumni Name', name: 'alumniName', type: 'text', placeholder: 'Enter alumni name' },
    { label: 'Graduation Year', name: 'graduationYear', type: 'text', placeholder: 'Enter graduation year' },
    { label: 'Current Occupation', name: 'occupation', type: 'text', placeholder: 'Enter current occupation' },
];


const initialValues = {
    alumniName: '',
    passoutYear: '',
    occupation: ''

}

const DashTable = () => {
    const [filterText, setFilterText] = useState('');
    const [filteredItems, setFilteredItems] = useState(data);
    const [showModal, setShowModal] = useState(false);


    const handleSaveAlumni = (formData) => {
        console.log('Alumni Data:', formData);
    };


    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilterText(value);
        setFilteredItems(data.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.email.toLowerCase().includes(value.toLowerCase())
        ));
    };

    return (
        <div className='my-3'>
            <div className="d-flex justify-content-between align-items-center">
                <input
                    type="text"
                    placeholder="Filter by Name or Email"
                    value={filterText}
                    onChange={handleFilterChange}
                    className='dash-filter'
                />
                <button className='add-btn' onClick={() => setShowModal(true)}>Add Alumni</button>
            </div>
            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                highlightOnHover
                pointerOnHover
                customStyles={customStyles}
                className='dash-table'
            />
            <CustomModal
                title="Add Alumni"
                fields={alumniFields}
                onSave={handleSaveAlumni}
                show={showModal}
                handleClose={() => setShowModal(false)}
                initialValues={initialValues}

            />
        </div>
    );
};

export default DashTable;
