import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import { Card } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import MapView, { Marker } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';


const { width, height } = Dimensions.get('window');

const mockHospitals = [
  { name: 'City Hospital', location: 'Paris', contact: '123-456-7890', lat: 48.8566, lng: 2.3522 },
  { name: 'MediCare Clinic', location: 'Mumbai', contact: '987-654-3210', lat: 19.076, lng: 72.8777 },
  { name: 'GreenLife Hospital', location: 'New York', contact: '456-789-0123', lat: 40.7128, lng: -74.0060 },
];

const MedicalAssistance = () => {
  const [hospitals, setHospitals] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [center, setCenter] = useState({ latitude: 20.5937, longitude: 78.9629, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setCenter({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    const searchText = locationInput.toLowerCase();
    const results = mockHospitals.filter((hospital) =>
      hospital.location.toLowerCase().includes(searchText)
    );

    setTimeout(() => {
      setHospitals(results);
      if (results.length > 0) {
        setCenter({
          latitude: results[0].lat,
          longitude: results[0].lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        Toast.show({
          type: 'success',
          text1: 'Found',
          text2: `${results.length} hospital(s) found.`,
        });
      } else {
        Toast.show({
          type: 'info',
          text1: 'No Results',
          text2: 'No hospitals found in that location.',
        });
      }
      setLoading(false);
    }, 500);
  };

  const renderMarkers = () =>
    hospitals.map((hospital, index) => (
      <Marker
        key={index}
        coordinate={{ latitude: hospital.lat, longitude: hospital.lng }}
        title={hospital.name}
      />
    ));

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <LinearGradient
      colors={['#bfdbfe', '#e9d5ff', '#fbcfe8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
    >
      {/* Animated Background Circles */}
      <Animatable.View
        animation={{ 0: { translateX: 0, translateY: 0, opacity: 0.3 }, 0.5: { translateX: 80, translateY: 40, opacity: 0.6 }, 1: { translateX: 0, translateY: 0, opacity: 0.3 } }}
        easing="easeInOut"
        iterationCount="infinite"
        duration={6000}
        style={styles.bgCircle1}
      />
      <Animatable.View
        animation={{ 0: { translateX: -80, translateY: -40, opacity: 0.3 }, 0.5: { translateX: 50, translateY: 0, opacity: 0.6 }, 1: { translateX: -80, translateY: -40, opacity: 0.3 } }}
        easing="easeInOut"
        iterationCount="infinite"
        duration={6000}
        style={styles.bgCircle2}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>🩺 Medical Assistance</Text>
          <Toast ref={toastRef} />

          {/* Search Form */}
          <View style={styles.searchForm}>
            <Text style={styles.label}>Enter Your Location</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g., Paris, Mumbai, New York"
              value={locationInput}
              onChangeText={setLocationInput}
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Find Hospitals</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Hospital Cards */}
          <View style={styles.hospitalsContainer}>
            <Text style={styles.sectionTitle}>Nearby Hospitals</Text>
            {hospitals.length > 0 ? (
              hospitals.map((hospital, index) => (
                <Card key={index} style={styles.hospitalCard}>
                  <Card.Content>
                    <Text style={styles.hospitalName}>{hospital.name}</Text>
                    <Text style={styles.hospitalDetail}>
                      <Text style={styles.bold}>Location:</Text> {hospital.location}
                    </Text>
                    <Text style={styles.hospitalDetail}>
                      <Text style={styles.bold}>Contact:</Text> {hospital.contact}
                    </Text>
                    <TouchableOpacity
                      style={styles.callButton}
                      onPress={() => handleCall(hospital.contact)}
                    >
                      <Text style={styles.callButtonText}>📞 Call Now</Text>
                    </TouchableOpacity>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <Text style={styles.noResults}>No hospitals found. Try searching another city.</Text>
            )}
          </View>

          {/* Google Map */}
          <View style={styles.mapContainer}>
            <MapView style={styles.map} initialRegion={center}>
              {renderMarkers()}
            </MapView>
          </View>

          {/* Emergency Contacts */}
          <View style={styles.emergencyContacts}>
            <Text style={styles.sectionTitle}>🚨 Emergency Contacts</Text>
            <View style={styles.emergencyButtons}>
              <TouchableOpacity style={styles.emergencyButton} onPress={() => Linking.openURL('tel:102')}>
                <Text style={styles.emergencyButtonText}>🚑 Ambulance</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.emergencyButton} onPress={() => Linking.openURL('tel:101')}>
                <Text style={styles.emergencyButtonText}>🔥 Fire</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.emergencyButton} onPress={() => Linking.openURL('tel:100')}>
                <Text style={styles.emergencyButtonText}>🚔 Police</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    marginLeft:5,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  bgCircle1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    top: 40,
    left: 40,
    zIndex: -1,
  },
  bgCircle2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 182, 193, 0.3)',
    bottom: 40,
    right: 40,
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e88e5',
  },
  searchForm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    width: '90%',
    maxWidth: 600,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#546e7a',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hospitalsContainer: {
    marginTop: 20,
    width: '90%',
    maxWidth: 600,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#37474f',
    marginBottom: 15,
  },
  hospitalCard: {
    marginBottom: 15,
    elevation: 3,
    borderRadius: 8,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 5,
  },
  hospitalDetail: {
    fontSize: 14,
    color: '#455a64',
    marginBottom: 3,
  },
  bold: {
    fontWeight: 'bold',
  },
  callButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noResults: {
    color: '#78909c',
    fontSize: 16,
  },
  mapContainer: {
    marginTop: 30,
    width: '90%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: 600,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  emergencyContacts: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxWidth: 700,
  },
  emergencyButtons: {
    flexDirection: 'column', // Arrange buttons vertically
    justifyContent: 'space-between', // Distribute space evenly
    marginTop: 15,
    gap: 10, // Add a gap of 10 pixels between items
  },
  emergencyButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MedicalAssistance;