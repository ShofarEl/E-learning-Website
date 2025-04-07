import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const PasswordCriteria = ({ password }) => {
  const criteria = [
    {
      label: "At least 6 characters",
      met: password.length >= 6
    },
    {
      label: "Contains uppercase letter",
      met: /[A-Z]/.test(password)
    },
    {
      label: "Contains lowercase letter",
      met: /[a-z]/.test(password)
    },
    {
      label: "Contains number",
      met: /[0-9]/.test(password)
    },
    {
      label: "Contains special character",
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item, index) => (
        <div key={index} className={`flex items-center text-sm ${item.met ? 'text-green-500' : 'text-gray-400'}`}>
          {item.met ? (
            <CheckCircle2 className="h-4 w-4 mr-2" />
          ) : (
            <XCircle className="h-4 w-4 mr-2" />
          )}
          {item.label}
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  // Calculate how many criteria are met
  const metCount = [
    password.length >= 6,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  ].filter(Boolean).length;

  // Determine strength level
  const strength = 
    password.length === 0 ? '' :
    metCount <= 2 ? 'Weak' :
    metCount <= 4 ? 'Fair' : 'Strong';

  // Calculate percentage for progress bar
  const percentage = password.length === 0 ? 0 : (metCount / 5) * 100;

  // Color classes for different strength levels
  const strengthColors = {
    'Weak': 'bg-red-500 text-red-500',
    'Fair': 'bg-yellow-500 text-yellow-500',
    'Strong': 'bg-green-500 text-green-500',
    '': 'bg-gray-200 text-gray-400'
  };

  return (
    <div className="mt-3 pb-4">
      {/* Strength indicator bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
        <div 
          className={`h-1.5 rounded-full transition-all duration-300 ${strengthColors[strength].split(' ')[0]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Strength label */}
      <div className="flex items-center text-sm justify-self-center">
        <span className={`font-medium  ${strengthColors[strength].split(' ')[1]}`}>
          {strength || 'Not set'}
        </span>
      </div>

      {/* Password criteria checklist */}
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;