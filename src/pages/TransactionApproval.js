import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { tokenState } from '../store/index.js';
import { useRecoilValue } from "recoil";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const history = useHistory();
    const getToken = useRecoilValue(tokenState);
    const [reason, setReason] = useState('');
    const { id } = useParams();
    
    const handleSubmit = (status) => {
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
                <form>
                    <div className="form-group">
                    <label htmlFor="reason">Approval Reason</label>
                    <textarea
                        className="form-control mb-5"
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
