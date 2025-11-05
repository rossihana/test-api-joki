
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PromptForm from './PromptForm';
import UserInfoForm from './UserInfoForm';
import OrderReview from './OrderReview';
import PaymentStatus from './PaymentStatus';
import AnswerDisplay from './AnswerDisplay';

const App: React.FC = () => {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [promptText, setPromptText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleProcessTask = (prompt: string, response: string) => {
    setPromptText(prompt);
    setAiResponse(response);
    setIsLoading(false);
    navigate('/answer', { state: { prompt: prompt, aiResponse: response } });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Joki AI
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Asisten Tugas Cerdas Anda</p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-gray-700">
          <Routes>
            <Route path="/" element={<PromptForm onProcessTask={handleProcessTask} isLoading={isLoading} />} />
            <Route path="/data" element={<UserInfoForm />} />
            <Route path="/review" element={<OrderReview />} />
            <Route path="/payment/:transactionId" element={<PaymentStatus />} />
            <Route path="/answer" element={<AnswerDisplay />} /> {/* Modified route for AnswerDisplay */}
          </Routes>
        </main>

        {/* Removed conditional rendering for isLoading and result as they will be managed by individual route components */}
      </div>
      <footer className="text-center text-gray-500 mt-12 text-sm">
        <p>&copy; {new Date().getFullYear()} Joki AI. Dibangun dengan React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;