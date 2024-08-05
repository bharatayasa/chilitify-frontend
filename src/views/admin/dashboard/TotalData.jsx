import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../../service/api.js';
import scan from '../../../assets/svg/scan.svg'
import users from '../../../assets/svg/users.svg'
import date from '../../../assets/svg/date.svg'

export default function TotalData() {
    const [totalPrediction, setTotalPrediction] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [totalUsersSum, setTotalUsersSum] = useState(null);

    const fetchDataTotalPredict = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                const response = await api.get('/total/prediction');
                setTotalPrediction(response.data.data[0].total);
            } catch (error) {
                console.error("There was an error fetching the total prediction!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };
    
    const fetchDataTotalUsers = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                const response = await api.get('/total/users');
                setTotalUsers(response.data.data[0].total);
            } catch (error) {
                console.error("There was an error fetching the total prediction!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };
    
    const fetchDataTotalSumNow = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = `${token}`;
            try {
                const response = await api.get('/total/sum/now');
                setTotalUsersSum(response.data.data[0].total);
            } catch (error) {
                console.error("There was an error fetching the total prediction!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchDataTotalPredict();
        fetchDataTotalUsers();
        fetchDataTotalSumNow();
    }, []);

    return (
        <div>
            <div className="stats shadow">

                <div className="stat flex flex-col items-center">
                    <div className="stat-figure w-14">
                        <img src={scan} alt="" />
                    </div>
                    <div className="stat-title">Total Prediction</div>
                    <div className="stat-value text-primary">{totalPrediction !== null ? totalPrediction : 'Loading...'}</div>
                </div>

                <div className="stat flex flex-col items-center">
                    <div className="stat-figure w-14">
                        <img src={users} alt="" />
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-primary">{totalUsers !== null ? totalUsers : 'Loading...'}</div>
                </div>

                <div className="stat flex flex-col items-center">
                <div className="stat-figure w-14">
                        <img src={date} alt="" />
                    </div>
                    <div className="stat-title">Prediksi hari ini</div>
                    <div className="stat-value text-primary">{totalUsersSum !== null ? totalUsersSum : 'Loading...'}</div>
                </div>
            </div>
        </div>
    );
}
