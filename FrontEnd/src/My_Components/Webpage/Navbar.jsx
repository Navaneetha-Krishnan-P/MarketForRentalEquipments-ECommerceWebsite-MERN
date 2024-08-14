import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../My_Styles/Navbar.css"
import { Link } from 'react-router-dom';
import { FaPersonBiking } from "react-icons/fa6";
import { FaCar } from "react-icons/fa6";
import { FaBusAlt } from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";
import { BiSolidFridge } from "react-icons/bi";
import { PiFanFill } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";



export const Navbar = ({ onData,adminShow }) => {

    const [search, setSearch] = useState("")

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchButton = (e) => {
        e.preventDefault(); 
        onData(search);
    };

    return (
        <div className='nav'>
            <div className='nav2'>
                <Link to={"/"}><button type="button" className="btn btn-outline-dark"><b>Home</b></button></Link>&nbsp;
                <div className="dropdown">
                    <button className="btn btn-outline-dark"><b>Our Equipments</b></button>
                    <div className="dropdown-content">
                        <hr />
                        <p><b>Travels</b></p>
                        <Link to={"/cars"}><FaCar size={20} /> &nbsp; Car</Link>
                        <Link to={"/bikes"}><FaPersonBiking size={20} /> &nbsp; Bike</Link>
                        <Link to={"/buses"}><FaBusAlt size={20} /> &nbsp; Bus</Link>
                        <hr />
                        <p><b> Home Appliances</b></p>
                        <Link to={"/washingMachines"}><GiWashingMachine size={20} /> &nbsp; Washing Machine</Link>
                        <Link to={"/fridges"}><BiSolidFridge size={20} /> &nbsp; Refrigerator</Link>
                        <Link to={"/fans"}><PiFanFill size={20} /> &nbsp; Fan</Link>
                        <Link to={"/airCoolers"}><TbAirConditioning size={20} /> &nbsp; Air Conditioner</Link>
                    </div>
                </div>&nbsp;
                <Link to={"/about"}><button type="button" className="btn btn-outline-dark"><b>About us</b></button></Link>&nbsp;
                { adminShow ?
                <div>
                <Link to={"/adminProducts"}><button type="button" className="btn btn-dark"><b>Admin Page</b></button></Link>
                </div>
                :null}
            </div>
            <nav className="navbar navbar-light bg-light">
                <form className="form-inline" onSubmit={handleSearchButton}>
                    <div className="row">
                        <div className="col">
                            <input className="form-control mr-sm-2" value={search} onChange={handleSearch} type="search" placeholder="Search from Home page" aria-label="Search" />
                        </div>
                        <div className="col">
                            <button className="btn btn-outline-dark my-2 my-sm-0"  type="submit"><b>Search</b></button>
                        </div>
                    </div>
                </form>
            </nav>

        </div>
    );
};

