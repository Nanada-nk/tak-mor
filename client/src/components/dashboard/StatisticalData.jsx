import React from 'react'

function StatisticalData({ boxOneUp = "0", boxOneDown = "0", boxTwoUp = "0", boxTwoDown = "0", boxTreeUp = "0", boxTreeDown = "0" }) {
    return (
        <div>
            
            <div className="stats shadow w-210 h-30 bg-white mb-6">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title">{boxOneUp}</div>
                    <div className="stat-value text-primary">{boxOneDown}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title">{boxTwoUp}</div>
                    <div className="stat-value text-secondary">{boxTwoDown}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        
                    </div>
                    <div className="stat-title">{boxTreeUp}</div>
                    <div className="stat-value">{boxTreeDown}</div>
                </div>
            </div>
        </div>
    )
}

export default StatisticalData