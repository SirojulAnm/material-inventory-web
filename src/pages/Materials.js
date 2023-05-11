import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { tokenState } from '../store/index.js';
import { useRecoilValue } from "recoil";

function Materials() {
    const getToken = useRecoilValue(tokenState);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('v1/materials', {
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
                        <th>Name</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(user => (
                        <tr key={user.ID}>
                            <td>{user.Name}</td>
                            <td>{user.Type}</td>
                            <td>{user.Quantity}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
            </div>
        </div>
    );
}

export default Materials;