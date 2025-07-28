function NewsBox() {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-110">
            {/* Image and Tag Section */}
            <div className="relative">
                <div className='m-3'>
                <img
                    src=""
                    className="w-full h-48 object-cover "
                />

                </div>
                <span className="absolute top-4 left-7 bg-[#3B80F5] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Wellness
                </span>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Author and Date Section */}
                <div className="flex items-center justify-between mb-4 text-gray-600 text-sm">
                    <div className="flex items-center">
                        <img
                            src=""
                            alt="Gregory Johnson"
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <span>Gregory Johnson</span>
                    </div>
                    <div className="flex items-center">
                        {/* Calendar Icon - Using a simple SVG or font icon would be ideal here */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>15 Jun 2024</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Mental Health Matters: Tips for Managing Stress and Anxiety
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-base">
                    earn practical techniques to manage stress and anxiety, and improve your emotional well-being.
                </p>
            </div>
        </div>

    )
}

export default NewsBox