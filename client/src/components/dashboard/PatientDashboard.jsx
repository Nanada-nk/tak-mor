// const products = [
//     {
//         id: 1,
//         name: 'Handmade Pouch',
//         hnId: '302012',
//         firstName: 'Emily',
//         lastName: "Johnson",
//         address: '123 Main Street, Springfield, IL 62704, USA',
//         birthDate: '1 jan 2001',
//         statusColor: 'bg-red-100 text-red-800', // Custom class for status badge
//         added: '29 Dec 2022',
//     },
//     {
//         id: 2,
//         name: 'Handmade Pouch',
//         hnId: '302012',
//         firstName: 'Emily',
//         lastName: "Johnson",
//         address: '123 Main Street, Springfield, IL 62704, USA',
//         birthDate: '1 jan 2001',
//         statusColor: 'bg-red-100 text-red-800', // Custom class for status badge
//         added: '29 Dec 2022',
//     },
//     {
//         id: 3,
//         name: 'Handmade Pouch',
//         hnId: '302012',
//         firstName: 'Emily',
//         lastName: "Johnson",
//         address: '123 Main Street, Springfield, IL 62704, USA',
//         birthDate: '1 jan 2001',
//         statusColor: 'bg-red-100 text-red-800', // Custom class for status badge
//         added: '29 Dec 2022',
//     },
//     {
//         id: 4,
//         name: 'Handmade Pouch',
//         hnId: '302012',
//         firstName: 'Emily',
//         lastName: "Johnson",
//         address: '123 Main Street, Springfield, IL 62704, USA',
//         birthDate: '1 jan 2001',
//         statusColor: 'bg-red-100 text-red-800', // Custom class for status badge
//         added: '29 Dec 2022',
//     },
//     {
//         id: 5,
//         name: 'Handmade Pouch',
//         hnId: '302012',
//         firstName: 'Emily',
//         lastName: "Johnson",
//         address: '123 Main Street, Springfield, IL 62704, USA',
//         birthDate: '1 jan 2001',
//         statusColor: 'bg-red-100 text-red-800', // Custom class for status badge
//         added: '29 Dec 2022',
//     },
//     {
//         id: 6,
//         name: 'Handmade Pouch',
//         hnId: '302012',
//         firstName: 'Emily',
//         lastName: "Johnson",
//         address: '123 Main Street, Springfield, IL 62704, USA',
//         birthDate: '1 jan 2001',
//         statusColor: 'bg-red-100 text-red-800', // Custom class for status badge
//         added: '29 Dec 2022',
//     },
//     {
//         id: 7,
//         name: 'Handmade Pouch',
//         hnId: '302012',
//         firstName: 'Emily',
//         lastName: "Johnson",
//         address: '123 Main Street, Springfield, IL 62704, USA',
//         birthDate: '1 jan 2001',
//         statusColor: 'bg-red-100 text-red-800', // Custom class for status badge
//         added: '29 Dec 2022',
//     },
//     {
//         id: 8,
//         name: 'Handmade Pouch',
//         hnId: '302012',
//         firstName: 'Emily',
//         lastName: "Johnson",
//         address: '123 Main Street, Springfield, IL 62704, USA',
//         birthDate: '1 jan 2001',
//         statusColor: 'bg-red-100 text-red-800', // Custom class for status badge
//         added: '29 Dec 2022',
//     },
//     {
//         id: 9,
//         name: 'Handmade Pouch',
//         hnId: '302012',
//         firstName: 'Emily',
//         lastName: "Johnson",
//         address: '123 Main Street, Springfield, IL 62704, USA',
//         birthDate: '1 jan 2001',
//         statusColor: 'bg-red-100 text-red-800', // Custom class for status badge
//         added: '29 Dec 2022',
//     },
//     {
//         id: 10,
//         name: 'Handmade Pouch',
//         hnId: '302012',
//         firstName: 'Emily',
//         lastName: "Johnson",
//         address: '123 Main Street, Springfield, IL 62704, USA',
//         birthDate: '1 jan 2001',
//         statusColor: 'bg-red-100 text-red-800', // Custom class for status badge
//         added: '29 Dec 2022',
//     },
// ];

// function PatientDashboard() {
//     return (
//         <div className="max-w-7xl mx-auto ">
//             <div className="bg-white shadow-md ">
//                 <div className="">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className=" py-3 text-left">

//                                 </th>
//                                 <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
//                                     ID
//                                     {/* Dropdown Icon */}
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                                     </svg>
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     HnId
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     FirstName
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
//                                     LastName
//                                     {/* Dropdown Icon */}
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                                     </svg>
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Address
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     birtDAte
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Added
//                                 </th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Action
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {products.map((product) => (
//                                 <tr key={product.id} className={`${product.selected ? 'bg-blue-50' : ''} hover:bg-gray-50`}>
//                                     <td className=" whitespace-nowrap">

//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                         <div className="flex items-center">
//                                             <div className="flex-shrink-0 h-10 w-10">
//                                                 {/* รูปสินค้า (ตัวอย่าง) */}
//                                                 <img
//                                                     className="h-10 w-10 rounded-full object-cover"
//                                                     src={`https://via.placeholder.com/40?text=${product.firstName}`}
//                                                     alt=""
//                                                 />
//                                             </div>
//                                             <div className="ml-4">
//                                                 <div className="font-medium text-gray-900">{product.id}</div>

//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium cursor-pointer hover:underline">
//                                         {product.hnId}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         {product.firstName}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         {product.lastName}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         {product.address}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">

//                                         {product.birthDate}

//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         {product.added}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                         <a href="#" className="text-gray-600 hover:text-gray-900 mr-2">
//                                             {/* Edit Icon */}
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                                             </svg>
//                                         </a>
//                                         <a href="#" className="text-gray-600 hover:text-gray-900">
//                                             {/* Delete Icon */}
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                             </svg>
//                                         </a>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             <div className="join flex justify-center my-5">
//                 <nav aria-label="Pagination" class="flex justify-center items-center space-x-2">
//                     <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">Prev</button>

//                     <ul class="flex space-x-2">
//                         <li>
//                             <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">1</button>
//                         </li>
//                         <li>
//                             <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">
//                                 2
//                             </button>
//                         </li>
//                         <li>
//                             <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">3</button>
//                         </li>
//                         <li>
//                             <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">4</button>
//                         </li>
//                         <li>
//                             <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">5</button>
//                         </li>
//                     </ul>

//                     <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">Next</button>
//                 </nav>
//             </div>
//         </div>

//     )
// }

// export default PatientDashboard




// รับ props: patients (ข้อมูลผู้ป่วย), pagination (ข้อมูล pagination), onPageChange (ฟังก์ชันเปลี่ยนหน้า)


function PatientDashboard({ patients, pagination, onPageChange }) {
    // ฟังก์ชันสำหรับสร้าง Page Number Buttons
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= pagination.totalPages; i++) {
            pageNumbers.push(
                <li key={i}>
                    <button
                        onClick={() => onPageChange(i)}
                        className={`px-4 py-2 rounded-full border border-gray-300 ${i === pagination.currentPage ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {i}
                    </button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left">
                                    {/* Checkbox column - ถ้ามี */}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                                    ID
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    HN ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    First Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                                    Last Name
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Birth Date
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
                            {patients.length > 0 ? (
                                patients.map((patient) => (
                                    <tr key={patient.id} className={`hover:bg-gray-50`}> {/* ลบ product.selected ถ้าไม่มี */}
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            {/* Checkbox (ถ้ามี) */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {/* รูปภาพผู้ป่วย (ใช้ firstName เป็น placeholder) */}
                                                    <img
                                                        className="h-10 w-10 rounded-full object-cover"
                                                        src={`https://placehold.co/40x40/E0E0E0/333333?text=${patient.firstName.charAt(0)}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{patient.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                                            {patient.hn}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {patient.firstName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {patient.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {patient.address}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {patient.birthDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {patient.createdAt ? new Date(patient.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-gray-600 hover:text-gray-900 mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </a>
                                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="py-4 text-center text-gray-500">No patients found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center my-5">
                    <nav aria-label="Pagination" className="flex justify-center items-center space-x-2">
                        <button
                            onClick={() => onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <ul className="flex space-x-2">
                            {renderPageNumbers()} {/* เรียกใช้ฟังก์ชันเพื่อสร้างปุ่ม Page Number */}
                        </ul>

                        <button
                            onClick={() => onPageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;