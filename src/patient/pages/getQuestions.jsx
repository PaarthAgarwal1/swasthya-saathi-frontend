import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTextToSpeech from "../../components/TextToSpeech";

const getQuestionsFromGemini = async () => {
  return [
    "How long have you been experiencing symptoms?",
    "Do you have a fever? If yes, what's your temperature?",
    "Are you experiencing any pain? If yes, where?",
    "Have you been in contact with anyone who's been sick recently?",
  ];
};

const sendAnswersToGemini = async (answers) => {
  console.log("Sending answers to Gemini API:", answers);
  return Math.random() < 0.5;
};

export default function DiagnosticQuestions() {
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestionsFromGemini();
      setQuestions(fetchedQuestions);
      setAnswers(new Array(fetchedQuestions.length).fill(""));
      setIsLoading(false);
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const needMoreQuestions = await sendAnswersToGemini(answers);
  
    if (needMoreQuestions) {
      const newQuestions = await getQuestionsFromGemini();
      setQuestions(newQuestions);
      setAnswers(new Array(newQuestions.length).fill(""));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      navigate('/ai-diagnosis');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 flex items-center justify-center">
        <p className="text-2xl font-semibold text-white animate-pulse">
          {t('loading_message', { defaultValue: "Loading questions..." })}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 text-center">
      <header className="bg-gray-800 text-white py-4">
        <h1
          className="text-2xl font-bold"
          onMouseEnter={() => speakText(t('diagnostic_questions_page.header_title'))}
        >
          {t('diagnostic_questions_page.header_title')}
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
          <h2 
          onMouseEnter={() => speakText(t('diagnostic_questions_page.main_heading'))}
          className="text-2xl font-semibold text-gray-800 mb-6">
            {t('diagnostic_questions_page.main_heading')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="space-y-1">
                <label
                  htmlFor={`question-${index}`}
                  className="text-lg font-medium text-gray-700"
                  onMouseEnter={() => speakText(question)}
                >
                  {question}
                </label>
                <input
                  id={`question-${index}`}
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition"
              onMouseEnter={() => speakText(t('diagnostic_questions_page.submit_button'))}
            >
              {t('diagnostic_questions_page.submit_button')}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-3 w-full text-center">
        <p onMouseEnter={() => speakText(t('diagnostic_questions_page.footer_text'))}
        className="text-sm">{t('diagnostic_questions_page.footer_text')}</p>
      </footer>
    </div>
  );
}
