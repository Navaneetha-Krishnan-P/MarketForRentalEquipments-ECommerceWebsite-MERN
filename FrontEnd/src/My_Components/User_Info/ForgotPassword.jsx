import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const server = 'https://market-for-rental-equipments-e-commerce-website-mern.vercel.app';

const ForgotPassword = () => {
    const [verifyEmail, setVerifyEmail] = useState("");
    const [verifyDob, setVerifyDob] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showDob, setShowDob] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 

    const handleVerifyEmail = (e) => {
        setVerifyEmail(e.target.value);
    };

    const handleVerifyDob = (e) => {
        setVerifyDob(e.target.value);
    };

    const handleEmailVerification = async (e) => {
        e.preventDefault();
        if (verifyEmail.trim() === "") {
            alert("Enter your Email Address");
        } else {
            try {
                const response = await axios.get(`${server}/login`);
                const verify = response.data;
                const user = verify.find(item => item.newEmail === verifyEmail);
                if (user) {
                    setShowDob(true);
                } else {
                    alert("Email Address not found");
                }
            } catch (error) {
                console.error("Error verifying email:", error);
                alert("Error verifying email. Please try again later.");
            }
        }
    };

    const handleDobVerification = async (e) => {
        e.preventDefault();
        if (verifyDob.trim() === "") {
            alert("Enter your Date of Birth");
        } else {
            try {
                const response = await axios.get(`${server}/login`);
                const verifydob = response.data;
                const user = verifydob.find(item => item.newDob === verifyDob);
                if (user) {
                    setShowPassword(true);
                } else {
                    alert("Date of Birth does not match");
                }
            } catch (error) {
                console.error("Error verifying Date of Birth:", error);
                alert("Error verifying Date of Birth. Please try again later.");
            }
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword.trim() === "") {
            alert("Enter your New Password");
        } else {
            try {
                await axios.post(`${server}/updatePassword`, {
                    email: verifyEmail,
                    newPassword: newPassword
                });
                alert("Password updated successfully");
                navigate('/login'); 
            } catch (error) {
                console.error("Error updating password:", error);
                alert("Error updating password. Please try again later.");
            }
        }
    };

    return (
        <div className='login'>
            <div >
                <div className='userinfo'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1"><b>Email Address</b></label><br />
                            <input
                                type="email"
                                value={verifyEmail}
                                onChange={handleVerifyEmail}
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            /><br />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div><br />
                        {!showDob ?
                            <div className='buttongroup'>
                                <button className="btn btn-info" onClick={handleEmailVerification}>Confirm Email</button>
                            </div>
                            :
                            <div>
                                <div>
                                    <label htmlFor="dateInput"><b>Enter your Date-of-Birth to reset your password</b></label><br />
                                    <input type="date" id="dateInput" value={verifyDob} onChange={handleVerifyDob} name="dateInput" />
                                </div><br />
                                <div className='buttongroup'><button type="submit" className="btn btn-info" onClick={handleDobVerification}>Verify your DOB </button></div>
                            </div>
                        }
                        {showPassword &&
                            <div><br/>
                                <div className="form-group">
                                    <label htmlFor="inputPassword5"><b>Enter Your New Password</b></label><br />
                                    <input
                                        type="text"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        id="inputPassword5"
                                        aria-describedby="passwordHelpBlock"
                                    /><br />
                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div><br /><br/>

                                <div className='buttongroup'>
                                    <button onClick={handlePasswordSubmit} type="submit" className="btn btn-success">Confirm Password</button>
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;




