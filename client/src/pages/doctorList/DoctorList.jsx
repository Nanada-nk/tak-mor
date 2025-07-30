import React, { useState } from 'react'
import Brandner from '../../components/Brandner'
import { Search, MapPin, Calendar, ChevronDown } from 'lucide-react'
import PricingFilter from '../../components/DoctorList/PricingFilter';
import DoctorCardList from '../../components/DoctorList/DoctorCardList';
import Pagination from '../../components/Pagination';

function DoctorList() {

    const totalNewsItems = 50;
    const itemsPerPage = 8;
    const currentPage = 1;
    const handlePageChange = (page) => {
        console.log("Changing to page:", page);

    };
    const initialSpecialties = [
        { id: 1, name: 'Urology', count: 21, checked: true },
        { id: 2, name: 'Psychiatry', count: 21, checked: false },
        { id: 3, name: 'Cardiology', count: 21, checked: false },
        { id: 4, name: 'Pediatrics', count: 21, checked: false },
        { id: 5, name: 'Urology', count: 21, checked: false }, // ซ้ำจากรูปภาพ
        { id: 6, name: 'Neurology', count: 21, checked: false },
        { id: 7, name: 'Pulmonology', count: 21, checked: false },
        { id: 8, name: 'Orthopedics', count: 21, checked: false },
        { id: 9, name: 'Endocrinology', count: 21, checked: false },
        // สามารถเพิ่มข้อมูลเพิ่มเติมได้ หากมีมากกว่า 9 รายการ
        { id: 10, name: 'Dermatology', count: 18, checked: false },
        { id: 11, name: 'Ophthalmology', count: 25, checked: false },
    ];
    const initialGender = [
        { id: 1, name: 'Male', count: 21, checked: true },
        { id: 2, name: 'Fermale', count: 21, checked: false },
    ]

    const initialAvailability = [
        { id: 1, name: 'Availiable Today', checked: true },
        { id: 2, name: 'Availiable Tomorrow', checked: false },
        { id: 3, name: 'Availiable in Next 7 Days', checked: false },
        { id: 4, name: 'Availiable in Next 30 Days', checked: false },
    ]

    const initialExperience = [
        { id: 1, name: '2+ Years', checked: true },
        { id: 2, name: '5+ Years', checked: false },
        { id: 3, name: '10+ Years', checked: false },
        { id: 4, name: '20+ Years', checked: false },
    ]

    const initialClinics = [
        { id: 1, name: 'Bright Smiles Dental Clinic', checked: true },
        { id: 2, name: 'Family Care Clinic', checked: false },
        { id: 3, name: 'Express Health Clinic', checked: false },
        { id: 4, name: 'Restore Physical Therapy', checked: false },
        { id: 5, name: 'Blossom Women’s Health Clinic', checked: false },

    ]
    const initialConsultationType = [
        { id: 1, name: 'Audio Call', checked: true },
        { id: 2, name: 'Video Call', checked: false },
        { id: 3, name: 'Instant Counseling', checked: false },
        { id: 4, name: 'Chat', checked: false },
    ]

    const initialLanguages = [
        { id: 1, name: 'English', checked: true },
        { id: 2, name: 'Thai', checked: false },
        { id: 3, name: 'Chinese', checked: false },
    ]

    const initialRatings = [
        { id: 1, name: '5 Start', checked: true, start: 5 },
        { id: 2, name: '4 Start', checked: false, start: 4 },
        { id: 3, name: '3 Start', checked: false, start: 3 },
        { id: 4, name: '2 Start', checked: false, start: 2 },
        { id: 5, name: '1 Start', checked: false, start: 1 },
    ]



    const [specialties, setSpecialties] = useState(initialSpecialties);
    const [gender, setGender] = useState(initialGender);


    const [showAll, setShowAll] = useState(false); // State สำหรับควบคุมการแสดง "View More"
    const [isExpandedSpecialities, setIsExpandedSpecialities] = useState(false);
    const [isExpandedGender, setIsExpandedGender] = useState(false);
    const [isExpandedAvailability, setIsExpandedAvailability] = useState(false);
    const [isExpandedExperience, setIsExpandedExperience] = useState(false);
    const [isExpandedClinics, setIsExpandedClinics] = useState(false);
    const [isExpandedConsultationType, setIsExpandedConsultationType] = useState(false);
    const [isExpandedLanguages, setIsExpandedLanguages] = useState(false);
    const [isExpandedRatings, setIsExpandedRatings] = useState(false);





    // จำนวนรายการที่จะแสดงตอนแรก
    const visibleSpecialtiesCount = 9;
    const specialtiesToShow = showAll ? specialties : specialties.slice(0, visibleSpecialtiesCount);

    const handleCheckboxChange = (id) => {
        setSpecialties((prevSpecialties) =>
            prevSpecialties.map((spec) =>
                spec.id === id ? { ...spec, checked: !spec.checked } : spec
            )
        );
    };

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };
    const toggleExpansionSpecialities = () => {
        setIsExpandedSpecialities(!isExpandedSpecialities);
    };
    const toggleExpansionGender = () => {
        setIsExpandedGender(!isExpandedGender);
    };
    const toggleExpansionAvailability = () => {
        setIsExpandedAvailability(!isExpandedAvailability);
    };
    const toggleExpansionExperience = () => {
        setIsExpandedExperience(!isExpandedExperience);
    };
    const toggleExpansionClinics = () => {
        setIsExpandedClinics(!isExpandedClinics);
    };
    const toggleExpansionConsultationType = () => {
        setIsExpandedConsultationType(!isExpandedConsultationType);
    };
    const toggleExpansionLanguages = () => {
        setIsExpandedLanguages(!isExpandedLanguages);
    };
    const toggleExpansionRatings = () => {
        setIsExpandedRatings(!isExpandedRatings);
    };


    return (

        <div>
            <div>
                <div>
                    <Brandner title='All Doctor' />
                </div>

                <div className="relative bg-white p-4 sm:p-3 rounded-full shadow-lg border border-blue-200 mx-auto max-w-4xl -mt-10 z-10"> {/* -mt-16 จำลองการเลื่อนขึ้นมาทับส่วนบน */}
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Search for Doctors, Hospitals, Clinics */}
                        <div className="flex items-center flex-grow w-full sm:w-auto">
                            <Search />
                            <input
                                type="text"
                                placeholder="Search for Doctors"
                                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                            />
                        </div>

                        {/* Vertical Divider for larger screens */}
                        <div className="hidden sm:block w-px bg-gray-200 h-8"></div>

                        {/* Location */}
                        <div className="flex items-center flex-grow w-full sm:w-auto sm:justify-center">
                            <MapPin />
                            <input
                                type="text"
                                placeholder="Location"
                                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                            />
                        </div>

                        {/* Vertical Divider for larger screens */}
                        <div className="hidden sm:block w-px bg-gray-200 h-8"></div>

                        {/* Date */}
                        <div className="flex items-center flex-grow w-full sm:w-auto sm:justify-center">
                            <Calendar />
                            <input
                                type="text"
                                placeholder="Date"
                                onFocus={(e) => (e.target.type = "date")} // เปลี่ยนเป็น type date เมื่อ focus
                                onBlur={(e) => (e.target.type = "text")} // เปลี่ยนกลับเป็น type text เมื่อ blur
                                className="flex-grow focus:outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                            />
                        </div>

                        {/* Search Button */}
                        <button className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out w-full sm:w-auto">

                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex justify-between px-15 '>
                <div className='w-1/4'>
                    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 ">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">ค้นหา</h2>

                        <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden join-mb3">

                            <input
                                type="text"
                                placeholder="ค้นหา"
                                className="input input-bordered join-item ]"
                            />


                            <button className="btn btn-primary join-item bg-[#3B80F5]">

                                <Search />
                            </button>
                        </div>
                    </div>

                    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 ">
                        {/* Header "Specialities" with dropdown arrow */}
                        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={toggleExpansionSpecialities}> {/* <-- NEW: เพิ่ม onClick ตรงนี้ */}
                            <h3 className="text-xl font-bold text-gray-800">Specialities</h3>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                <ChevronDown />
                            </button>
                        </div>

                        {/* List of Specialties - แสดงเมื่อ isExpanded เป็น true เท่านั้น */}
                        {isExpandedSpecialities && ( // <-- NEW: เงื่อนไขการแสดงผล
                            <>
                                <div className="space-y-3">
                                    {specialtiesToShow.map((spec) => (
                                        <label key={spec.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                                    checked={spec.checked}
                                                    onChange={() => handleCheckboxChange(spec.id)}
                                                />
                                                <span className="ml-3 text-gray-700 text-base">{spec.name}</span>
                                            </div>
                                            <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                                                {spec.count}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                {/* View More / View Less Link */}
                                {specialties.length > visibleSpecialtiesCount && (
                                    <div className="mt-4">
                                        <button
                                            onClick={toggleShowAll}
                                            className="text-blue-600 font-semibold hover:text-blue-800 transition duration-150"
                                        >
                                            {showAll ? 'View Less' : 'View More'}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 ">
                        {/* Header "Specialities" with dropdown arrow */}
                        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={toggleExpansionGender}> {/* <-- NEW: เพิ่ม onClick ตรงนี้ */}
                            <h3 className="text-xl font-bold text-gray-800">เพศ</h3>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                <ChevronDown />
                            </button>
                        </div>

                        {/* List of Specialties - แสดงเมื่อ isExpanded เป็น true เท่านั้น */}
                        {isExpandedGender && ( // <-- NEW: เงื่อนไขการแสดงผล
                            <>
                                <div className="space-y-3">
                                    {gender.map((spec) => (
                                        <label key={spec.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                                    checked={spec.checked}
                                                    onChange={() => handleCheckboxChange(spec.id)}
                                                />
                                                <span className="ml-3 text-gray-700 text-base">{spec.name}</span>
                                            </div>

                                        </label>
                                    ))}
                                </div>

                            </>
                        )}
                    </div>

                    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 ">
                        {/* Header "Specialities" with dropdown arrow */}
                        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={toggleExpansionAvailability}> {/* <-- NEW: เพิ่ม onClick ตรงนี้ */}
                            <h3 className="text-xl font-bold text-gray-800">ว่างช่วง</h3>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                <ChevronDown />
                            </button>
                        </div>

                        {/* List of Specialties - แสดงเมื่อ isExpanded เป็น true เท่านั้น */}
                        {isExpandedAvailability && ( // <-- NEW: เงื่อนไขการแสดงผล
                            <>
                                <div className="space-y-3">
                                    {initialAvailability.map((spec) => (
                                        <label key={spec.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                                    checked={spec.checked}
                                                    onChange={() => handleCheckboxChange(spec.id)}
                                                />
                                                <span className="ml-3 text-gray-700 text-base">{spec.name}</span>
                                            </div>

                                        </label>
                                    ))}
                                </div>

                            </>
                        )}
                    </div>

                    

                    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 ">
                        {/* Header "Specialities" with dropdown arrow */}
                        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={toggleExpansionExperience}> {/* <-- NEW: เพิ่ม onClick ตรงนี้ */}
                            <h3 className="text-xl font-bold text-gray-800">ความเชี่ยวชาญ</h3>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                <ChevronDown />
                            </button>
                        </div>

                        {/* List of Specialties - แสดงเมื่อ isExpanded เป็น true เท่านั้น */}
                        {isExpandedExperience && ( // <-- NEW: เงื่อนไขการแสดงผล
                            <>
                                <div className="space-y-3">
                                    {initialExperience.map((spec) => (
                                        <label key={spec.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                                    checked={spec.checked}
                                                    onChange={() => handleCheckboxChange(spec.id)}
                                                />
                                                <span className="ml-3 text-gray-700 text-base">{spec.name}</span>
                                            </div>

                                        </label>
                                    ))}
                                </div>

                            </>
                        )}
                    </div>

                    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 ">
                        {/* Header "Specialities" with dropdown arrow */}
                        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={toggleExpansionClinics}> {/* <-- NEW: เพิ่ม onClick ตรงนี้ */}
                            <h3 className="text-xl font-bold text-gray-800">Clinics</h3>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                <ChevronDown />
                            </button>
                        </div>

                        {/* List of Specialties - แสดงเมื่อ isExpanded เป็น true เท่านั้น */}
                        {isExpandedClinics && ( // <-- NEW: เงื่อนไขการแสดงผล
                            <>
                                <div className="space-y-3">
                                    {initialClinics.map((spec) => (
                                        <label key={spec.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                                    checked={spec.checked}
                                                    onChange={() => handleCheckboxChange(spec.id)}
                                                />
                                                <span className="ml-3 text-gray-700 text-base">{spec.name}</span>
                                            </div>

                                        </label>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 ">
                        {/* Header "Specialities" with dropdown arrow */}
                        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={toggleExpansionConsultationType}> {/* <-- NEW: เพิ่ม onClick ตรงนี้ */}
                            <h3 className="text-xl font-bold text-gray-800">ติดต่อ</h3>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                <ChevronDown />
                            </button>
                        </div>
                        {/* List of Specialties - แสดงเมื่อ isExpanded เป็น true เท่านั้น */}
                        {isExpandedConsultationType && ( // <-- NEW: เงื่อนไขการแสดงผล
                            <>
                                <div className="space-y-3">
                                    {initialConsultationType.map((spec) => (
                                        <label key={spec.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                                    checked={spec.checked}
                                                    onChange={() => handleCheckboxChange(spec.id)}
                                                />
                                                <span className="ml-3 text-gray-700 text-base">{spec.name}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 ">
                        {/* Header "Specialities" with dropdown arrow */}
                        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={toggleExpansionLanguages}> {/* <-- NEW: เพิ่ม onClick ตรงนี้ */}
                            <h3 className="text-xl font-bold text-gray-800">ภาษา</h3>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                <ChevronDown />
                            </button>
                        </div>
                        {/* List of Specialties - แสดงเมื่อ isExpanded เป็น true เท่านั้น */}
                        {isExpandedLanguages && ( // <-- NEW: เงื่อนไขการแสดงผล
                            <>
                                <div className="space-y-3">
                                    {initialLanguages.map((spec) => (
                                        <label key={spec.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                                    checked={spec.checked}
                                                    onChange={() => handleCheckboxChange(spec.id)}
                                                />
                                                <span className="ml-3 text-gray-700 text-base">{spec.name}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 ">
                        {/* Header "Specialities" with dropdown arrow */}
                        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={toggleExpansionRatings}> {/* <-- NEW: เพิ่ม onClick ตรงนี้ */}
                            <h3 className="text-xl font-bold text-gray-800">คะแนน</h3>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                                <ChevronDown />
                            </button>
                        </div>
                        {/* List of Specialties - แสดงเมื่อ isExpanded เป็น true เท่านั้น */}
                        {isExpandedRatings && ( // <-- NEW: เงื่อนไขการแสดงผล
                            <>
                                <div className="space-y-3">
                                    {initialRatings.map((spec) => (
                                        <label key={spec.id} className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                                    checked={spec.checked}
                                                    onChange={() => handleCheckboxChange(spec.id)}
                                                />
                                                <span className="ml-3 text-gray-700 text-base">{spec.name}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                </div>

                <div className='w-3/4'>
                    <div className='flex'>
                        <div>
                            <h2>Showing 450 Doctor For Yor</h2>
                        </div>
                        <div className='flex'>
                            <h1>Availability</h1>
                            <input type="checkbox" defaultChecked className="toggle" />

                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 '>
                        <DoctorCardList showButton="true" />
                        <DoctorCardList showButton="true" />
                        <DoctorCardList showButton="true" />
                        <DoctorCardList showButton="true" />
                        <DoctorCardList showButton="true" />
                        <DoctorCardList showButton="true" />
                        <DoctorCardList showButton="true" />
                        <DoctorCardList showButton="true" />
                        <DoctorCardList showButton="true" />

                    </div>
                    <div className="flex justify-center my-8">
                        <Pagination totalItems={totalNewsItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
                    </div>
                </div>



            </div>

        </div>
    )
}

export default DoctorList