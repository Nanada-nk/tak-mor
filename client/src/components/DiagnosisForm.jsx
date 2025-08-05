import React, { useState } from "react";

const DiagnosisForm = ({ patient, doctor, existingRecord, onSave, name, phone, email, doctorname, doctoremail, doctorphone }) => {
  const [diagnosis, setDiagnosis] = useState(existingRecord?.diagnosis || "");
  const [medications, setMedications] = useState(existingRecord?.medications || "");
  const [notes, setNotes] = useState(existingRecord?.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      diagnosis,
      medications,
      notes,
    };
    onSave(updatedData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Doctor Diagnosis Form</h2>

      {/* Patient Info */}
      <section className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Patient Information</h3>
        <div className="text-gray-800">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Gender:</strong> {patient?.gender || 'N/A'}</p>
          <p><strong>Phone:</strong> {phone} </p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      </section>

      {/* Doctor Info */}
      <section className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Doctor Information</h3>
        <div className="text-gray-800">
          <p><strong>Name:</strong> {doctorname}</p>
        </div>
      </section>

      {/* Diagnosis Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 min-h-[100px]"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="e.g. Acute upper respiratory infection..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prescribed Medications</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 min-h-[80px]"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="e.g. Paracetamol 500mg - take 1 tablet every 6 hours..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes / Follow-up</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 min-h-[80px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any instructions or schedule for next appointment..."
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Diagnosis
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiagnosisForm;
