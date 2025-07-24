function PolicyModal({ isOpen, onClose, title, children }) {
 
  if (!isOpen) return null;

  return (
    
    <dialog className="modal modal-open modal-bottom sm:modal-middle">
      <div className="modal-box w-11/12 max-w-3xl">
        
        <h3 className="font-bold text-xl text-gray-800">{title}</h3>
        
       
        <div className="py-4 mt-4 border-t border-b border-gray-200 max-h-[60vh] overflow-y-auto">
          {children}
        </div>

       
        <div className="modal-action mt-4">
          <button onClick={onClose} className="btn">ปิด</button>
        </div>
      </div>
     
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

export default PolicyModal;