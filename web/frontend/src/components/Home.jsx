import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AIAssistant from "../components/AIAssistant";
import CurrencyExchange from "../components/CurrencyExchange";
import Language from "../components/Language"; 

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "10px",
};

const center = { lat: 48.8566, lng: 2.3522 }; 
export default function Home() {
  const [location, setLocation] = useState("");
  const [mapCenter, setMapCenter] = useState(center);
  const [showLangDialog, setShowLangDialog] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showCurrencyExchange, setShowCurrencyExchange] = useState(false);

  const navigate = useNavigate();

  const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "Hindi", value: "hi" },
  ];

  const handleSearch = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setMapCenter({ lat, lng });
        }
      })
      .catch((error) => console.error("Error fetching location:", error));
  };

  const handleTranslator = () => {
    setShowLangDialog(false);
    alert("Translator functionality coming soon!");
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-purple-200 to-purple-400 flex flex-col items-center px-4 md:px-8 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl flex justify-between items-center py-6"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700">Trav2To</h1>
        <div className="flex gap-2 items-center">
          <Button label="Signup" className="p-button-outlined p-button-rounded" onClick={() => navigate("/Signup")} />
          <Button icon="pi pi-bars" className="p-button-rounded" onClick={() => setShowSidebar(true)} />
        </div>
      </motion.div>

      {/* Sidebar */}
      <Sidebar visible={showSidebar} position="right" onHide={() => setShowSidebar(false)} className="max-w-full sm:max-w-xs">
        <h2 className="text-xl font-bold mb-4">🌐 Settings</h2>
        <div className="flex flex-col gap-4">
          <Button
            label="🌍 Language"
            className="w-full p-button-outlined"
            onClick={() => {
              setShowSidebar(false);
              setShowLangDialog(true);
            }}
          />
          <Button
            label="🤖 AI Assistant"
            className="w-full p-button-outlined"
            onClick={() => {
              setShowSidebar(false);
              setShowAI(true);
            }}
          />
          <Button
            label="💱 Currency Exchange"
            className="w-full p-button-outlined"
            onClick={() => {
              setShowSidebar(false);
              setShowCurrencyExchange(true);
            }}
          />
        </div>
      </Sidebar>

      {/* Currency Exchange Floating Popup */}
      <Dialog
        header="💱 Currency Exchange"
        visible={showCurrencyExchange}
        onHide={() => setShowCurrencyExchange(false)}
        className="rounded-2xl w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[50vw]"
        draggable={false}
        resizable={false}
        style={{ maxWidth: '400px' }}
      >
        <CurrencyExchange />
      </Dialog>

    

      {/* Language & Translator Dialog */}
      <Dialog
        header="🌎 Language & Translator"
        visible={showLangDialog}
        onHide={() => setShowLangDialog(false)}
        className="rounded-lg w-[90vw] sm:w-[400px] md:w-[350px] max-w-full"
        draggable={false}
        resizable={false}
      >
        <Language
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          languages={languages}
          handleTranslator={handleTranslator}
        />
      </Dialog>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl flex flex-col sm:flex-row gap-4"
      >
        <InputText
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search for a location..."
          className="w-full h-12 p-inputtext-lg border-2 border-purple-400 rounded-lg"
        />
        <Button
          label="Search"
          icon="pi pi-search"
          className="p-button-primary w-full sm:w-auto h-12 rounded-lg"
          onClick={handleSearch}
        />
      </motion.div>

      {/* Google Map */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-6xl h-[400px] md:h-[450px] mt-8 rounded-lg shadow-xl"
      >
        <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={12}>
          <Marker position={mapCenter} />
        </GoogleMap>
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="w-full max-w-6xl mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4"
      >
        {[
          { name: "Travel Planner", icon: "✈️", path: "/travel-itinerary" },
          { name: "Medical Assistance", icon: "❤️", path: "/medical-assistance" },
          { name: "Highway Assistance", icon: "🚗", path: "/highway-assistance" },
          { name: "Hotel Booking", icon: "🏨", path: "/hotel-booking" },
          { name: "Car Booking", icon: "🚘", path: "/car-rentals" },
          { name: "Restaurant", icon: "🍱", path: "/restaurant" },
        ].map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => navigate(service.path)}
          >
            <div className="p-6 mt-8 text-center shadow-lg h-32 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl hover:shadow-2xl">
              <span className="text-3xl">{service.icon}</span>
              <h2 className="text-lg md:text-xl font-semibold text-black mt-2">{service.name}</h2>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Assistant Modal */}
      <AIAssistant visible={showAI} onHide={() => setShowAI(false)} />
    </div>
  );
}
