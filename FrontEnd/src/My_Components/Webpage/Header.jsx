import React from 'react';
import "../My_Styles/Header.css";
import { Link, useNavigate } from 'react-router-dom';
import { SiPrestashop } from "react-icons/si";
import { CgProfile } from "react-icons/cg";


export const Header = ({ login, loginData, setLoginShow,adminShow,setAdminShow }) => {
  const navigate=useNavigate();

  const handleLogout = () => {
    if (confirm("Confirm LogOut ?")) {
      setLoginShow(false)
      setAdminShow(false)
      navigate("/")
    }
    else {
      setLoginShow(true)
      setAdminShow(true)
    }
  }
  return (
    <header className="bg-dark py-1">
      <div className="container px-3 px-lg-5 my-5">
        <div className="text-center text-white">
          <div className='for_flex'>
            <h1 className="display-6 fw-bolder"><SiPrestashop size={80} />&nbsp;&nbsp;&nbsp; Market for Rental Equipments</h1>
            {! (login || adminShow) ?
              <div>
                <Link to={"/logIn"}><button type="button" className="btn btn-success">Log In </button></Link>&nbsp;&nbsp;&nbsp;
                <Link to={"/signUp"}><button type="button" className="btn btn-info">Sign Up</button></Link>
              </div> :
              <div>
                <div className="dropdown">
                  <button className="btn btn-light"><b> <CgProfile size={25} color='green' /> </b></button>
                  <div className="dropdown-content">
                    <hr />
                    <CgProfile size={20} />
                    <p><b>{loginData.email}</b></p>
                    {adminShow ?
                    <p><b>Admin</b></p>:null}
                    <div className='logoutbutton'>
                      <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </header>
  );
};


