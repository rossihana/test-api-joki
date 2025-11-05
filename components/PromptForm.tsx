
import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PromptFormProps {
  onProcessTask: (prompt: string, aiResponse: string) => void; // Modified to accept aiResponse
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void; // Add setIsLoading to props
}

const PromptForm: React.FC<PromptFormProps> = ({ onProcessTask, isLoading, setIsLoading }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      setElapsedTime(0); // Reset timer when loading starts
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setElapsedTime(0); // Reset timer when loading stops
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (prompt.trim()) {
      setIsLoading(true); // Set loading to true when task processing starts
      try {
        // Assuming your backend is running on http://localhost:8000
        const response = await fetch('http://localhost:8000/api/ai/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to get AI response');
        }

        const data = await response.json();
        onProcessTask(prompt, data.answer); // Pass both prompt and AI response
      } catch (error: any) {
        alert(`Error processing task: ${error.message}`);
        console.error('Error processing task:', error);
      } finally {
        setIsLoading(false); // Set loading to false when task processing ends
      }

    } else {
      alert('Harap isi prompt tugas Anda.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          role="textbox"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Masukkan Prompt Tugas Anda di sini..."
          className="w-full h-36 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none text-gray-200 placeholder-gray-500"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        role="button"
        className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-purple-600/20 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Memproses... ({elapsedTime}s)
          </>
        ) : (
          <>
            <i className="fas fa-bolt mr-2"></i>
            Proses Tugas
          </>
        )}
      </button>
    </form>
  );
};

export default PromptForm;