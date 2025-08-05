function PatientReview({ id, imageSrc, name, location, review }) {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 text-center lg:text-left py-8">
      <div className="avatar flex-shrink-0">
        <div className="w-48 h-48 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full border-none overflow-hidden">
          <img
            src={imageSrc}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="p-4 flex flex-col items-center lg:items-start w-full lg:w-2/3 max-w-xl">
        <div className="flex items-center gap-2 mb-4 text-gray-600 text-sm"></div>{" "}
        {/* ส่วนนี้ว่างเปล่าอยู่แล้ว */}
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          รีวิวจากคนไข้ของเรา
        </h3>
        <p className="text-base sm:text-lg mt-2 text-gray-700 leading-relaxed">
         {review}
        </p>
        <div className="mt-6 text-center lg:text-left">
          <p className="font-bold text-base">{name}</p>
          <p className="text-sm mt-1 text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
}
export default PatientReview;
