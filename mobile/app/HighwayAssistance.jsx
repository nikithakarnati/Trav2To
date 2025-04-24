import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const serviceTypes = [
  { name: "Towing Service", code: "TOW" },
  { name: "Fuel Delivery", code: "FUEL" },
  { name: "Flat Tire Repair", code: "TIRE" },
  { name: "Battery Jumpstart", code: "BATTERY" },
  { name: "Emergency Medical Help", code: "MEDICAL" },
];

const HighwayAssistance = () => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState();
  const [contact, setContact] = useState("");

  // Animation logic for blur circles
  const circle1X = useSharedValue(0);
  const circle1Y = useSharedValue(0);
  const circle2X = useSharedValue(0);
  const circle2Y = useSharedValue(0);

  useEffect(() => {
    circle1X.value = withRepeat(withTiming(80, { duration: 3000 }), -1, true);
    circle1Y.value = withRepeat(withTiming(40, { duration: 3000 }), -1, true);
    circle2X.value = withRepeat(withTiming(-80, { duration: 3000 }), -1, true);
    circle2Y.value = withRepeat(withTiming(-40, { duration: 3000 }), -1, true);
  }, []);

  const circle1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: circle1X.value }, { translateY: circle1Y.value }],
  }));

  const circle2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: circle2X.value }, { translateY: circle2Y.value }],
  }));

  const handleRequestAssistance = () => {
    if (!location || !service || !contact) {
      Alert.alert("Missing Fields", "Please fill all the details!");
      return;
    }

    Alert.alert("Request Sent", `Help is on the way for ${service}!`);
    setLocation("");
    setService(null);
    setContact("");
  };

  return (
    <LinearGradient
      colors={["#bfdbfe", "#e9d5ff", "#fbcfe8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
      >
      {/* Animated Blur Circles */}
      <Animated.View style={[styles.circleBlue, circle1Style]} />
      <Animated.View style={[styles.circlePink, circle2Style]} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Highway Assistance</Text>

          <Text style={styles.label}>Your Current Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter your location"
          />

          <Text style={styles.label}>Select Service</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={service}
              onValueChange={(itemValue) => setService(itemValue)}
              style={Platform.OS === "ios" ? { height: 180 } : {}}
            >
              <Picker.Item label="Choose a service" value={null} />
              {serviceTypes.map((s) => (
                <Picker.Item key={s.code} label={s.name} value={s.name} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Your Contact Number</Text>
          <TextInput
            style={styles.input}
            value={contact}
            onChangeText={setContact}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleRequestAssistance}
          >
            <Text style={styles.buttonText}>Request Assistance</Text>
          </TouchableOpacity>

          <View style={styles.contactCard}>
            <Text style={styles.subTitle}>Emergency Contacts</Text>
            <Text style={styles.contact}>
              <Text style={styles.bold}>🚨 Roadside Helpline </Text>
            </Text>
            <Text style={styles.contact}>
              <Text style={styles.bold}>👮 Police </Text>
            </Text>
            <Text style={styles.contact}>
              <Text style={styles.bold}>🚑 Ambulance </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    minHeight: height,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 500,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1f2937",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 16,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#3b82f6", // Blue color
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1f2937",
    textAlign: "center",
  },
  contactCard: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  contact: {
    fontSize: 15,
    marginBottom: 5,
    color: "#111827",
  },
  bold: {
    fontWeight: "600",
  },
  circleBlue: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: "#bfdbfe",
    borderRadius: 100,
    opacity: 0.3,
    top: 40,
    left: 20,
    zIndex: -1,
  },
  circlePink: {
    position: "absolute",
    width: 220,
    height: 220,
    backgroundColor: "#fbcfe8",
    borderRadius: 110,
    opacity: 0.3,
    bottom: 30,
    right: 10,
    zIndex: -1,
  },
});

export default HighwayAssistance;
