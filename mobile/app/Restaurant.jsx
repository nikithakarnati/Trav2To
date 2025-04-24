import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get('window');

const Restaurant = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reservationName, setReservationName] = useState('');
  const [reservationPhone, setReservationPhone] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  const restaurants = [
    { name: 'Le Gourmet', vicinity: '12 Rue de Paris, 75001 Paris, France', photos: [{ photo_reference: 'sample_photo_1', url: 'https://source.unsplash.com/400x300/?restaurant,paris' }] },
    { name: 'Chez Marie', vicinity: '45 Boulevard Haussmann, 75009 Paris, France', photos: [{ photo_reference: 'sample_photo_2', url: 'https://source.unsplash.com/400x300/?dining,france' }] },
    { name: 'Bistro Bon Appétit', vicinity: '99 Avenue des Champs-Élysées, 75008 Paris, France', photos: [] },
  ];

  const handleReserve = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setVisible(true);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchLocation);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleBookNow = () => {
    console.log('Reservation Details:', {
      restaurant: selectedRestaurant?.name,
      name: reservationName,
      phone: reservationPhone,
      date: reservationDate,
      time: reservationTime,
    });
    setVisible(false);
  };
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

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      options.push(<Picker.Item key={formattedDate} label={formattedDate} value={formattedDate} />);
    }
    return options;
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        options.push(<Picker.Item key={formattedTime} label={formattedTime} value={formattedTime} />);
      }
    }
    return options;
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
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.exploreText}>Explore Restaurants</Text>
          <Text style={styles.searchPrompt}>Search the best places to dine around you</Text>
        </View>

        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search city or area..."
            value={searchLocation}
            onChangeText={setSearchLocation}
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {restaurants.map((rest, index) => (
          <Card key={index} style={styles.restaurantCard}>
            <View style={styles.cardContent}>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{rest.name}</Text>
                <Text style={styles.restaurantVicinity}>{rest.vicinity}</Text>
              </View>
              <TouchableOpacity onPress={() => handleReserve(rest)} style={styles.reserveButton}>
                <Text style={styles.reserveButtonText}>Reserve</Text>
              </TouchableOpacity>
              {rest.photos?.[0]?.url && (
                <Image source={{ uri: rest.photos[0].url }} style={styles.restaurantImage} />
              )}
              {!rest.photos?.[0]?.url && (
                <View style={styles.noImageContainer}>
                  <Text style={styles.noImageText}>No Image</Text>
                </View>
              )}
            </View>
          </Card>
        ))}

        <Modal visible={visible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <View style={styles.modalHeaderContainer}>
                <Text style={styles.modalHeader}>Reserve at {selectedRestaurant?.name}</Text>
                <TouchableOpacity onPress={handleCloseModal} style={styles.modalCloseButton}>
                  <Ionicons name="close" size={24} color="#555" />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalLabel}>Name</Text>
              <TextInput placeholder="Your Name" style={styles.modalInput} value={reservationName} onChangeText={setReservationName} />

              <Text style={styles.modalLabel}>Phone</Text>
              <TextInput placeholder="Phone Number" style={styles.modalInput} value={reservationPhone} onChangeText={setReservationPhone} />
              <View style={styles.modalDateTimeContainer}>
              <View style={styles.modalDateTimeInput}>
                <Text style={styles.modalLabel}>Date</Text>
                <TextInput placeholder="YYYY-MM-DD" style={styles.modalInput} />
              </View>
              <View style={styles.modalDateTimeInput}>
                <Text style={styles.modalLabel}>Time</Text>
                <TextInput placeholder="HH:MM" style={styles.modalInput} />
              </View>
            </View>


              <TouchableOpacity
                style={styles.modalBookButton}
                onPress={handleBookNow}
              >
                <Text style={styles.modalBookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: { flex: 1,  paddingHorizontal: 16, paddingTop: 20 },
  header: { marginBottom: 16 },
  exploreText: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  searchPrompt: { fontSize: 14, color: '#666' },
  searchBarContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ddd', marginBottom: 8 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 10 },
  searchButton: { backgroundColor: '#3b82f6', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  searchButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  restaurantCard: { marginBottom: 12, borderRadius: 8, backgroundColor: '#fff', elevation: 2, padding: 12 },
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  restaurantInfo: { flex: 1, marginRight: 8 },
  restaurantName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  restaurantVicinity: { fontSize: 12, color: '#666', marginTop: 2 },
  reserveButton: { backgroundColor: '#7e57c2', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5 },
  reserveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  restaurantImage: { width: 80, height: 80, borderRadius: 8, marginLeft: 8 },
  noImageContainer: { width: 80, height: 80, backgroundColor: '#ddd', borderRadius: 8, marginLeft: 8, justifyContent: 'center', alignItems: 'center' },
  noImageText: { color: '#777', fontSize: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalView: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalLabel: { fontSize: 14, marginBottom: 6, color: '#555' },
  modalInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  modalPickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  modalPicker: {
    height: 40,
  },
  modalDateTimeContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  modalDateTimeInput: { flex: 1, marginRight: 6 },
  modalBookButton: { backgroundColor: '#3b82f6', padding: 12, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  modalBookButtonText: { color: '#fff', fontWeight: 'bold' },
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

export default Restaurant;