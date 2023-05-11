import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { tokenState } from '../store/index.js';
import { useRecoilValue } from "recoil";

function TransactionList() {
    const getToken = useRecoilValue(tokenState);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('v1/submission-list', {
            headers: {
                Authorization: `${getToken.user.user.token}`
            }
        })
        .then(response => {
            setData(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [getToken.user.user.token]);
      

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <h5 className='mb-5'>Welcome To Materials {getToken.user.user.user.email}</h5>
                    <table>
                    <thead>
                        <tr>
                        <th>Material</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Status Warehouse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(user => (
                        <tr key={user.ID}>
                            <td>{user.Material.Name}</td>
                            <td>{user.Quantity}</td>
                            <td>{user.Status}</td>
                            <td>{user.WarehouseCategory}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
            </div>
        </div>
    );
}

export default TransactionList;