import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { tokenState } from '../store/index.js';
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const setToken = useSetRecoilState(tokenState);
    const getToken = useRecoilValue(tokenState);
    const history = useHistory();

    const logout = async () => {
        try {
            let response = await axios.get('v1/logout', {
                headers: {
                    Authorization: `${getToken.user.token}`
                }
            })
            toast.info(response.data.meta.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            setToken({ check: false, user: [] })
            localStorage.removeItem('tokenStorage');
        } catch (error) {
            if (error.response.data.meta.message) {
                toast.error(error.response.data.meta.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
            }
            if (error.response && error.response.status === 401) {
                history.replace('/login');
                setToken({ check: false, user: [] })
                localStorage.removeItem('tokenStorage');
            }
        }
    }

    return (
        <div>
            <ToastContainer />
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom py-3 mb-4">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">MIS</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    { getToken && getToken.check ?
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item" style={{marginLeft: '20px'}}>
                                <NavLink className="nav-link" to="/materials">Materials</NavLink>
                            </li>
                            { getToken.user.user.role === 'warehouse_officer' ?
                                <React.Fragment>
                                <li className="nav-item" style={{marginLeft: '20px'}}>
                                    <NavLink className="nav-link" to="/approval-list">Approval List</NavLink>
                                </li>
                                <li className="nav-item" style={{marginLeft: '20px'}}>
                                    <NavLink className="nav-link" to="/materials-add">Add Materials</NavLink>
                                </li>
                                </React.Fragment>
                                :
                                null
                            }
                            { getToken.user.user.role === 'user' ?
                                <React.Fragment>
                                    <li className="nav-item" style={{marginLeft: '20px'}}>
                                    <NavLink className="nav-link" to="/transaction-list">Transaction List</NavLink>
                                    </li>
                                    <li className="nav-item" style={{marginLeft: '20px'}}>
                                    <NavLink className="nav-link" to="/transaction">Transaction</NavLink>
                                    </li>
                                </React.Fragment>
                                :
                                null
                            }
                            <li className="nav-item" style={{marginLeft: '20px'}}>
                                <button className="nav-link btn" onClick={logout} >Logout</button>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item" style={{marginLeft: '20px'}}>
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item" style={{marginLeft: '20px'}}>
                            <NavLink className="nav-link" to="/register">Register</NavLink>
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