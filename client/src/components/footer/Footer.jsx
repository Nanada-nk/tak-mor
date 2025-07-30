import { Link } from "react-router";
import { useNavigate } from "react-router";

function Footer() {
    const navigate = useNavigate();
    return (
        <div className='font-prompt'>
        
            <footer className="footer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-6 lg:gap-10 text-base-content px-4 sm:px-6 lg:px-8 bg-[#EEF7FB] pt-8 pb-10">

           
                <nav className="flex flex-col items-start gap-4">
                    <div>
                        <img src="../../../public/takmor.svg" alt='logo' className="h-12 w-auto object-contain" /> 
                    </div>
          
                    <div className='w-full max-w-xs text-sm text-gray-700 leading-relaxed'>
                        นัดหมายแพทย์ได้อย่างง่ายดายด้วย ทักหมอ เชื่อมต่อกับผู้เชี่ยวชาญด้านสุขภาพ จัดการนัดหมาย และให้ความสำคัญกับสุขภาพของคุณ
                    </div>
                </nav>

      
                <nav className="flex flex-col items-start gap-2">
                    <h6 className="font-bold text-base text-black py-3">ทักหมอ</h6>
                    <Link to="/" className="py-1 text-black hover:text-blue-600 cursor-pointer text-sm">หน้าแรก</Link>
                    <Link to="/doctorlist" className="py-1 text-black hover:text-blue-600 cursor-pointer text-sm">แพทย์</Link>
                    <Link to="/video" className="py-1 text-black hover:text-blue-600 cursor-pointer text-sm">การปรึกษาทางวิดีโอ</Link>
                </nav>

                <nav className="flex flex-col items-start gap-2">
                    <h6 className="font-bold text-base text-black py-3">แผนก</h6>
                    <Link to="/categoryspecialties" className="py-1 text-black hover:text-blue-600 cursor-pointer text-sm">ระบบประสาทและสมอง</Link>
                    <Link to="/categoryspecialties" className="py-1 text-black hover:text-blue-600 cursor-pointer text-sm">หัวใจและหลอดเลือด</Link>
                    <Link to="/categoryspecialties" className="py-1 text-black hover:text-blue-600 cursor-pointer text-sm">ทันตกรรม</Link>
                </nav>

                {/* ติดต่อเรา Section */}
                <nav className="flex flex-col items-start gap-2">
                    <h6 className="font-bold text-base text-black py-3">ติดต่อเรา</h6>
                    <div className='flex items-start gap-2'> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 flex-shrink-0 mt-1"> 
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                    
                        <a href="https://maps.app.goo.gl/YourLocationLink" target="_blank" rel="noopener noreferrer" className="py-1 text-black w-auto break-words hover:text-blue-600 cursor-pointer text-sm">
                            35 อาคารวรรณสรณ์ แขวงพญาไท เขตราชเทวี กทม. 10400
                        </a>
                    </div>
                    <div className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        {/* เพิ่ม tel: link */}
                        <a href="tel:08xxxxxxxx" className="py-1 text-black hover:text-blue-600 cursor-pointer text-sm">08-xxxx-xxxx</a>
                    </div>
                    <div className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        {/* เพิ่ม mailto: link */}
                        <a href="mailto:takmor.online@gmail.com" className="py-1 text-black hover:text-blue-600 cursor-pointer text-sm">takmor.online@gmail.com</a>
                    </div>
                </nav>

      
                <form className="w-full sm:max-w-xs lg:max-w-none">
                    <h6 className="font-bold text-base text-black py-4">สมัครรับข่าวสารกับเรา</h6>
                    <fieldset className="w-full">
                        <div className="join w-full mb-3">
                            <input
                                type="text"
                                placeholder="กรอก อีเมล" 
                                className="input input-bordered join-item flex-grow" /> 
                            <button type="submit" className="btn btn-primary join-item bg-[#3B80F5]">ยืนยัน</button>
                        </div>
                   
                        <div className='flex gap-4 justify-start mt-4'> 
               
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors">
                                    <path d="M12 2.53906C17.5229 2.53906 22 7.01621 22 12.5391C22 17.5304 18.3431 21.6674 13.5625 22.4176V15.4297H15.8926L16.3359 12.5391L13.5625 12.5387V10.6632C13.5625 10.657 13.5625 10.6509 13.5626 10.6447C13.5626 10.6354 13.5628 10.6262 13.5629 10.6169C13.578 9.84259 13.9742 9.10156 15.1921 9.10156H16.4531V6.64062C16.4531 6.64062 15.3087 6.44492 14.2146 6.44492C11.966 6.44492 10.4842 7.78652 10.4386 10.2193C10.4379 10.2578 10.4375 10.2965 10.4375 10.3355V12.5387H7.89844V15.4293L10.4375 15.4297V22.4172C5.65686 21.667 2 17.5304 2 12.5391C2 7.01621 6.47715 2.53906 12 2.53906Z" fill="currentColor" />
                                </svg>
                            </a>
                          
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors">
                                    <path d="M17.7512 2.96094H20.818L14.1179 10.6187L22 21.0391H15.8284L10.9946 14.7191L5.4636 21.0391H2.39492L9.56132 12.8483L2 2.96094H8.32824L12.6976 8.73762L17.7512 2.96094ZM16.6748 19.2035H18.3742L7.40492 4.70014H5.58132L16.6748 19.2035Z" fill="currentColor" />
                                </svg>
                            </a>

                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors">
                                    <path d="M8.6672 12C8.6672 10.1591 10.1591 8.6664 12 8.6664C13.8409 8.6664 15.3336 10.1591 15.3336 12C15.3336 13.8409 13.8409 15.3336 12 15.3336C10.1591 15.3336 8.6672 13.8409 8.6672 12ZM6.86512 12C6.86512 14.836 9.164 17.1349 12 17.1349C14.836 17.1349 17.1349 14.836 17.1349 12C17.1349 9.164 14.836 6.86512 12 6.86512C9.164 6.86512 6.86512 9.164 6.86512 12ZM16.1382 6.66152C16.1381 6.89886 16.2084 7.13089 16.3401 7.32829C16.4719 7.52568 16.6593 7.67956 16.8785 7.77047C17.0977 7.86138 17.339 7.88525 17.5718 7.83904C17.8046 7.79283 18.0185 7.67862 18.1863 7.51087C18.3542 7.34311 18.4686 7.12934 18.515 6.89658C18.5614 6.66382 18.5377 6.42253 18.447 6.20322C18.3563 5.98392 18.2025 5.79644 18.0052 5.6645C17.808 5.53257 17.576 5.4621 17.3386 5.462H17.3382C17.02 5.46215 16.715 5.58856 16.49 5.81347C16.265 6.03837 16.1384 6.34339 16.1382 6.66152ZM7.96 20.1398C6.98504 20.0954 6.45512 19.933 6.10296 19.7958C5.63608 19.614 5.30296 19.3975 4.95272 19.0478C4.60248 18.698 4.38568 18.3652 4.20472 17.8983C4.06744 17.5463 3.90504 17.0162 3.86072 16.0413C3.81224 14.9872 3.80256 14.6706 3.80256 12.0001C3.80256 9.3296 3.81304 9.01384 3.86072 7.95888C3.90512 6.98392 4.06872 6.45488 4.20472 6.10184C4.38648 5.63496 4.60296 5.30184 4.95272 4.9516C5.30248 4.60136 5.63528 4.38456 6.10296 4.2036C6.45496 4.06632 6.98504 3.90392 7.96 3.8596C9.01408 3.81112 9.33072 3.80144 12 3.80144C14.6693 3.80144 14.9862 3.81192 16.0412 3.8596C17.0162 3.904 17.5452 4.0676 17.8982 4.2036C18.3651 4.38456 18.6982 4.60184 19.0485 4.9516C19.3987 5.30136 19.6147 5.63496 19.7965 6.10184C19.9338 6.45384 20.0962 6.98392 20.1405 7.95888C20.189 9.01384 20.1986 9.3296 20.1986 12.0001C20.1986 14.6706 20.189 14.9863 20.1405 16.0413C20.0961 17.0162 19.9329 17.5462 19.7965 17.8983C19.6147 18.3652 19.3982 18.6983 19.0485 19.0478C18.6987 19.3972 18.3651 19.614 17.8982 19.7958C17.5462 19.933 17.0162 20.0954 16.0412 20.1398C14.9871 20.1882 14.6705 20.1979 12 20.1979C9.32952 20.1979 9.01376 20.1882 7.96 20.1398ZM7.8772 2.06056C6.81264 2.10904 6.0852 2.27784 5.44992 2.52504C4.792 2.78032 4.23504 3.1228 3.67848 3.67848C3.12192 4.23416 2.78032 4.792 2.52504 5.44992C2.27784 6.0856 2.10904 6.81264 2.06056 7.8772C2.01128 8.94344 2 9.28432 2 12C2 14.7157 2.01128 15.0566 2.06056 16.1228C2.10904 17.1874 2.27784 17.9144 2.52504 18.5501C2.78032 19.2076 3.122 19.7661 3.67848 20.3215C4.23496 20.877 4.792 21.219 5.44992 21.475C6.0864 21.7222 6.81264 21.891 7.8772 21.9394C8.944 21.9879 9.28432 22 12 22C14.7157 22 15.0566 21.9887 16.1228 21.9394C17.1874 21.891 17.9144 21.7222 18.5501 21.475C19.2076 21.219 19.765 20.8772 20.3215 20.3215C20.8781 19.7658 21.219 19.2076 21.475 18.5501C21.7222 17.9144 21.8918 17.1874 21.9394 16.1228C21.9879 15.0558 21.9992 14.7157 21.9992 12C21.9992 9.28432 21.9879 8.94344 21.9394 7.8772C21.891 6.81256 21.7222 6.0852 21.475 5.44992C21.219 4.7924 20.8772 4.23504 20.3215 3.67848C19.7658 3.12192 19.2076 2.78032 18.5509 2.52504C17.9144 2.27784 17.1874 2.10824 16.1236 2.06056C15.0574 2.01208 14.7165 2 12.0008 2C9.28512 2 8.944 2.01128 7.8772 2.06056Z" fill="#323544" />
                                </svg>
                            </a>
                        </div>
                    </fieldset>
                </form>
            </footer>
         
            <footer className="bg-[#D9E6F7] px-4 sm:px-6 lg:px-8 py-3"> 
                <div className='flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4'> 
                    <aside className="text-xs sm:text-sm text-gray-700"> 
                        <p>Copyright © {new Date().getFullYear()} - Tak-mor, All Rights Reserved</p> 
                    </aside>
                    
                    <aside>
                        <div className='flex gap-2 text-xs sm:text-sm text-gray-700'>
                            <Link to="/privacyPolicy" className='hover:text-blue-600 cursor-pointer'>นโยบายความเป็นส่วนตัว</Link> 
                            <p> | </p>
                            <Link to="/termsOfService" className='hover:text-blue-600 cursor-pointer'>ข้อกำหนดและเงื่อนไข</Link> 
                        </div>
                    </aside>
                    <aside>
                        <div className='flex gap-2'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className='w-10 h-4 object-contain' />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="w-11 h-5 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png" alt="PromptPay" className="w-11 h-5 object-contain" />
                            <img src="https://www.leceipt.com/wp-content/uploads/2022/05/paypal-logo.png" alt="Paypal" className="w-8 h-5 object-contain" />
                        </div>
                    </aside>
                </div>
            </footer>
        </div>
    )
}

export default Footer;