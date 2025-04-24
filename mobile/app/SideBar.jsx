import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SideBar = () => {
  const navigation = useNavigation();

  return (
    
    <View style={sidebarStyles.container}>
      <View style={sidebarStyles.card}>
        <Text style={sidebarStyles.title}> ⚙️ Settings</Text>
        <TouchableOpacity style={sidebarStyles.button} onPress={() => navigation.navigate("AIAssistant")}>
          <Text style={sidebarStyles.buttonText}>AI Assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={sidebarStyles.button} onPress={() => navigation.navigate("Language")}>
          <Text style={sidebarStyles.buttonText}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={sidebarStyles.button} onPress={() => navigation.navigate("CurrencyExchange")}>
          <Text style={sidebarStyles.buttonText}>Currency Exchange</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const sidebarStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D5FF',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '80%',
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6B21A8',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7e57c2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SideBar;