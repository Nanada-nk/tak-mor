import React from 'react';

function getStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const strengthLabels = [
  '',
  'ความปลอดภัยต่ำมาก',    // Very Weak
  'ความปลอดภัยต่ำ',        // Weak
  'ปานกลาง',              // Medium
  'ปลอดภัย',              // Strong
  'ปลอดภัยสูง',           // Very Strong
];

export default function PasswordStrengthGauge({ password }) {
  const strength = getStrength(password);
  const strengthLabel = strengthLabels[strength];
  if (!password) return null;
  return (
    <div className="mt-2 ml-1 flex items-center gap-2">
      <div className={`h-2 w-32 rounded-full transition-all duration-200 ${strength <= 2 ? 'bg-red-300' : strength === 3 ? 'bg-yellow-300' : strength === 4 ? 'bg-green-400' : 'bg-green-600'}`}></div>
      <span className={`text-xs font-semibold ${strength <= 2 ? 'text-red-500' : strength === 3 ? 'text-yellow-600' : 'text-green-700'}`}>{strengthLabel}</span>
    </div>
  );
}
