import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import "../My_Styles/LogIn.css";

let server = 'https://marketforrentalequipments-backend-1.onrender.com';

export const LogIn = ({ LoginShow, setLoginData }) => {
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            pw: ''
        },
        validate: values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Enter Email Address';
            }
            if (!values.pw) {
                errors.pw = 'Enter Password';
            }
            return errors;
        },
        onSubmit: async values => {
            try {
                let response = await axios.get(server + '/login');
                let login = response.data;
                for (let i = 0; i < login.length; i++) {
                    if (login[i].newEmail === values.email && login[i].newPassword === values.pw) {
                        setShow(true);
                        LoginShow(true);
                        setLoginData(values);
                        return;
                    }
                }
                alert("Check your login credentials. If you are a new user, please Sign Up first.");
            } catch (error) {
                console.error("There was an error with the login request", error);
            }
        }
    });

    return (
        <div className='login'>
            {!show ?
                <div className='userinfo'>
                    <form onSubmit={formik.handleSubmit}>
                        <h5 className='userheading'><b>For User Login</b></h5><br />
                        <div className='formstyle'>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1"><b>Email Address</b></label><br />
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            /><br />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error" style={{ color: 'red' }}>{formik.errors.email}</div>
                            ) : null}
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div><br />
                        <div className="form-group">
                            <label htmlFor="inputPassword5"><b>Password</b></label><br />
                            <input
                                type="password"
                                name="pw"
                                value={formik.values.pw}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                            /><br />
                            {formik.touched.pw && formik.errors.pw ? (
                                <div className="error" style={{ color: 'red' }}>{formik.errors.pw}</div>
                            ) : null}
                            <small id="passwordHelpBlock" className="form-text text-muted">
                                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                            </small>
                        </div><br />
                        </div>
                       
                        <Link to={"/forgotPassword"}>Forgot Password ? </Link><br /><br />
                        <div className='buttongroup'>
                            <button type="submit" className="btn btn-success">Log In</button>
                        </div><br /><br />
                        <h5 className='userheading'><b>For Admin LogIn [Only For Admins]</b></h5><br />
                        <div className='buttongroup'>
                            <Link to={"/admin"}><button type="button" className="btn btn-outline-danger"><b>Log In as Admin</b></button></Link>
                        </div>
                    </form>
                </div>
                :
                <div className='userinfo'>
                    <h4 style={{ color: "green" }}>Login Successful!</h4><br />
                    <Link to={"/"}><button type="button" className="btn btn-outline-dark"><b>Go to Home Page</b></button></Link>
                </div>
            }
        </div>
    );
};











