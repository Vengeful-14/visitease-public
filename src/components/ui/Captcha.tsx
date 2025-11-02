import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
  error?: string;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify, error }) => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const isInitialized = useRef<boolean>(false);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    setAnswer('');
    setIsValid(false);
    onVerify(false);
  };

  // Only generate captcha once on mount
  useEffect(() => {
    if (!isInitialized.current) {
      generateCaptcha();
      isInitialized.current = true;
    }
  }, []);

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    const expectedAnswer = num1 + num2;
    const userAnswer = parseInt(value.trim(), 10);
    
    if (!isNaN(userAnswer) && userAnswer === expectedAnswer) {
      // Only set valid once - don't regenerate after correct answer
      if (!isValid) {
        setIsValid(true);
        onVerify(true);
      }
    } else {
      setIsValid(false);
      onVerify(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Security Verification *
      </label>
      <div className="flex items-center space-x-4 p-4 bg-gray-50 border border-gray-300 rounded-lg">
        <div className="flex items-center space-x-2 flex-1">
          <span className="text-lg font-semibold text-gray-900">
            {num1} + {num2} = ?
          </span>
          <input
            type="number"
            value={answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            disabled={isValid}
            className={`w-20 px-3 py-2 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
              isValid ? 'border-green-300 bg-green-50' : 'border-gray-300'
            } ${isValid ? 'cursor-not-allowed' : ''}`}
            placeholder="?"
            min="0"
          />
        </div>
        <button
          type="button"
          onClick={generateCaptcha}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
          title="Refresh captcha"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {isValid && !error && (
        <p className="mt-1 text-sm text-green-600">✓ Verification complete</p>
      )}
      <p className="mt-1 text-xs text-gray-500">
        Please solve the math problem above to verify you're human
      </p>
    </div>
  );
};

export default Captcha;

