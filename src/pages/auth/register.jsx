import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import ErrorMessage from '../../components/error-message/error-message';


const ErrorMessage = ({ message }) => {
    return <div style={{ color: 'red', fontSize: '12px' }}>{message}</div>;
};

const Register = () => {
    const formRef = useRef();
    const [focusedField, setFocusedField] = useState(null);

    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Please enter your Full Name'),
        email: Yup.string().email('Invalid email format').required('Please enter your Email'),
        companyName: Yup.string().required('Please enter your Company Name'),
        pincode: Yup.string().required('Please enter your Pincode'),
        numOfPos: Yup.string().required('Please select the number of PoS required'),
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            companyName: '',
            pincode: '',
            numOfPos: ''
        },
        validationSchema,
        validateOnBlur: true,
        onSubmit: (values) => {
            console.log(values);
        },
        validate: (values) => {
            const errors = {};
            Object.keys(values).some((key) => {
                try {
                    validationSchema.fields[key].validateSync(values[key]);
                } catch (error) {
                    errors[key] = error.message;
                    setFocusedField(key);
                    return true;
                }
                return false;
            });
            return errors;
        },
    });

    useEffect(() => {
        if (focusedField) {
            formRef.current.querySelector(`[name="${focusedField}"]`).focus();
        }
    }, [focusedField]);

    return (
        <form onSubmit={formik.handleSubmit} ref={formRef}>
            <div>
                <label>Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                />
                {formik.errors.fullName && formik.touched.fullName && focusedField === 'fullName' ? (
                    <ErrorMessage message={formik.errors.fullName} />
                ) : null}
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && focusedField === 'email' ? (
                    <ErrorMessage message={formik.errors.email} />
                ) : null}
            </div>
            <div>
                <label>Company Name</label>
                <input
                    type="text"
                    name="companyName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.companyName}
                />
                {formik.errors.companyName && formik.touched.companyName && focusedField === 'companyName' ? (
                    <ErrorMessage message={formik.errors.companyName} />
                ) : null}
            </div>
            <div>
                <label>Pincode</label>
                <input
                    type="text"
                    name="pincode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pincode}
                />
                {formik.errors.pincode && formik.touched.pincode && focusedField === 'pincode' ? (
                    <ErrorMessage message={formik.errors.pincode} />
                ) : null}
            </div>
            <div>
                <label>No. of PoS required</label>
                <select
                    name="numOfPos"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.numOfPos}
                >
                    <option value="" label="Select option" />
                    <option value="1" label="1" />
                    <option value="2" label="2" />
                    <option value="3" label="3" />
                </select>
                {formik.errors.numOfPos && formik.touched.numOfPos && focusedField === 'numOfPos' ? (
                    <ErrorMessage message={formik.errors.numOfPos} />
                ) : null}
            </div>
            <button type="submit">Verify your details</button>
        </form>
    );
};

export default Register;
