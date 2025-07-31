import React from 'react'
import StatisticalData from '../../../components/dashboard/StatisticalData'
import StatisticBigData from '../../../components/dashboard/StatisticBigData'

function AdminStatisticalData() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Admin Dashboard</h1>

            <div className='flex justify-center '>
                <StatisticalData boxOneUp="Online Users" boxOneDown="450" boxTwoUp="Total Users" boxTwoDown="1200" boxTreeUp="Users with Bookings" boxTreeDown="300"/>
                <StatisticalData boxOneUp="Online Doctor" boxOneDown="450" boxTwoUp="Total Doctor" boxTwoDown="1200" boxTreeUp="Doctor with Bookings" boxTreeDown="300"/>
                <StatisticalData boxOneUp="Bookings Today" boxOneDown="450" boxTwoUp="Total Bookings" boxTwoDown="1200" boxTreeUp=" Bookings This Week" boxTreeDown="300" />
            </div>
                <StatisticBigData/>

        </div>
    )
}

export default AdminStatisticalData