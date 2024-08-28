// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels, values }) => {
    // Sample data for the pie chart
    const data = {
        labels: labels,
        datasets: [{
            label: 'Dataset',
            data: values,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    return (
        <div className="pie-chart">
            <Pie data={data} />
        </div>
    );
};

export default PieChart;
