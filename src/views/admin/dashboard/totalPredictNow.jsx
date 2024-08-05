import React, { useEffect, useState } from 'react';
import api from '../../../service/api';
import Cookies from 'js-cookie';

export default function TotalPredictNow() {
    const [totalData, setTotalData] = useState([]);

    const fetchDataTotalPredictNow = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                const response = await api.get('/total/now');
                setTotalData(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the total prediction now:", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchDataTotalPredictNow();
    }, []);

    return (
        <div>
            <h3 className="text-xl font-bold mt-4 text-center">Total Predict Today</h3>
            <div className='flex flex-wrap items-center justify-center'>
                {totalData.map((item, index) => (
                    <div key={index} className='bg-primary/40 px-5 w-40 py-5 mx-5 my-5 rounded-md text-center shadow-xl'>
                        <p className='font-semibold'>{item.class}</p>
                        <p>Jumlah: {item.count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
