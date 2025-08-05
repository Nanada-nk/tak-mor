import { useState, useEffect } from 'react';
import PasswordStrengthGauge from '../../../components/PasswordStrengthGauge';
import { Eye, EyeOff, KeyRound } from 'lucide-react';
import accountApi from '../../../api/accountApi';

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password strength meter now in PasswordStrengthGauge component

  // Auto-dismiss success after 10 seconds
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(''), 10000);
    return () => clearTimeout(timer);
  }, [success]);

  // Helper to clear success on input
  const clearSuccessOnInput = (setter) => (e) => {
    setSuccess('');
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('รหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }
    if (newPassword.length < 8) {
      setError('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
      return;
    }

    setLoading(true);
    try {
      await accountApi.changePassword({ currentPassword, newPassword });
      setSuccess('เปลี่ยนรหัสผ่านสำเร็จ');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('เปลี่ยนรหัสผ่านไม่สำเร็จ');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-14 bg-gradient-to-br from-blue-50 to-white p-12 rounded-3xl shadow-2xl border border-blue-200/70">
      <div className="flex items-center justify-center gap-2 mb-2">
        <KeyRound className="text-blue-700" size={28} />
        <h2 className="text-2xl font-extrabold text-blue-900">เปลี่ยนรหัสผ่าน</h2>
      </div>
      <p className="text-gray-600 text-center mb-8 text-base">กรุณาเปลี่ยนรหัสผ่านเป็นประจำเพื่อความปลอดภัยของบัญชี</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่านปัจจุบัน</label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              value={currentPassword}
              onChange={clearSuccessOnInput(setCurrentPassword)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
              tabIndex={-1}
              onClick={() => setShowCurrent(v => !v)}
            >
              {showCurrent ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่านใหม่</label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 hover:border-blue-400 pr-10 transition-all"
              value={newPassword}
              onChange={clearSuccessOnInput(setNewPassword)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
              tabIndex={-1}
              onClick={() => setShowNew(v => !v)}
            >
              {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-1">ต้องมีอย่างน้อย 8 ตัวอักษร รวมตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลข</p>
          <PasswordStrengthGauge password={newPassword} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ยืนยันรหัสผ่านใหม่</label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              value={confirmPassword}
              onChange={clearSuccessOnInput(setConfirmPassword)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
              tabIndex={-1}
              onClick={() => setShowConfirm(v => !v)}
            >
              {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2 mb-2 flex items-center gap-2 animate-pulse">
            <span className="flex-1">{error}</span>
            <button type="button" className="text-red-400 hover:text-red-700" onClick={() => setError('')} aria-label="ปิดข้อผิดพลาด">✕</button>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-3 py-2 mb-2 flex items-center gap-2 animate-pulse">
            <span className="flex-1">{success}</span>
            <button type="button" className="text-green-400 hover:text-green-700" onClick={() => setSuccess('')} aria-label="ปิดข้อความสำเร็จ">✕</button>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              กำลังเปลี่ยนรหัสผ่าน...
            </span>
          ) : 'เปลี่ยนรหัสผ่าน'}
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordPage;