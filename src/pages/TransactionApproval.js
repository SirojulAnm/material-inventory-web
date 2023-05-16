import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { tokenState } from '../store/index.js';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const history = useHistory();
    const getToken = useRecoilValue(tokenState);
    const setToken = useSetRecoilState(tokenState);
    const { id } = useParams();

    const [transaction, setTransaction] = useState('');
    const [material, setMaterial] = useState('');
    useEffect(() => {
        axios.get(`v1/transaction/${id}`, {
            headers: {
                Authorization: `${getToken.user.token}`
            }
        })
        .then(response => {
            setMaterial(response.data.data.Material);
            setTransaction(response.data.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                history.replace('/login');
                setToken({ check: false, user: [] })
                localStorage.removeItem('tokenStorage');
            }
        });
    }, [id, getToken.user.token, history, setToken]);
    
    const [reason, setReason] = useState('');
    const handleSubmit = (status) => {
        if (reason === '') {
            toast.warning("Approval Reason is required", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
        }
        const data = {
            status: status,
            transaction_id: parseInt(id, 10),
            reason: reason
        }

        axios.post('v1/transaction-approval', JSON.stringify(data), {
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
            history.replace('/approval-list');
        })
        .catch(error => {
            if (error.response.data.meta.message) {
                toast.error(error.response.data.meta.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
            }
        });
    }
  
  return (
    <div className="container mt-5">
        <ToastContainer />
        <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                <h5 className="card-title text-center">Receive item to Warehouse</h5>
                </div>
                <div className="card-body">
                <h5>{material.Name}</h5>
                <label htmlFor="reason" className='mb-1'>{transaction.WarehouseCategory}</label><br />
                <label htmlFor="reason" className='mb-1'>{transaction.Quantity}</label><br />
                <form className='mt-3'>
                    <div className="form-group">
                    <textarea
                        className="form-control mb-5"
                        placeholder="Approval Reason"
                        id="reason"
                        rows="3"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required>
                    </textarea>
                    <div className="invalid-feedback">Please enter the approval reason</div>
                    </div>
                    <div className="form-group mt-5">
                    <button className="btn btn-success" type="button" style={{marginLeft: '10px'}} onClick={() => handleSubmit('updated')}>
                        Updated
                    </button>
                    <button className="btn btn-warning" type="button" style={{marginLeft: '10px'}} onClick={() => handleSubmit('issue')}>
                        Issue
                    </button>
                    <button className="btn btn-danger" type="button" style={{marginLeft: '10px'}} onClick={() => handleSubmit('deleted')}>
                        Deleted
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}

export default Home;
