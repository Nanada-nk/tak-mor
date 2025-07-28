function AppointmentDashboard() {
     const products = [
        {
            id: 1,
            patientName: 'Handmade Pouch',
            doctorName: 'Emily land',
            status:"pending",
            appointmentDate:"02 jun 2023",
            time:"09:00",
            department:"dent",
            type:"general",
            added: '29 Dec 2022',
        },
        {
            id: 2,
             patientName: 'Handmade Pouch',
            doctorName: 'Emily land',
            status:"pending",
            appointmentDate:"02 jun 2023",
            time:"09:00",
            department:"dent",
            type:"general",
            added: '29 Dec 2022',
        },
        {
            id: 3,
             patientName: 'Handmade Pouch',
            doctorName: 'Emily land',
            status:"pending",
            appointmentDate:"02 jun 2023",
            time:"09:00",
            department:"dent",
            type:"general",
            added: '29 Dec 2022',
        },
        {
            id: 4,
             patientName: 'Handmade Pouch',
            doctorName: 'Emily land',
            status:"pending",
            appointmentDate:"02 jun 2023",
            time:"09:00",
            department:"dent",
            type:"general",
            added: '29 Dec 2022',
        },
        {
            id: 5,
            patientName: 'Handmade Pouch',
            doctorName: 'Emily land',
            status:"pending",
            appointmentDate:"02 jun 2023",
            time:"09:00",
            department:"dent",
            type:"general",
            added: '29 Dec 2022',
        },
        {
            id: 6,
             patientName: 'Handmade Pouch',
            doctorName: 'Emily land',
            status:"pending",
            appointmentDate:"02 jun 2023",
            time:"09:00",
            department:"dent",
            type:"general",
            added: '29 Dec 2022',
        },
        {
            id: 7,
             patientName: 'Handmade Pouch',
            doctorName: 'Emily land',
            status:"pending",
            appointmentDate:"02 jun 2023",
            time:"09:00",
            department:"dent",
            type:"general",
            added: '29 Dec 2022',
        },
        {
            id: 8,
             patientName: 'Handmade Pouch',
            doctorName: 'Emily land',
            status:"pending",
            appointmentDate:"02 jun 2023",
            time:"09:00",
            department:"dent",
            type:"general",
            added: '29 Dec 2022',
        },
        {
            id: 9,
             patientName: 'Handmade Pouch',
            doctorName: 'Emily land',
            status:"pending",
            appointmentDate:"02 jun 2023",
            time:"09:00",
            department:"dent",
            type:"general",
            added: '29 Dec 2022',
        },
        {
            id: 10,
             patientName: 'Handmade Pouch',
            doctorName: 'Emily land',
            status:"pending",
            appointmentDate:"02 jun 2023",
            time:"09:00",
            department:"dent",
            type:"general",
            added: '29 Dec 2022',
        },
    ];
  return (
    <div className="max-w-7xl mx-auto ">
            <div className="bg-white shadow-md ">
                <div className="flex justify-between">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className=" py-3 text-left">

                                </th>
                                <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                                    ID
                                    
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    patientName
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                                    doctorName
                        
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    appointmentDate
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    department
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                   added
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                   action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id} className={`${product.selected ? 'bg-blue-50' : ''} hover:bg-gray-50`}>
                                    <td className=" whitespace-nowrap">

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <div className="flex items-center">
                                            
                                            <div className="">
                                                <div className="font-medium text-gray-900">{product.id}</div>

                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.patientName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.doctorName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.appointmentDate}
                                    </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.time}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.department}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.added}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-gray-600 hover:text-gray-900 mr-2">
                                            {/* Edit Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </a>
                                        <a href="#" className="text-gray-600 hover:text-gray-900">
                                            {/* Delete Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="join flex justify-center my-5">
                <nav aria-label="Pagination" class="flex justify-center items-center space-x-2">
                    <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">Prev</button>

                    <ul class="flex space-x-2">
                        <li>
                            <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">1</button>
                        </li>
                        <li>
                            <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">
                                2
                            </button>
                        </li>
                        <li>
                            <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">3</button>
                        </li>
                        <li>
                            <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">4</button>
                        </li>
                        <li>
                            <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">5</button>
                        </li>
                    </ul>

                    <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">Next</button>
                </nav>
            </div>
        </div>
  )
}

export default AppointmentDashboard