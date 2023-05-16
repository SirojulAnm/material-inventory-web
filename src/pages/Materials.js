import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { tokenState } from '../store/index.js';
import { useRecoilValue, useSetRecoilState } from "recoil";

function Materials() {
    const getToken = useRecoilValue(tokenState);
    const setToken = useSetRecoilState(tokenState);
    const history = useHistory();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('v1/materials', {
            headers: {
                Authorization: `${getToken.user.token}`
            }
        })
        .then(response => {
            setData(response.data.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                history.replace('/login');
                setToken({ check: false, user: [] })
                localStorage.removeItem('tokenStorage');
            }
        });
    }, [getToken.user.token, history, setToken]);

    const filteredData = data.filter(item => item.Name.toLowerCase().includes(search.toLowerCase()));
    const columns = [
        {
            name: 'Name',
            selector: row => row.Name,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.Type,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.Quantity,
            sortable: true,
        },
        {
            name: 'Updated',
            selector: row => {
                const date = new Date(row.UpdatedAt);
                const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
                return formattedDate;
            },
            sortable: true,
        },
    ];
      
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <h5 className='mb-5'>Welcome To Materials {getToken.user.user.email}</h5>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by materials" />
                <DataTable
                    title="Materials"
                    columns={columns}
                    data={filteredData}
                    pagination
                />
            </div>
        </div>
    );
}

export default Materials;