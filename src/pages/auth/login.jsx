import React, { useState } from 'react'
// import { validation } from '../../utils/validation';

import SecurityBg from '../../assets/login-security.svg'


const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
    });



    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });


    const toggleLogin = () => setIsLogin((login) => !login);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });

        // Clear error message for the field being edited
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };


    return (
        <div className='main-section'>
            <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 md-mb-4 p-0">
                    <div className="img-item">
                        {/* <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" className='img-fluid' alt="" /> */}
                        <img src={SecurityBg} className='img-fluid' alt="" />
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12  p-0 form-sec">
                    <div className="">
                        <div className="form-outer ">
                            <div className="form-item">
                                <h3>Welcome to Modernize</h3>
                                <p>Your Admin Dashboard</p>
                            </div>
                            <div className="social-icon">
                                <button className='googleBtn'>
                                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/google-icon.svg" alt="" />
                                    &nbsp;with Google</button>
                                <button className='fbBtn'>
                                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/facebook-icon.svg" alt="" />
                                    &nbsp; with FB</button>
                            </div>
                            <div className='signWith'>
                                <p>or sign in with</p>
                            </div>
                            <form>
                                {!isLogin ?
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    : ''}
                                <div className="mb-3">
                                    <label className="form-label">{isLogin ? 'Username' : 'Email'}</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className='rememberMeItem py-1'>
                                    <span className='checkRemember'>
                                        <input type="checkbox" className='text-dark' /> <h6>Remeber this Device</h6></span>
                                    <p>Forgot Password ?</p>
                                </div>
                                <div className='btnSubmit'>
                                    <button type="submit" className="btn btn-primary w-100">{isLogin ? 'Sign In' : 'Sign Up'}</button>
                                </div>
                                <div className="createOne">
                                    <p>{!isLogin ? 'Already have an Account?' : 'New to Modernize?'} <span onClick={toggleLogin}>{isLogin ?  'Create an account':'Sign In' }</span>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login