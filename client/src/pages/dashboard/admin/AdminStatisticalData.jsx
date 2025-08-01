import React from 'react'
import StatisticalData from '../../../components/dashboard/StatisticalData'
import StatisticBigData from '../../../components/dashboard/StatisticBigData'

function AdminStatisticalData() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Admin Dashboard</h1>

            
                <StatisticBigData/>

        </div>
    )
}

export default AdminStatisticalData