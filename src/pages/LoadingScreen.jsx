import React from "react";

export default function LoadingScreen() {
  
  return (

    <div className="h-screen bg-[#121212] flex flex-col justify-center items-center text-white">
    
      <div className="flex gap-1 mb-3">
        {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
          <span   
            key={i}
            className="w-[5px] bg-[#1db954] animate-pulse"
            style={{
              animation: `equalize 1s ${delay}s infinite ease-in-out`,
            }}
          ></span>
        ))}
      </div>

     
      <p className="text-lg">Loading...</p>

      <style>
        {`
          @keyframes equalize {
            0%, 100% { height: 10px; }
            50% { height: 40px; }
          }
        `}
      </style>
    </div>
  );
}
