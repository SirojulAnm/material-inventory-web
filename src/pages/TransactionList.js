import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { tokenState } from '../store/index.js';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from "recoil";

function TransactionList() {
    const getToken = useRecoilValue(tokenState);
    const setToken = useSetRecoilState(tokenState);
    const history = useHistory();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('v1/submission-list', {
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

    const filteredData = data.filter(item => item.Material.Name.toLowerCase().includes(search.toLowerCase()));
    const columns = [
        {
            name: 'Material',
            selector: row => row.Material.Name,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.Quantity,
            sortable: true,
        },
        {
            name: 'Reason',
            selector: row => row.Reason,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.Status,
            sortable: true,
        },
        {
            name: 'Status Warehouse',
            selector: row => row.WarehouseCategory,
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
                <h5 className='mb-5'>Welcome To Transaction List {getToken.user.user.email}</h5>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by materials" />
                <DataTable
                    title="Transaction List"
                    columns={columns}
                    data={filteredData}
                    pagination
                />
            </div>
        </div>
    );
}

export default TransactionList;