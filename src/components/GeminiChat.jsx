import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const TextToSpeech = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
};

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      handleUserMessage(transcript);
    }
  }, [transcript]);

  const handleUserMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);

    // Replace this with Gemini API endpoint and request logic
    const geminiResponse = await fetchGeminiResponse(userMessage);

    setMessages((prev) => [...prev, { sender: "gemini", text: geminiResponse }]);
    TextToSpeech(geminiResponse);
  };

  const fetchGeminiResponse = async (message) => {
    try {
      const response = await fetch("https://api.gemini.example.com/health-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer AIzaSyC9H6KqUt9vOwdzGlEpRZumfk01dBEwzw4",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      return data.reply || "Sorry, I didn't understand that.";
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      return "There was an error connecting to Gemini.";
    }
  };

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: false, language: "en-US" });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Health Chat with Gemini</h1>

      <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-lg mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md ${
              msg.sender === "user" ? "bg-blue-200 text-left" : "bg-green-200 text-right"
            }`}
          >
            <strong>{msg.sender === "user" ? "You: " : "Gemini: "}</strong>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        {!isListening ? (
          <button
            onClick={startListening}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Start Speaking
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
          >
            Stop Listening
          </button>
        )}
      </div>
    </div>
  );
};

export default GeminiChat;
