

function DoctorDashboard() {
    const products = [
        {
            id: 1,
            name: 'Handmade Pouch',
            firstName: 'Emily',
            lastName: "Johnson",
            specialtyId: '302012',
            role: "1",
            address: '123 Main Street, Springfield, IL 62704, USA',
            birthDate: '1 jan 2001',
            statusColor: 'bg-red-100 text-red-800',
            added: '29 Dec 2022',
        },
        {
            id: 2,
            name: 'Handmade Pouch',
            firstName: 'Emily',
            lastName: "Johnson",
            specialtyId: '302012',
            role: "1",
            address: '123 Main Street, Springfield, IL 62704, USA',
            birthDate: '1 jan 2001',
            statusColor: 'bg-red-100 text-red-800',
            added: '29 Dec 2022',
        },
        {
            id: 3,
            name: 'Handmade Pouch',
            firstName: 'Emily',
            lastName: "Johnson",
            specialtyId: '302012',
            role: "1",
            address: '123 Main Street, Springfield, IL 62704, USA',
            birthDate: '1 jan 2001',
            statusColor: 'bg-red-100 text-red-800',
            added: '29 Dec 2022',
        },
        {
            id: 4,
            name: 'Handmade Pouch',
            firstName: 'Emily',
            lastName: "Johnson",
            specialtyId: '302012',
            role: "1",
            address: '123 Main Street, Springfield, IL 62704, USA',
            birthDate: '1 jan 2001',
            statusColor: 'bg-red-100 text-red-800',
            added: '29 Dec 2022',
        },
        {
            id: 5,
            name: 'Handmade Pouch',
            firstName: 'Emily',
            lastName: "Johnson",
            specialtyId: '302012',
            role: "1",
            address: '123 Main Street, Springfield, IL 62704, USA',
            birthDate: '1 jan 2001',
            statusColor: 'bg-red-100 text-red-800',
            added: '29 Dec 2022',
        },
        {
            id: 6,
            name: 'Handmade Pouch',
            firstName: 'Emily',
            lastName: "Johnson",
            specialtyId: '302012',
            role: "1",
            address: '123 Main Street, Springfield, IL 62704, USA',
            birthDate: '1 jan 2001',
            statusColor: 'bg-red-100 text-red-800',
            added: '29 Dec 2022',
        },
        {
            id: 7,
            name: 'Handmade Pouch',
            firstName: 'Emily',
            lastName: "Johnson",
            specialtyId: '302012',
            role: "1",
            address: '123 Main Street, Springfield, IL 62704, USA',
            birthDate: '1 jan 2001',
            statusColor: 'bg-red-100 text-red-800',
            added: '29 Dec 2022',
        },
        {
            id: 8,
            name: 'Handmade Pouch',
            firstName: 'Emily',
            lastName: "Johnson",
            specialtyId: '302012',
            role: "1",
            address: '123 Main Street, Springfield, IL 62704, USA',
            birthDate: '1 jan 2001',
            statusColor: 'bg-red-100 text-red-800',
            added: '29 Dec 2022',
        },
        {
            id: 9,
            name: 'Handmade Pouch',
            firstName: 'Emily',
            lastName: "Johnson",
            specialtyId: '302012',
            role: "1",
            address: '123 Main Street, Springfield, IL 62704, USA',
            birthDate: '1 jan 2001',
            statusColor: 'bg-red-100 text-red-800',
            added: '29 Dec 2022',
        },
        {
            id: 10,
            name: 'Handmade Pouch',
            firstName: 'Emily',
            lastName: "Johnson",
            specialtyId: '302012',
            role: "1",
            address: '123 Main Street, Springfield, IL 62704, USA',
            birthDate: '1 jan 2001',
            statusColor: 'bg-red-100 text-red-800',
            added: '29 Dec 2022',
        },
    ];
    return (
        <div className="max-w-7xl mx-auto ">
            <div className="bg-white shadow-md ">
                <div className="">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className=" py-3 text-left">

                                </th>
                                <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                                    ID
                                    {/* Dropdown Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    FirstName
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                                    LastName
                                    {/* Dropdown Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    specialtyId
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    birtDAte
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Added
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
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
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {/* รูปสินค้า (ตัวอย่าง) */}
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={`https://via.placeholder.com/40?text=${product.firstName}`}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">{product.id}</div>

                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.firstName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.specialtyId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.role}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.address.length >  10
                                            ? product.address.substring(0, 10) + '...'
                                            : product.address}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">

                                        {product.birthDate}

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

export default DoctorDashboard