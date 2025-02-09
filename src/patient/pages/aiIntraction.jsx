import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useTranslation } from "react-i18next";
import useTextToSpeech from "../../components/TextToSpeech";

export default function AIInteraction() {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);

  const handleSend = async () => {
    console.log("Sending to Gemini API:", input);
    navigate("/diagnostic-questions");
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    speakText(t("ai_interaction_page.microphone_toggle"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-indigo-200 text-center">
      <header className="bg-gray-800 text-white py-6">
        <h1
          className="text-4xl font-extrabold tracking-wide"
          onMouseEnter={() => speakText(t("ai_interaction_page.title"))}
        >
          {t("ai_interaction_page.title")}
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl transform transition-transform hover:scale-105">
          <h2
            className="text-2xl font-semibold text-blue-800 mb-6"
            onMouseEnter={() => speakText(t("ai_interaction_page.prompt"))}
          >
            {t("ai_interaction_page.prompt")}
          </h2>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("ai_interaction_page.placeholder")}
            className="w-full text-lg p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
          />
          <div className="flex justify-between items-center">
            <button
              onClick={toggleListening}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all ${
                isListening ? "bg-red-500" : "bg-gray-300"
              } hover:shadow-lg`}
            >
              <FaMicrophone className="w-7 h-7 text-white" />
            </button>
            <button
              onClick={handleSend}
              className="flex items-center justify-center w-32 h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
              onMouseEnter={() => speakText(t("ai_interaction_page.send_button"))}
            >
              <IoMdSend className="w-6 h-6 mr-2" />
              {t("ai_interaction_page.send_button")}
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <p
          className="text-sm"
          onMouseEnter={() => speakText(t("ai_interaction_page.footer_text"))}
        >
          {t("ai_interaction_page.footer_text")}
        </p>
      </footer>
    </div>
  );
}
