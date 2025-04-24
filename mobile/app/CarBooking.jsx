import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Easing } from 'react-native-reanimated';


const locations = ["Paris", "New York", "Tokyo", "London"];
const carTypes = ["Economy", "SUV", "Luxury", "Electric"];

const CarBooking = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [carType, setCarType] = useState("");
  const [pickupDate, setPickupDate] = useState(new Date());
  const [dropoffDate, setDropoffDate] = useState(new Date());
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showDropoffPicker, setShowDropoffPicker] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handleBooking = () => {
    if (!pickupLocation || !carType || !pickupDate || !dropoffDate) {
      alert("Please fill in all fields!");
      return;
    }

    setConfirmation({
      location: pickupLocation,
      car: carType,
      pickup: pickupDate.toDateString(),
      dropoff: dropoffDate.toDateString(),
    });

    setPickupLocation("");
    setCarType("");
    setPickupDate(new Date());
    setDropoffDate(new Date());
  };

  return (
    <LinearGradient
      colors={["#bfdbfe", "#e9d5ff", "#fbcfe8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
    >
      {/* Animated Circles */}
      <MotiView
        from={{ opacity: 0.3, translateX: 0, translateY: 0 }}
        animate={{
          opacity: 0.6,
          translateX: 80,
          translateY: 40,
        }}
        transition={{
          loop: true,
          type: "timing",
          duration: 6000,
          easing: Easing.inOut(Easing.ease),
        }}
        style={styles.circleOne}
      />
      <MotiView
        from={{ opacity: 0.3, translateX: 0, translateY: 0 }}
        animate={{
          opacity: 0.6,
          translateX: -80,
          translateY: -40,
        }}
        transition={{
          loop: true,
          type: "timing",
          duration: 6000,
          easing: Easing.inOut(Easing.ease),
        }}
        style={styles.circleTwo}
      />

      {/* Booking Card */}
      <ScrollView contentContainerStyle={styles.cardContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.heading}>Car Booking</Text>

          {/* Pickup Location */}
          <Text style={styles.label}>Pickup Location</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={pickupLocation}
              onValueChange={(value) => setPickupLocation(value)}
            >
              <Picker.Item label="Select Location" value="" />
              {locations.map((loc) => (
                <Picker.Item key={loc} label={loc} value={loc} />
              ))}
            </Picker>
          </View>

          {/* Car Type */}
          <Text style={styles.label}>Car Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={carType}
              onValueChange={(value) => setCarType(value)}
            >
              <Picker.Item label="Select Car Type" value="" />
              {carTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>

          {/* Pickup Date */}
          <Text style={styles.label}>Pickup Date</Text>
          <TouchableOpacity
            onPress={() => setShowPickupPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>{pickupDate.toDateString()}</Text>
          </TouchableOpacity>
          {showPickupPicker && (
            <DateTimePicker
              value={pickupDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowPickupPicker(false);
                if (selectedDate) setPickupDate(selectedDate);
              }}
            />
          )}

          {/* Drop-off Date */}
          <Text style={styles.label}>Drop-off Date</Text>
          <TouchableOpacity
            onPress={() => setShowDropoffPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>{dropoffDate.toDateString()}</Text>
          </TouchableOpacity>
          {showDropoffPicker && (
            <DateTimePicker
              value={dropoffDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDropoffPicker(false);
                if (selectedDate) setDropoffDate(selectedDate);
              }}
            />
          )}

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>

          {/* Confirmation */}
          {confirmation && (
            <View style={styles.confirmation}>
              <Text style={styles.confirmationText}>
                Car booked: <Text style={styles.bold}>{confirmation.car}</Text> from{" "}
                <Text style={styles.bold}>{confirmation.location}</Text> between{" "}
                <Text style={styles.bold}>{confirmation.pickup}</Text> and{" "}
                <Text style={styles.bold}>{confirmation.dropoff}</Text>
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  cardContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  heading: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 20,
    color: "#374151",
  },
  label: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
    marginTop: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  dateText: {
    color: "#374151",
  },
  button: {
    backgroundColor: "#3B82F6",
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  confirmation: {
    marginTop: 16,
    backgroundColor: "#DCFCE7",
    padding: 12,
    borderRadius: 8,
  },
  confirmationText: {
    color: "#065F46",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  circleOne: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#bfdbfe",
    opacity: 0.3,
    top: 40,
    left: 20,
    zIndex: -1,
  },
  circleTwo: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#fbcfe8",
    opacity: 0.3,
    bottom: 30,
    right: 20,
    zIndex: -1,
  },
});

export default CarBooking;