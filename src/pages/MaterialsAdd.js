import React, { useState } from 'react';
import axios from 'axios';
import { tokenState } from '../store/index.js';
import { useRecoilValue } from "recoil";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Transaction() {
    const history = useHistory();
    const getToken = useRecoilValue(tokenState);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name,
            type: type,
            quantity: parseInt(quantity, 10)
        };

        axios.post('v1/materials', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken.user.token}`
            }
        })
        .then(response => {
            toast.info(response.data.meta.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            history.replace('/materials');
        })
        .catch(error => {
            if (error.response.data.meta.message) {
                toast.error(error.response.data.meta.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
            }
        });
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="row justify-content-center align-items-center">
                <div className="col-md-12">
                <div className="card mt-5">
                    <div className="card-header">Add Materials</div>
                    <div className="card-body">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                        <div className="form-group row mt-3">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Name:</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row mt-3">
                            <label htmlFor="type" className="col-sm-3 col-form-label">Quantity:</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="type" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row mt-3">
                            <label htmlFor="quantity" className="col-sm-3 col-form-label">Type:</label>
                            <div className="col-sm-9">
                                <select className="btn dropdown-toggle" id="materials" name="materials" value={type} onChange={(event) => setType(event.target.value)}>
                                    <option value="">--Please choose an option--</option>
                                    <option value="raw">Raw</option>
                                    <option value="semi-finished">Semi Finished</option>
                                    <option value="finished">Finished</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mt-3">
                            <div className="col-sm-9 offset-sm-3">
                                <button type="submit" className="btn btn-primary">Submit</button>
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

export default Transaction;