
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get("window");

export default function index() {
  const [location, setLocation] = useState("");
  const [mapRegion, setMapRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const navigation = useNavigation();
  const fadeInUp = { 0: { opacity: 0, translateY: 30 }, 1: { opacity: 1, translateY: 0 } };
  const fadeIn = { 0: { opacity: 0 }, 1: { opacity: 1 } };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=YOUR_API_KEY` // Replace with your actual API key
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setMapRegion({
          ...mapRegion,
          latitude: lat,
          longitude: lng,
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const services = [
    { name: "Travel Planner", icon: "✈️", path: "TravelPlanner" },
    { name: "Medical Assistance", icon: "❤️", path: "MedicalAssistance" },
    { name: "Highway Assistance", icon: "🚗", path: "HighwayAssistance" },
    { name: "Hotel Booking", icon: "🏨", path: "HotelBooking" },
    { name: "Car Booking", icon: "🚘", path: "CarBooking" },
    { name: "Restaurant", icon: "🍱", path: "Restaurant" },
  ];

  const navigateToSidebar = () => {
    navigation.navigate("SideBar");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Animatable.View animation={fadeInUp} duration={800} style={styles.header}>
        <Text style={styles.title}>Trav2To</Text>
        <View style={styles.authButtons}>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.linkPrimary}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSidebar} style={styles.sidebarButton}>
            <Icon name="menu" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </Animatable.View>

      {/* Search Bar */}
      <Animatable.View animation={fadeInUp} delay={300} duration={800} style={styles.searchContainer}>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Search for a location..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Map */}
      <Animatable.View animation={fadeInUp} delay={500} duration={800} style={styles.mapContainer}>
        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} />
        </MapView>
      </Animatable.View>

      {/* Services Grid */}
      <Animatable.View animation={fadeIn} delay={700} duration={800} style={styles.servicesGrid}>
        {services.map((service, index) => (
          <Animatable.View
            animation={fadeInUp}
            delay={800 + index * 100}
            duration={600}
            key={index}
            style={styles.serviceCardWrapper}
          >
            <TouchableOpacity
              style={styles.serviceCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(service.path)}
            >
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <Text style={styles.serviceText}>{service.name}</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9D5FF",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6B21A8",
    marginBottom: 8,
    alignItems: "left",
  },
  authButtons: {
    flexDirection: "row",
    gap: 16,
    alignItems: "right",
  },
  sidebarButton: {
    marginRight: 15,
    padding: 5,
  },
  linkPrimary: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#9333EA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: "#A855F7",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#9333EA",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  mapContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  map: {
    width: width - 32,
    height: 400,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 12,
    marginBottom: 24,
  },
  serviceCardWrapper: {
    width: "48%",
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B21A8",
  },
});