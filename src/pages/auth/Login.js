import React from 'react';
import { useRef } from 'react';
import axios from "axios";
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { tokenState } from './../../store/index.js';

function Login() {
    const history = useHistory();
    const setToken = useSetRecoilState(tokenState);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const payload = {
            email: enteredEmail,
            password: enteredPassword,
        };

        try {
            const response = await axios.post('v1/login', JSON.stringify(payload));
            const data = response.data;
            setToken({
                check: true,
                user: data.data
            })
            const saveStorage = {
                check: true,
                user: data.data
            }
            localStorage.setItem('tokenStorage', JSON.stringify(saveStorage));
            history.replace('/dashboard');
        } catch (event) {
            console.log(event.message);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                        Email
                                    </label>
                                    <div className="col-sm-8">
                                        <input type="email" className="form-control" id="inputEmail3" placeholder="Email" ref={emailInputRef} />
                                    </div>
                                </div>
                                <div className="form-group row mt-3">
                                    <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">
                                        Password
                                    </label>
                                    <div className="col-sm-8">
                                        <input type="password" className="form-control" id="inputPassword3" placeholder="Password" ref={passwordInputRef} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;