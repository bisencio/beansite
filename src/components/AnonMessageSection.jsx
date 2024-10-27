import React from 'react';

const AnonMessages = () => {
  const messages = [
    {
      id: 1,
      text: "Keep up the great work on your EE projects!",
      timestamp: "2 hours ago"
    }
  ];

  return (
    <div className="w-full">
      {messages.map(message => (
        <div 
          key={message.id}
          className="bg-[#001624] border border-[#00ff9d] rounded p-3 mb-2 text-[#00ff9d] shadow-lg"
        >
          <div className="text-sm mb-1">{message.text}</div>
          <div className="text-xs opacity-60 text-right">{message.timestamp}</div>
        </div>
      ))}
    </div>
  );
};

export default AnonMessages;