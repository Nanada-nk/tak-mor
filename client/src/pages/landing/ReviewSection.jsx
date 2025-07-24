function ReviewSection() {
  return (
     <div
      className="relative flex flex-col items-center gap-3 w-full h-95 pt-8 pb-2 overflow-hidden"
      style={{
        backgroundImage: "url('public/BgGraphics.svg')",
        backgroundColor: "#EEF7FB",
        backgroundRepeat: "no-repeat",
        backgroundSize: "300px",
        backgroundPosition: "top left",
      }}
    >
      <img
        src="/BgGraphics.svg"
        alt="decor mirror"
        className="absolute bottom-0 right-0 w-[400px] transform scale-x-[-1]"
      />
    </div>
  )
}
export default ReviewSection