import { useState, useEffect } from 'react';

const getVoiceForLanguage = (voices, language) => {
    console.log(language);
    console.log(window.speechSynthesis.getVoices());
  const matchedVoice = voices.find(
    (voice) => voice.lang.startsWith(language) && voice.name.toLowerCase().includes('female')
  );
  return matchedVoice || voices.find((voice) => voice.lang.startsWith(language)) || voices[0];
};

const useTextToSpeech = (language) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
          const voiceForLanguage = getVoiceForLanguage(availableVoices, language);
          setSelectedVoice(voiceForLanguage);
        } else {
          setVoices([]);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices; // Re-load voices when the list changes
    }
  }, [language]);

  const speakText = (text) => {
    if ('speechSynthesis' in window && selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.lang = language;
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-Speech is not supported in your browser.');
    }
  };

  return speakText;
};

export default useTextToSpeech;
