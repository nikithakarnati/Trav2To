// components/AIAssistant.jsx
import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const AIAssistant = ({ visible, onHide }) => {
  const [aiResponse, setAiResponse] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && !listening) {
      handleAI(transcript);
    }
  }, [listening]);

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const handleAI = (input) => {
    let reply = "Sorry, I didn't understand that.";

    // Simple bot logic — you can improve or connect to GPT API later
    if (input.toLowerCase().includes("hello")) {
      reply = "Hello! How can I help you today?";
    } else if (input.toLowerCase().includes("weather")) {
      reply = "I can't fetch live weather yet, but it's usually sunny!";
    } else if (input.toLowerCase().includes("how are you")) {
      reply = "I'm doing great, thank you!";
    } else if (input.toLowerCase().includes("currency")) {
      reply = "To check currency rates, please use the currency section.";
    }

    setAiResponse(reply);
    speak(reply);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <Dialog
      header="🤖 AI Voice Assistant"
      visible={visible}
      style={{ maxWidth: '90%', width: '450px' }}
      onHide={onHide}
      className="p-4 rounded-lg"
    >
      <div className="text-center space-y-6 sm:space-y-8">
        <p className="text-gray-700 text-sm sm:text-base">
          Click the mic and ask a question!
        </p>

        <Button
          label={listening ? "Listening..." : "Start Talking 🎙️"}
          className="p-button-rounded p-button-help text-sm sm:text-base"
          icon="pi pi-microphone"
          onClick={handleStart}
          disabled={listening}
        />

        <div className="mt-4 bg-gray-100 p-3 rounded text-sm sm:text-base text-left">
          <strong>Your Question:</strong> <br /> {transcript}
        </div>

        <div className="bg-blue-100 p-3 rounded text-sm sm:text-base text-left">
          <strong>AI Response:</strong> <br /> {aiResponse}
        </div>
      </div>
    </Dialog>
  );
};

export default AIAssistant;
