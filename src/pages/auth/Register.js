import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const registerData = {
            name: name,
            email: email,
            password: password,
            role: role
        };

        axios.post('v1/register', JSON.stringify(registerData), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            toast.info(response.data.meta.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            setName('');
            setEmail('');
            setPassword('');
            setRole('');
            history.replace('/login');
        })
        .catch(error => {
            if (error.response.data.meta.message) {
                toast.error(error.response.data.meta.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
            }
            if (error.response.data.data) {
                toast.error(error.response.data.data, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });   
            }
        });
    }

    return (
        <div className="container">
            <ToastContainer />
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-header">Register</div>
                        <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row mt-3">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row mt-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="inputEmail3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row mt-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" id="inputPassword3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row mt-3">
                                <label className="col-sm-2 col-form-label">Role</label>
                                <div className="col-sm-10">
                                    <select className="btn dropdown-toggle" id="materials" name="materials" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">--Please choose an option--</option>
                                        <option value="user">User</option>
                                        <option value="warehouse_officer">Warehouse Officer</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row mt-3">
                                <div className="col-sm-10 offset-sm-2">
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <button type="submit" className="btn btn-primary btn-block">Register</button>
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;