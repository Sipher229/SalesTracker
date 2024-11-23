/* eslint-disable react/prop-types */
import {Bar} from 'react-chartjs-2'
import Loading from '../../utils/Loading'


function BarChart({isLoading, logs = [], labels= [] }) {
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Weekly Progress',
            data: logs,
            fill: false,
            borderColor: "#1A5319",
            tension: 0.1,
          },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
        },
        scales: {
          x:{
            title:{
                display: true,
                text: "Date"
            }
          },
          y: {
            title: {
              display: true,
              text: "Sales Per Hour",
            },
            beginAtZero: true,
          },
        },
    }
    
  return (
    
    isLoading ? <Loading />: <Bar data={data} options={options} /> || <div className='roboto-medium'>No data to display</div>
    
)
}

export default BarChart