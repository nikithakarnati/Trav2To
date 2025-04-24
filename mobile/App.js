import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";

// Import screens
import index from "./app/index"; // Main Home screen
import Login from "./app/Login";
import Signup from "./app/Signup";
import HotelBooking from "./app/HotelBooking";
import CarBooking from "./app/CarBooking";
import MedicalAssistance from "./app/MedicalAssistance";
import TravelPlanner from "./app/TravelPlanner";
import HighwayAssistance from "./app/HighwayAssistance";
import Restaurant from "./app/Restaurant";
import ItineraryPage from "./app/ItineraryPage";
import SideBar from "./app/SideBar ";
import AIAssistant from "./app/AIAssistant";
import CurrencyExchange from "./app/CurrencyExchange";
import Language from "./app/Language";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="index">
          <Stack.Screen name="index" component={index} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: "Signup" }} />
          <Stack.Screen name="HotelBooking" component={HotelBooking} options={{ title: "Hotel Booking" }} />
          <Stack.Screen name="CarBooking" component={CarBooking} options={{ title: "Car Booking" }} />
          <Stack.Screen name="MedicalAssistance" component={MedicalAssistance} options={{ title: "Medical Assistance" }} />
          <Stack.Screen name="TravelPlanner" component={TravelPlanner} options={{ title: "Travel Planner" }} />
          <Stack.Screen name="ItineraryPage" component={ItineraryPage} options={{ title: "ItineraryPage" }} />
          <Stack.Screen name="HighwayAssistance" component={HighwayAssistance} options={{ title: "Highway Assistance" }} />
          <Stack.Screen name="Restaurant" component={Restaurant} options={{ title: "Restaurant" }} />
          <Stack.Screen name="SideBar" component={SideBar} options={{ title: "SideBar" }} />
          <Stack.Screen name="AIAssistant" component={AIAssistant} options={{ title: "AIAssistant" }} />
          <Stack.Screen name="CurrencyExchange" component={CurrencyExchange} options={{ title: "CurrencyExchange" }} />
          <Stack.Screen name="Language" component={Language} options={{ title: "Language" }} />


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
