import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Icon from "react-native-vector-icons/Feather"; // Or your preferred icon set

const AIAssistant = () => { // Renamed component to AIAssistantScreen for clarity
  const [aiResponse, setAiResponse] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && !listening) {
      handleAI(transcript);
    }
  }, [listening, transcript]);

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const speak = (text) => {
    if (Platform.OS === 'web' && 'speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    } else {
      console.warn("Text-to-speech is only available on web in this example.");
      // You would typically use a native module for TTS in iOS/Android
    }
  };

  const handleAI = (input) => {
    let reply = "Sorry, I didn't understand that.";

    // Simple bot logic
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

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>🤖 AI Voice Assistant</Text>
          <Text style={styles.infoText}>
            {browserSupportsSpeechRecognition
              ? "Microphone access is not available."
              : "Your device does not support speech recognition."}
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>AI Voice Assistant</Text>
        <Text style={styles.instructionText}>
          Click the mic and ask a question!
        </Text>

        <TouchableOpacity
          style={[styles.button, listening && styles.listeningButton]}
          onPress={handleStart}
          disabled={listening}
        >
          <Icon name="microphone" size={24} color="#fff" style={styles.micIcon} />
          <Text style={styles.buttonText}>
            {listening ? "Listening..." : "Start Talking"}
          </Text>
        </TouchableOpacity>

        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptLabel}>Your Question:</Text>
          <Text style={styles.transcriptText}>{transcript}</Text>
        </View>

        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>AI Response:</Text>
          <Text style={styles.responseText}>{aiResponse}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D5FF', // Match the background color of other pages
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6B21A8', // Consistent with your theme
    textAlign: 'center',
  },
  instructionText: {
    color: "#777",
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9333EA",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  listeningButton: {
    backgroundColor: "#3B82F6",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  micIcon: {
    marginRight: 8,
  },
  transcriptContainer: {
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  transcriptLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  transcriptText: {
    color: "#555",
  },
  responseContainer: {
    backgroundColor: "#E0F2F7",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  responseLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  responseText: {
    color: "#1E88E5",
  },
});

export default AIAssistant;