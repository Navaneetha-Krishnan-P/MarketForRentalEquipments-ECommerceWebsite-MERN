
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';

let server = 'https://market-for-rental-equipments-e-commerce-website-mern.vercel.app';

const Admin = ({ setAdminShow }) => {
    const [adminLogin, setAdminLogin] = useState(false);

    const formik = useFormik({
        initialValues: {
            adminId: '',
            adminEmail: '',
            adminPw: ''
        },
        validate: values => {
            const errors = {};
            if (!values.adminId) {
                errors.adminId = 'Enter Admin ID';
            }
            if (!values.adminEmail) {
                errors.adminEmail = 'Enter Admin Email Address';
            } else if (!/\S+@\S+\.\S+/.test(values.adminEmail)) {
                errors.adminEmail = 'Invalid email address';
            }
            if (!values.adminPw) {
                errors.adminPw = 'Enter Admin Password';
            }
            return errors;
        },
        onSubmit: async values => {
            try {
                let response = await axios.get(server + '/admin');
                let admin = response.data;
                if (
                    values.adminId === admin[0].AdminId &&
                    values.adminEmail === admin[0].AdminEmail &&
                    values.adminPw === admin[0].AdminPassword
                ) {
                    setAdminShow(true);
                    setAdminLogin(true);
                } else {
                    alert("Check your credentials");
                }
            } catch (error) {
                console.error("There was an error with the admin login request", error);
            }
        }
    });

    return (
        <div className='login'>
            <div>
                {!adminLogin ? (
                    <div className='userinfo'>
                        <form onSubmit={formik.handleSubmit}>
                            <p style={{ color: "red" }}>Note: "This is only for Admins"</p>
                            <br />
                            <div className="form-group">
                                <label htmlFor="adminId"><b>Admin ID</b></label><br />
                                <input
                                    type="text"
                                    name="adminId"
                                    value={formik.values.adminId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="adminId"
                                /><br />
                                {formik.touched.adminId && formik.errors.adminId ? (
                                    <div className="error" style={{ color: 'red' }}>{formik.errors.adminId}</div>
                                ) : null}
                                <small className="form-text text-muted">Enter your Admin ID</small>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="adminEmail"><b>Admin Email Address</b></label><br />
                                <input
                                    type="email"
                                    name="adminEmail"
                                    value={formik.values.adminEmail}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="adminEmail"
                                /><br />
                                {formik.touched.adminEmail && formik.errors.adminEmail ? (
                                    <div className="error" style={{ color: 'red' }}>{formik.errors.adminEmail}</div>
                                ) : null}
                                <small className="form-text text-muted">Enter your Admin Email Address</small>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="adminPw"><b>Admin Password</b></label><br />
                                <input
                                    type="password"
                                    name="adminPw"
                                    value={formik.values.adminPw}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="adminPw"
                                /><br />
                                {formik.touched.adminPw && formik.errors.adminPw ? (
                                    <div  className="error" style={{ color: 'red' }}>{formik.errors.adminPw}</div>
                                ) : null}
                                <small className="form-text text-muted">Enter your Admin Password</small>
                            </div>
                            <br />
                            <div className='buttongroup'>
                                <button type="submit" className="btn btn-danger">Log In</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className='userinfo'>
                        <h4 style={{ color: "green" }}>Admin Login Successful!</h4>
                        <br />
                        <Link to={"/adminProducts"}>
                            <button type="button" className="btn btn-outline-dark">
                                <b>Go to Admin Page</b>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;


