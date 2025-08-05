import nodemailer from "nodemailer";

const emailService = {}
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


emailService.sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"ทักหมอ (TakMor)" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `รหัสยืนยันสำหรับเปลี่ยนรหัสผ่านบนเว็บ ทักหมอ`,
    html: `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; line-height: 1.6; color: #7F8C8D; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="padding: 20px; text-align: center;">
          <h2 style="color: #34495E; margin-bottom: 20px;">รหัสยืนยันตัวตนของคุณ</h2>
          <p>กรุณาใช้รหัสยืนยันด้านล่างนี้เพื่อดำเนินการตั้งรหัสผ่านใหม่ให้เสร็จสิ้น</p>
          <p>รหัสนี้มีอายุการใช้งาน 5 นาที</p>
          <div style="background-color: #EAF8FA; border-radius: 5px; padding: 10px 20px; margin: 20px 0; display: inline-block;">
            <p style="font-size: 24px; font-weight: bold; color: #34495E; letter-spacing: 5px; margin: 0;">${otp}</p>
          </div>
          <p style="font-size: 14px; color: #7F8C8D;">หากคุณไม่ได้เป็นผู้ร้องขอเปลี่ยนรหัสผ่าน กรุณาเพิกเฉยอีเมลฉบับนี้</p>
        </div>
        <div style="background-color: #f7f7f7; padding: 20px; text-align: left;">
          <p style="margin: 0; font-size: 14px;">ขอแสดงความนับถือ,<br>ทีมงาน ทักหมอ</p>
          <img 
            src="https://res.cloudinary.com/dhoyopcr7/image/upload/v1753282411/takmor_2_vkivfo.png" 
            alt="TakMor Logo" 
            style="width: 120px; height: auto; margin-top: 15px;"
          >
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email.");
  }
}






export default emailService