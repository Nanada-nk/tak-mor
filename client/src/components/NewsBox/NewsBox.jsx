import { Calendar } from "lucide-react";

function NewsBox() {
    return (
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-full transition-transform duration-200 hover:scale-[1.02]">
      
            <div className="relative">
                <div className='m-3 h-48 overflow-hidden rounded-md'> 
                    <img
                        src="https://placehold.co/600x400/E0F2F7/0E82FD?text=News+Image" 
                        alt="News Thumbnail"
                        className="w-full h-full object-cover" 
                    />
                </div>
                <span className="absolute top-6 left-6 bg-[#3B80F5] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"> 
                    Wellness
                </span>
            </div>

            
            <div className="p-4 sm:p-6 flex flex-col"> 
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 text-gray-600 text-sm"> 
                    <div className="flex items-center mb-2 sm:mb-0"> 
                        <img
                            src="https://placehold.co/32x32/E2EDFF/0E82FD?text=GJ" 
                            alt="Gregory Johnson"
                            className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
                        <span className="text-sm">Gregory Johnson</span> 
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-500" /> 
                        <span className="text-sm">15 Jun 2024</span> 
                    </div>
                </div>

                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    Mental Health Matters: Tips for Managing Stress and Anxiety
                </h3>

               
                <p className="text-gray-700 text-sm sm:text-base line-clamp-3">
                    Learn practical techniques to manage stress and anxiety, and improve your emotional well-being.
                </p>
            </div>
        </div>
    )
}

export default NewsBox
