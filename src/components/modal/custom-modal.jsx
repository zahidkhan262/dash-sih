import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const CustomModal = ({ title, fields, onSave, show, handleClose, initialValues }) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSave = (e) => {
        e.preventDefault();
        onSave(formData);
        handleClose();
    };

    console.log(formData, "dataa")
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {fields.map((field, index) => (
                        <Form.Group controlId={`form${field.name}`} key={index}>
                            <Form.Label>{field.label}</Form.Label>
                            <Form.Control
                                type={field.type}
                                placeholder={field.placeholder}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
