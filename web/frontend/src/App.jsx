import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import HotelBooking from "./components/HotelBooking";
import CarRentals from "./components/CarBooking";
import MedicalAssistance from "./components/MedicalAssistance";
import TravelPlanner from "./components/TravelPlanner";
import ItineraryPage from "./components/ItineraryPage";
import HighwayAssistance from "./components/HighwayAssistance";
import Restaurant from "./components/Restaurant";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Secure key access

export default function App() {
    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/hotel-booking" element={<HotelBooking />} />
                    <Route path="/car-rentals" element={<CarRentals />} />
                    <Route path="/medical-assistance" element={<MedicalAssistance />} />
                    <Route path="/travel-itinerary" element={<TravelPlanner />} />
                    <Route path="/itinerary" element={<ItineraryPage />} />
                    <Route path="/highway-assistance" element={<HighwayAssistance />} />
                    <Route path="/restaurant" element={<Restaurant />} />
                </Routes>
            </Router>
        </LoadScript>
    );
}
