import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import "../My_Styles/LogIn.css";

const server = 'https://market-for-rental-equipments-e-commerce-website-mern.vercel.app/';

export const SignUp = () => {
    const [signupShow, setSignupShow] = useState(false);
    const [loginDetails, setLoginDetails] = useState([]);

    useEffect(() => {
        const fetchLoginDetails = async () => {
            try {
                const response = await axios.get(`${server}/login`);
                setLoginDetails(response.data); 
            } catch (error) {
                console.error("Error fetching login details", error);
            }
        };

        fetchLoginDetails();
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            dob: '',
            newEmail: '',
            newPw: ''
        },
        validate: values => {
            const errors = {};
            if (!values.firstName.trim()) {
                errors.firstName = 'Enter Firstname';
            }
            if (!values.lastName.trim()) {
                errors.lastName = 'Enter Lastname';
            }
            if (!values.dob.trim()) {
                errors.dob = 'Enter Date of Birth';
            }
            if (!values.newEmail.trim()) {
                errors.newEmail = 'Enter Email Address';
            } else if (!isValidEmail(values.newEmail)) {
                errors.newEmail = 'Invalid email address format';
            }
            if (!values.newPw.trim()) {
                errors.newPw = 'Enter Password';
            } else if (values.newPw.trim().length < 8) {
                errors.newPw = 'Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.';
            }
            return errors;
        },
        onSubmit: async values => {
            for (let i = 0; i < loginDetails.length; i++) {
                if (loginDetails[i].newEmail === values.newEmail) {
                    alert('Email already exists ! Please use a different email (or) Try Login !!');
                    return;
                }
            }
            const payload = {
                newFirstname: values.firstName,
                newLastname: values.lastName,
                newDob: values.dob,
                newEmail: values.newEmail,
                newPassword: values.newPw
            };

            try {
                await axios.post(`${server}/signUp`, payload);
                setSignupShow(true);
            } catch (error) {
                console.log("Error", error);
            }
        }
    });

    const getMaxDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className="login">
            {!signupShow ?
                <div className="userinfo">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName"><b>Firstname</b></label><br />
                            <input
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                id="firstName"
                                name="firstName"
                            /><br />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className="error" style={{ color: 'red' }}>{formik.errors.firstName}</div>
                            ) : null}
                            <small id="firstNameHelp" className="form-text text-muted">
                                As per the name on your PAN card.
                            </small>
                            <br />
                        </div><br />
                        <div className="form-group">
                            <label htmlFor="lastName"><b>Lastname</b></label><br />
                            <input
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                id="lastName"
                                name="lastName"
                            /><br />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className="error" style={{ color: 'red' }}>{formik.errors.lastName}</div>
                            ) : null}
                            <small id="lastNameHelp" className="form-text text-muted">
                                As per the name on your PAN card.
                            </small><br />
                        </div><br />
                        <div>
                            <label htmlFor="dateInput"><b>Date of Birth</b></label><br />
                            <input
                                type="date"
                                id="dateInput"
                                name="dob"
                                max={getMaxDate()}
                                value={formik.values.dob}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            /><br />
                            {formik.touched.dob && formik.errors.dob ? (
                                <div className="error" style={{ color: 'red' }}>{formik.errors.dob}</div>
                            ) : null}
                        </div><br />
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1"><b>Email Address</b></label><br />
                            <input
                                value={formik.values.newEmail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="email"
                                id="exampleInputEmail1"
                                name="newEmail"
                            /><br />
                            {formik.touched.newEmail && formik.errors.newEmail ? (
                                <div className="error" style={{ color: 'red' }}>{formik.errors.newEmail}</div>
                            ) : null}
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
                            </small><br />
                        </div><br />
                        <div className="form-group">
                            <label htmlFor="inputPassword5"><b>Password</b></label><br />
                            <input
                                value={formik.values.newPw}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="password"
                                id="inputPassword5"
                                name="newPw"
                            /><br />
                            {formik.touched.newPw && formik.errors.newPw ? (
                                <div className="error" style={{ color: 'red' }}>{formik.errors.newPw}</div>
                            ) : null}
                            <small id="passwordHelpBlock" className="form-text text-muted">
                                Your password must be 8-20 characters long, contain letters and
                                numbers, and must not contain spaces, special characters, or
                                emoji.
                            </small>
                        </div><br />
                        <div className='buttongroup'>
                            <button type="submit" className="btn btn-info">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
                :
                <div className='userinfo'>
                    <h4 style={{ color: "green" }}>SignUp Successful! Please Login to continue...</h4><br />
                    <Link to={"/login"}><button type="button" className="btn btn-outline-dark"><b>Go to Login Page</b></button></Link>
                </div>
            }
        </div>
    );
};







