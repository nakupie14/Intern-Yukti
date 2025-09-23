import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SecurityNotice = ({ attempts = 0, isLocked = false, lockoutTime = null }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || (attempts === 0 && !isLocked)) {
    return null;
  }

  const formatLockoutTime = (time) => {
    if (!time) return '';
    const minutes = Math.ceil((time - Date.now()) / (1000 * 60));
    return minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : 'a few seconds';
  };

  return (
    <div className="mb-6">
      {isLocked ? (
        <div className="p-4 bg-error/10 border border-error/20 rounded-md animate-slide-down">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-error mb-1">
                Account Temporarily Locked
              </h3>
              <p className="text-sm text-error/80">
                Too many failed login attempts. Please try again in {formatLockoutTime(lockoutTime)}.
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-error/60 hover:text-error transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      ) : attempts > 2 ? (
        <div className="p-4 bg-warning/10 border border-warning/20 rounded-md animate-slide-down">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-warning mb-1">
                Security Warning
              </h3>
              <p className="text-sm text-warning/80">
                {attempts} failed login attempts. Your account will be temporarily locked after 5 failed attempts.
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-warning/60 hover:text-warning transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SecurityNotice;