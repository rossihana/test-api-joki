import React from 'react';
import { useLocation } from 'react-router-dom';

const AnswerDisplay: React.FC = () => {
  const location = useLocation();
  const { prompt, aiResponse } = location.state || { prompt: 'No prompt provided', aiResponse: 'No AI response' };

  return (
    <div className="text-white p-4 rounded-lg shadow-md bg-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-purple-300">AI Response</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-cyan-300">Your Prompt:</h3>
        <p className="text-gray-200 whitespace-pre-wrap">{prompt}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-cyan-300">AI's Answer:</h3>
        <p className="text-gray-200 whitespace-pre-wrap">{aiResponse}</p>
      </div>
    </div>
  );
};

export default AnswerDisplay;
