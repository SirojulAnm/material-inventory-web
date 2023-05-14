import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { tokenState } from '../store/index.js';
import { useRecoilValue } from "recoil";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Transaction() {
    const history = useHistory();
    const getToken = useRecoilValue(tokenState);
    const token = getToken ? getToken.user.token : '';
    const [quantity, setQuantity] = useState(0);
    const [warehouseCategory, setWarehouseCategory] = useState('');
    
    const [materials, setMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState('');
    useEffect(() => {
        axios.get('/v1/materials', {
            headers: {
                Authorization: `${token}`
            }
        })
        .then(response => {
            setMaterials(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [token]);

    const [officer, setOfficer] = useState([]);
    const [selectedOfficer, setSelectedOfficer] = useState('');
    useEffect(() => {
        axios.get('/v1/warehouse-officer', {
            headers: {
                Authorization: `${token}`
            }
        })
        .then(response => {
            setOfficer(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [token]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const transactionData = {
            material_id: parseInt(selectedMaterial, 10),
            quantity: parseInt(quantity, 10),
            receiver_id: parseInt(selectedOfficer, 10),
            warehouse_category: warehouseCategory
        };

        axios.post('v1/transaction-submit', JSON.stringify(transactionData), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        .then(response => {
            toast.info(response.data.meta.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            setQuantity(0);
            setWarehouseCategory('');
            setSelectedMaterial('');
            setSelectedOfficer('');
            history.replace('/transaction-list');
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
        <div className="container">
            <ToastContainer />
            <div className="row justify-content-center align-items-center">
                <div className="col-md-12">
                    <div className="card mt-5">
                        <div className="card-header">Material Transaksi</div>
                        <div className="card-body">
                        <form className="form-horizontal" onSubmit={handleSubmit}>
                            <div className="form-group row mt-3">
                            <label htmlFor="materials" className="col-sm-3 col-form-label">Choose a material:</label>
                            <div className="col-sm-9">
                            <select className="btn dropdown-toggle" id="materials" name="materials" value={selectedMaterial} onChange={e => setSelectedMaterial(e.target.value)}>
                                <option value="">--Please choose an option--</option>
                                {materials.map(material => (
                                    <option key={material.ID} value={material.ID}>{material.Name}</option>
                                ))}
                            </select>
                            </div>
                            </div>
                            <div className="form-group row mt-3">
                                <label className="col-sm-3 col-form-label">Quantity:</label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group row mt-3">
                                <label className="col-sm-3 col-form-label">Warehouse Officer:</label>
                                <div className="col-sm-9">
                                    <select className="btn dropdown-toggle" id="materials" name="materials" value={selectedOfficer} onChange={e => setSelectedOfficer(e.target.value)}>
                                        <option value="">--Please choose an option--</option>
                                        {officer.map(officer => (
                                            <option key={officer.ID} value={officer.ID}>{officer.Name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row mt-3">
                                <label className="col-sm-3 col-form-label">Warehouse Category:</label>
                                <div className="col-sm-9">
                                    <select className="btn dropdown-toggle" id="materials" name="materials" value={warehouseCategory} onChange={e => setWarehouseCategory(e.target.value)}>
                                        <option value="">--Please choose an option--</option>
                                        <option value="add-warehouse">Add Warehouse</option>
                                        <option value="take-warehouse">Take Warehouse</option>
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