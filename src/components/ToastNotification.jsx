import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import "./styleSheets/toast.css"; // Import CSS file

const ToastNotification = ({
  message = "Success Notification!",
  duration = 5000,
  bgColor = "bg-green-500",
  icon: Icon = CheckCircle, // Change "Icon" to "icon" for correct prop handling
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 flex items-center z-50 max-w-sm bg-white shadow-lg rounded-md overflow-hidden">
      <div className={`w-1 ${bgColor} h-full absolute left-0`}></div>
      <div className="flex items-center p-4 pr-8">
        <Icon className="text-green-500 mr-3" size={40} />
        <p className="text-sm text-gray-700">{message}</p>
      </div>
      <div className="h-1 bg-gray-100 absolute bottom-0 left-0 right-0">
        <div
          className={`h-full ${bgColor}`}
          style={{
            width: "100%",
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
};

export default ToastNotification;
