import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);


function StatisticBigData() {
    const [stats, setStats] = useState({
        bookingsToday: 12,
        bookingsWeek: 48,
        bookingsMonth: 210,
        bookingsTotal: 500,
        activeUsers: 89,
        totalUsers: 1300,
        totalDoctors: 45,
        callStats: { chat: 80, call: 60, video: 70 },
        bookingTrend: [5, 9, 6, 12, 14, 8, 11]
    });

    const pieData = {
        labels: ["Chat", "Call", "Video"],
        datasets: [
            {
                data: [stats.callStats.chat, stats.callStats.call, stats.callStats.video],
                backgroundColor: ["#4f46e5", "#10b981", "#f59e0b"]
            }
        ]
    };

    const lineData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Bookings",
                data: stats.bookingTrend,
                borderColor: "#3b82f6",
                backgroundColor: "#93c5fd",
                fill: true,
                tension: 0.4
            }
        ]
    };
    return (
        <div className="min-h-screen bg-gray-50 px-8 py-6 font-sans">

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Bookings Today", value: stats.bookingsToday },
                    { label: "This Week", value: stats.bookingsWeek },
                    { label: "This Month", value: stats.bookingsMonth },
                    { label: "Total Bookings", value: stats.bookingsTotal }
                ].map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-gray-500">{card.label}</p>
                        <h2 className="text-3xl font-bold text-blue-600 mt-2">{card.value}</h2>
                    </div>
                ))}
            </div>

            {/* USERS & DOCTORS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <p className="text-gray-500">Active Users</p>
                    <h2 className="text-3xl font-bold text-green-600 mt-2">{stats.activeUsers}</h2>
                </div>
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <p className="text-gray-500">Total Users</p>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</h2>
                </div>
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <p className="text-gray-500">Total Doctors</p>
                    <h2 className="text-3xl font-bold text-purple-600 mt-2">{stats.totalDoctors}</h2>
                </div>
            </div>

            {/* CHARTS */}
            <div>

                <div className="gap-6 flex ">
                    <div className="bg-white p-2 rounded-xl shadow w-80">
                        <h3 className="text-xl font-semibold mb-4">📈 Bookings This Week</h3>
                        <Line data={lineData} />
                    </div>
                    <div className="bg-white p-2 rounded-xl shadow w-80">
                        <h3 className="text-xl font-semibold mb-4">📊 Booking Types</h3>
                        <Pie data={pieData} />
                    </div>
                </div>

            </div>

        </div>

    )
}

export default StatisticBigData