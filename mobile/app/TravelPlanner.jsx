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
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get("window");

const destinations = [
  { label: "Paris", value: "PAR", name: "Paris" },
  { label: "New York", value: "NYC", name: "New York" },
  { label: "Tokyo", value: "TOK", name: "Tokyo" },
  { label: "London", value: "LDN", name: "London" },
];

const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString() : "";
};

const TravelPlanner = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const fromDate = watch("fromDate");
  const toDate = watch("toDate");

  // Reusing state and functions from HotelBooking pattern
  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

  // Animation logic for blur circles (same as HotelBooking)
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

  const showFromDatePicker = () => {
    setFromDatePickerVisibility(true);
  };

  const hideFromDatePicker = () => {
    setFromDatePickerVisibility(false);
  };

  const handleFromDateConfirm = (date) => {
    setValue("fromDate", date);
    hideFromDatePicker();
  };

  const showToDatePicker = () => {
    setToDatePickerVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDatePickerVisibility(false);
  };

  const handleToDateConfirm = (date) => {
    setValue("toDate", date);
    hideToDatePicker();
  };

  const onSubmit = (data) => {
    if (new Date(data.fromDate) > new Date(data.toDate)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Dates',
        text2: 'From Date cannot be after To Date!',
      });
      return;
    }

    if (!data.destination) {
      Toast.show({
        type: 'error',
        text1: 'Missing Field',
        text2: 'Please select a destination!',
      });
      return;
    }

    if (!data.travelers) {
      Toast.show({
        type: 'error',
        text1: 'Missing Field',
        text2: 'Please enter the number of travelers!',
      });
      return;
    }

    const plan = [];
    const currentDate = new Date(data.fromDate);
    let dayCount = 1;

    while (currentDate <= new Date(data.toDate)) {
      const formattedDate = currentDate.toDateString();

      plan.push(
        { time: formattedDate, activity: `--- Day ${dayCount} ---` },
        { time: "9:00 AM", activity: `Breakfast in ${data.destination.name}` },
        { time: "11:00 AM", activity: `Visit the main attraction of ${data.destination.name}` },
        { time: "2:00 PM", activity: `Lunch at a local restaurant` },
        { time: "4:00 PM", activity: `Explore hidden gems of ${data.destination.name}` },
        { time: "7:00 PM", activity: `Dinner and nightlife` }
      );

      currentDate.setDate(currentDate.getDate() + 1);
      dayCount++;
    }

    navigation.navigate("ItineraryPage", {
      itinerary: plan,
      destination: data.destination,
      fromDate: new Date(data.fromDate).toDateString(),
      toDate: new Date(data.toDate).toDateString(),
      travelers: data.travelers,
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
          <Text style={styles.title}>🌍 Plan Your Trip</Text>

          <Text style={styles.label}>Destination</Text>
          <View style={styles.pickerWrapper}>
            <Controller
              name="destination"
              control={control}
              rules={{ required: "Destination is required" }}
              render={({ field }) => (
                <Picker
                  selectedValue={field.value ? field.value.value : null}
                  onValueChange={(itemValue) => {
                    const selectedDestination = destinations.find(d => d.value === itemValue);
                    setValue("destination", selectedDestination);
                  }}
                  style={Platform.OS === "ios" ? { height: 180 } : {}}
                >
                  <Picker.Item label="Select destination" value={null} />
                  {destinations.map((dest) => (
                    <Picker.Item key={dest.value} label={dest.label} value={dest.value} />
                  ))}
                </Picker>
              )}
            />
          </View>
          {errors.destination && <Text style={styles.error}>{errors.destination.message}</Text>}

          <View style={styles.datePickers}>
            <View style={styles.datePickerContainer}>
              <Text style={styles.label}>From Date</Text>
              <TouchableOpacity onPress={showFromDatePicker} style={styles.dateInput}>
                <Text style={styles.dateText}>
                  {fromDate ? formatDate(fromDate) : "Select start date"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="gray" />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isFromDatePickerVisible}
                mode="date"
                onConfirm={handleFromDateConfirm}
                onCancel={hideFromDatePicker}
              />
              {errors.fromDate && <Text style={styles.error}>{errors.fromDate.message}</Text>}
            </View>

            <View style={styles.datePickerContainer}>
              <Text style={styles.label}>To Date</Text>
              <TouchableOpacity onPress={showToDatePicker} style={styles.dateInput}>
                <Text style={styles.dateText}>
                  {toDate ? formatDate(toDate) : "Select end date"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="gray" />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isToDatePickerVisible}
                mode="date"
                onConfirm={handleToDateConfirm}
                onCancel={hideToDatePicker}
              />
              {errors.toDate && <Text style={styles.error}>{errors.toDate.message}</Text>}
            </View>
          </View>

          <Text style={styles.label}>Number of Travelers</Text>
          <Controller
            name="travelers"
            control={control}
            rules={{
              required: "Number of travelers is required",
              min: { value: 1, message: "At least one traveler required" },
            }}
            render={({ field }) => (
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder="Enter number"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          {errors.travelers && <Text style={styles.error}>{errors.travelers.message}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Generate Plan</Text>
          </TouchableOpacity>
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
    textAlign: 'left',
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    color: '#000',
  },
  dateInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
  dropdown: { // Renamed to avoid confusion
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 16,
    overflow: "hidden",
  },
  dropdownItemText: {
    color: '#000',
  },
  dropdownStyle: {
    borderRadius: 12,
  },
  button: {
    backgroundColor: "#3b82f6", // Blue color from the web example
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
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
  error: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 3,
    textAlign: "left",
  },
  datePickers: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  datePickerContainer: {
    flex: 1,
    marginRight: 8,
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

export default TravelPlanner;