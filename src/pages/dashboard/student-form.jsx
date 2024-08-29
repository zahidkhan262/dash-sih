import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const initialValues = {
    alumniName: '',
    passoutYear: '',
    occupation: ''
};

const StudentForm = () => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="form-box my-5 ">
            <h3 className='text-center'>Add Student</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="alumniName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        name="alumniName"
                        value={formData.alumniName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="passoutYear">
                    <Form.Label>Passout Year</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Passout Year"
                        name="passoutYear"
                        value={formData.passoutYear}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="occupation">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                    />
                </Form.Group>
                <div className="text-center">
                    <Button className='my-3 w-25' variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default StudentForm;
