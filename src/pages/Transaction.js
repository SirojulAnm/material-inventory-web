import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { tokenState } from '../store/index.js';
import { useRecoilValue } from "recoil";

function Transaction() {
    const getToken = useRecoilValue(tokenState);
    const [quantity, setQuantity] = useState(0);
    const [warehouseCategory, setWarehouseCategory] = useState('');
    
    const [materials, setMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState('');
    useEffect(() => {
        axios.get('/v1/materials', {
            headers: {
                Authorization: `${getToken.user.user.token}`
            }
        })
        .then(response => {
            setMaterials(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [getToken.user.user.token]);

    const [officer, setOfficer] = useState([]);
    const [selectedOfficer, setSelectedOfficer] = useState('');
    useEffect(() => {
        axios.get('/v1/warehouse-officer', {
            headers: {
                Authorization: `${getToken.user.user.token}`
            }
        })
        .then(response => {
            setOfficer(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [getToken.user.user.token]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();

        const transactionData = {
            material_id: parseInt(selectedMaterial, 10),
            quantity: parseInt(quantity, 10),
            receiver_id: parseInt(selectedOfficer, 10),
            warehouse_category: warehouseCategory
        };

        console.log(transactionData);
        axios.post('v1/transaction-submit', JSON.stringify(transactionData), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getToken.user.user.token}`
            }
        })
        .then(response => {
            console.log(response.data);
            setIsSubmitted(true);
        })
        .catch(error => {
            console.log(error.message);
        });
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-12">
                    <div className="card mt-5">
                        <div className="card-header">Material Transaksi</div>
                        <div className="card-body">
                        {isSubmitted ? (<p> The Form Has Been Submitted! </p>) : (
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
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction;