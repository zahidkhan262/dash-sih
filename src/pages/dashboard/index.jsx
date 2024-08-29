import React from 'react'
import DashCard from '../../components/cards/dash-card'
import PieChart from '../../components/chart/pie-chart'
import { chartData } from '../../utils/data'
import ColumnChart from '../../components/chart/column-chart'






const DashboardPage = () => {

    const labels = chartData?.map(({ label }) => (label));
    const values = chartData?.map(({ value }) => (value));

    return (
        <div className="container">
            <DashCard />
            <div className="row">
                <h3 className='px-4 py-2'>Overview</h3>
                <hr />
                <div className="col-md-4">
                    <PieChart labels={labels} values={values} />
                </div>
                <div className="col-md-8">
                    <ColumnChart />
                </div>
            </div>
            
           
        </div>
    )
}

export default DashboardPage