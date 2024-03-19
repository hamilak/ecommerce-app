import React from "react";
import './style.css'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/login')
    }

    return (
        <>
            <div className="nav-div">
                <div className="subnav-div">
                    <div className="nav-logo">
                        <h5>E-comm</h5>
                    </div>
                    <div className="menu-div">
                        <ul className="nav-menu">
                            <li className="item">
                                <a>Home</a>
                            </li>
                            <li className="item">
                                <a onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar