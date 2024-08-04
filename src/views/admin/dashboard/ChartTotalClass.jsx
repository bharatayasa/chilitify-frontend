import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import api from '../../../service/api';
import Cookies from 'js-cookie';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Class Count',
            data: [],
            backgroundColor: [],
        }],
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('token');
            if (token) {
                api.defaults.headers.common['Authorization'] = `${token}`;
                try {
                    const response = await api.get('/total/class');
                    const data = response.data.data;

                    const labels = data.map(item => item.class);
                    const counts = data.map(item => item.count);
                    const backgroundColors = [
                        '#a991f7',
                        '#a855f7',
                        '#37cdbe',
                        '#ec4899',
                        '#9966FF',
                        '#f43f5e'
                    ];

                    setChartData({
                        labels,
                        datasets: [{
                            label: 'Class Count',
                            data: counts,
                            backgroundColor: backgroundColors.slice(0, data.length),
                        }],
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                console.error("Token is not available!");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 rounded-lg mx-[50px] my-[50px]">
            <h3 className="text-xl font-bold mb-4 text-center">Total Class</h3>
            <div className="relative">
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                                },
                            },
                        },
                    }}
                    style={{ width: '100%', height: '400px' }}
                />
            </div>
        </div>
    );
};

export default PieChart;
