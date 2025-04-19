import { useState, useEffect } from "react";


const Toast = ({ message, type = "info" }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      
    }, 7000); // Auto-hide after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  // Define colors for different message types
  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

    //another way to Define background color based on type
    const bgColor =
    type === "success" ? "bg-green-500" :
    type === "error" ? "bg-red-500" :
    type === "warning" ? "bg-yellow-500" :
    "bg-gray-800"; // Default to info

  return (
    <div
      className={`fixed top-24  px-6 py-4 w-3/4 max-w-md text-center text-xl text-white rounded shadow-lg transition-all duration-300 transform ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      } ${typeStyles[type] }`}
    >
      {message}
    </div>
  );
};

export default Toast;
