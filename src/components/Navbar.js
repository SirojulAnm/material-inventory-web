import React from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import { tokenState } from '../store/index.js';
import { useSetRecoilState, useRecoilValue } from "recoil";

function Navbar() {
    const setToken = useSetRecoilState(tokenState);
    const getToken = useRecoilValue(tokenState);

    const logout = async () => {
        localStorage.removeItem('tokenStorage');
        try {
            let response = await axios.get('v1/logout', {
                headers: {
                    Authorization: `${getToken.user.user.token}`
                }
            })
            console.log(response.data.meta.message);
            setToken({
                check: false,
                user: []
            })
        } catch (event) {
            console.log(event.message)
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom py-3 mb-4">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">MIS</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        getToken.check ?
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/materials">Materials</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/transaction-list">Transaction-List</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/transaction">Transaction</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn" onClick={logout} >Logout</button>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            </ul>
                    }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;