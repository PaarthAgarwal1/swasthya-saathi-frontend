import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTextToSpeech from "../../components/TextToSpeech";

export default function Diagnosis() {
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);
  const navigate = useNavigate();

  const [diagnosis, setDiagnosis] = useState(
    t("diagnosis_page.diagnosis_message")
  );

  useEffect(() => {
    speakText(`${t("diagnosis_page.main_heading")}. ${diagnosis}`);
  }, [diagnosis, speakText, t]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 text-center">
      <header className="bg-gray-800 text-white py-6 shadow-md">
        <h1
          className="text-3xl font-extrabold"
          onMouseEnter={() => speakText(t("diagnosis_page.header_title"))}
        >
          {t("diagnosis_page.header_title")}
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-xl w-full">
          <h2
            className="text-3xl font-bold text-gray-800 mb-6"
            onMouseEnter={() => speakText(t("diagnosis_page.main_heading"))}
          >
            {t("diagnosis_page.main_heading")}
          </h2>
          <p
            className="text-lg text-gray-600 mb-8 leading-relaxed"
            onMouseEnter={() => speakText(diagnosis)}
          >
            {diagnosis}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/doctor-consultation")}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105"
              onMouseEnter={() =>
                speakText(t("diagnosis_page.consult_doctor_button"))
              }
            >
              {t("diagnosis_page.consult_doctor_button")}
            </button>
            <button
              onClick={() => navigate("/feedback")}
              className="py-3 px-6 border-2 border-gray-400 text-gray-800 font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:border-gray-600"
              onMouseEnter={() => speakText(t("diagnosis_page.thank_you_button"))}
            >
              {t("diagnosis_page.thank_you_button")}
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 w-full text-center shadow-inner">
        <p
          className="text-sm"
          onMouseEnter={() => speakText(t("diagnosis_page.footer_text"))}
        >
          {t("diagnosis_page.footer_text")}
        </p>
      </footer>
    </div>
  );
}
