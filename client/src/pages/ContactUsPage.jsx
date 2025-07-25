function ContactUsPage() {
  return (
    <div>
      <div>
        <p>ติดต่อเรา</p>
        <p>มีคำถามใด ๆ ไหม?</p>
      </div>
      <fieldset className="fieldset bg-[#F6FAFF] border-base-300 rounded-box w-xs border p-4">
        <label className="label">Title</label>
        <input type="text" className="input" placeholder="My awesome page" />

        <label className="label">Slug</label>
        <input type="text" className="input" placeholder="my-awesome-page" />

        <label className="label">Author</label>
        <input type="text" className="input" placeholder="Name" />

        <button className="btn bg-[#0E82FD] text-white w-25 rounded-full">
          ส่ง
        </button>
      </fieldset>
    </div>
  );
}
export default ContactUsPage;
