import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import type { ToastProps } from '../../types/toast';

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Show toast with animation
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-hide toast
    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => onClose(id), 300);
  };

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 text-green-800',
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: <XCircle className="w-5 h-5 text-red-500" />,
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: <AlertCircle className="w-5 h-5 text-blue-500" />,
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-200 text-gray-800',
          icon: <AlertCircle className="w-5 h-5 text-gray-500" />,
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`
        max-w-sm w-full
        border rounded-lg shadow-lg p-4
        transform transition-all duration-300 ease-in-out
        ${styles.container}
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium">{title}</h4>
          {message && (
            <p className="mt-1 text-sm opacity-90">{message}</p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;

