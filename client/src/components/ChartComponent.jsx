import './ChartComponent.css'; // Import the updated CSS file
import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement,Tooltip } from 'chart.js';
import axios from 'axios';

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement,Tooltip);

const ChartComponent = () => {  
  const [issueTypeData, setIssueTypeData] = useState({});
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats');
        const { issueTypeStats = [], statusStats = [] } = response.data || {};

        if (issueTypeStats.length > 0) {
          setIssueTypeData({
            labels: issueTypeStats.map(stat => stat._id),
            datasets: [{
              data: issueTypeStats.map(stat => stat.count),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
          });
        }

        if (statusStats.length > 0) {
          setStatusData({
            labels: statusStats.map(stat => stat._id),
            datasets: [{
              data: statusStats.map(stat => stat.count),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
          });
        }

      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchStats();
  }, []);

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = issueTypeData.labels[tooltipItem.dataIndex];
            const count = issueTypeData.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${count} issues`;
          }
        }
      }
    }
  };

  const barOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = statusData.labels[tooltipItem.dataIndex];
            const count = statusData.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${count} issues`;
          }
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <div className="pie-chart">
        <h2 className='title'>Issue Types</h2>
        {issueTypeData.labels ? <Pie data={issueTypeData} options={pieOptions} /> : <p>No data available for issue types</p>}
      </div>

      <div className="bar-chart">
        <h2 className='title'>Status Distribution</h2>
        {statusData.labels ? <Bar data={statusData} options={barOptions} /> : <p>No data available for status distribution</p>}
      </div>
    </div>
  );
};

export default ChartComponent;
