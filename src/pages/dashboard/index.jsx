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
                <div className="col-md-4">
                    <PieChart labels={labels} values={values} />
                </div>
                <div className="col-md-8">
                    <ColumnChart />
                </div>
            </div>
            <p className='py-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos at itaque illo ratione porro totam enim, quas ullam a neque.</p>
        </div>
    )
}

export default DashboardPage