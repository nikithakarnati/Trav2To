import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get("window");

const guestsOptions = [
  { label: "1 Guest", value: 1 },
  { label: "2 Guests", value: 2 },
  { label: "3 Guests", value: 3 },
  { label: "4+ Guests", value: 4 },
];

const mockHotels = [
  { name: "Grand Paris Hotel", location: "Paris", price: "$120/night" },
  { name: "Beachside Resort", location: "Goa", price: "$150/night" },
  { name: "Mountain View Inn", location: "Manali", price: "$100/night" },
];

const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString() : "";
};

const HotelBooking = () => {
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [isCheckInPickerVisible, setCheckInPickerVisibility] = useState(false);
  const [isCheckOutPickerVisible, setCheckOutPickerVisibility] = useState(false);

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

  const showCheckInPicker = () => {
    setCheckInPickerVisibility(true);
  };

  const hideCheckInPicker = () => {
    setCheckInPickerVisibility(false);
  };

  const handleCheckInConfirm = (date) => {
    setCheckInDate(date);
    hideCheckInPicker();
  };

  const showCheckOutPicker = () => {
    setCheckOutPickerVisibility(true);
  };

  const hideCheckOutPicker = () => {
    setCheckOutPickerVisibility(false);
  };

  const handleCheckOutConfirm = (date) => {
    setCheckOutDate(date);
    hideCheckOutPicker();
  };

  const handleSearch = () => {
    if (!location || !checkInDate || !checkOutDate || !guests) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill all the details!',
      });
      return;
    }

    const results = mockHotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    setHotels(results);

    Toast.show({
      type: results.length > 0 ? 'success' : 'info',
      text1: 'Search Complete',
      text2: results.length > 0 ? 'Hotels found!' : 'No hotels found.',
    });
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
          <Text style={styles.title}>Hotel Booking</Text>

          <Text style={styles.label}>Enter Destination</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="E.g., Paris, Goa"
          />

          <Text style={styles.label}>Check-in Date</Text>
          <TouchableOpacity onPress={showCheckInPicker} style={styles.dateInput}>
            <Text style={styles.dateText}>
              {checkInDate ? formatDate(checkInDate) : "Select check-in date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isCheckInPickerVisible}
            mode="date"
            onConfirm={handleCheckInConfirm}
            onCancel={hideCheckInPicker}
          />

          <Text style={styles.label}>Check-out Date</Text>
          <TouchableOpacity onPress={showCheckOutPicker} style={styles.dateInput}>
            <Text style={styles.dateText}>
              {checkOutDate ? formatDate(checkOutDate) : "Select check-out date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isCheckOutPickerVisible}
            mode="date"
            onConfirm={handleCheckOutConfirm}
            onCancel={hideCheckOutPicker}
          />

          <Text style={styles.label}>Number of Guests</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={guests}
              onValueChange={(itemValue) => setGuests(itemValue)}
              style={Platform.OS === "ios" ? { height: 180 } : {}}
            >
              <Picker.Item label="Select guests" value={null} />
              {guestsOptions.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSearch}
          >
            <Text style={styles.buttonText}>Search Hotels</Text>
          </TouchableOpacity>

          <View style={styles.resultsContainer}>
            <Text style={styles.subTitle}>Available Hotels</Text>
            {hotels.length > 0 ? (
              hotels.map((hotel, index) => (
                <View key={index} style={styles.hotelCard}>
                  <Text style={styles.hotelName}>{hotel.name}</Text>
                  <Text style={styles.hotelDetail}>
                    <Text style={styles.bold}>Location:</Text> {hotel.location}
                  </Text>
                  <Text style={styles.hotelDetail}>
                    <Text style={styles.bold}>Price:</Text> {hotel.price}
                  </Text>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noResults}>No hotels found. Try another search.</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <Toast />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
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
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  dateInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    justifyContent: 'center',
  },
  dateText: {
    color: '#000',
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
    backgroundColor: "#3b82f6", 
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
  resultsContainer: {
    marginTop: 30,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1f2937",
    textAlign: "center",
  },
  hotelCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111827",
  },
  hotelDetail: {
    fontSize: 15,
    marginBottom: 5,
    color: "#111827",
  },
  bold: {
    fontWeight: "600",
  },
  bookButton: {
    backgroundColor: "#7e57c2", // Yellow color
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  noResults: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 10,
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

export default HotelBooking;