import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { motion } from "framer-motion";

const serviceTypes = [
  { name: "Towing Service", code: "TOW" },
  { name: "Fuel Delivery", code: "FUEL" },
  { name: "Flat Tire Repair", code: "TIRE" },
  { name: "Battery Jumpstart", code: "BATTERY" },
  { name: "Emergency Medical Help", code: "MEDICAL" },
];

const HighwayAssistance = () => {
  const toast = useRef(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      service: null,
      contact: "",
    },
  });

  const onSubmit = (data) => {
    toast.current.show({
      severity: "success",
      summary: "Request Sent",
      detail: `Help is on the way for ${data.service.name}!`,
    });
    reset();
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 overflow-hidden px-4">

      {/* Animated Background Circles */}
      <motion.div 
        animate={{ x: [0, 80, 0], y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute w-52 h-52 md:w-72 md:h-72 bg-blue-200 rounded-full opacity-30 top-10 left-10 blur-2xl"
      />
      <motion.div 
        animate={{ x: [-80, 50, -80], y: [-40, 0, -40], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute w-56 h-56 md:w-80 md:h-80 bg-pink-100 rounded-full opacity-30 bottom-10 right-10 blur-2xl"
      />

      {/* Form Card with Hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }} 
        className="w-full max-w-2xl p-6 sm:p-10 bg-white rounded-2xl shadow-2xl backdrop-blur-lg bg-opacity-90 z-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Highway Assistance</h1>
        <Toast ref={toast} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          {/* Location Input */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Your Current Location</label>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  placeholder="Enter your location"
                  className={`w-full p-3 rounded-lg shadow-sm ${errors.location ? "border-red-500" : "border-gray-300"} border`}
                />
              )}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Service Dropdown */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Select Service</label>
            <Controller
              name="service"
              control={control}
              rules={{ required: "Please select a service" }}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={serviceTypes}
                  optionLabel="name"
                  placeholder="Choose a service"
                  className={`w-full p-3 border rounded-lg shadow-sm ${errors.service ? "border-red-500" : "border-gray-300"}`}
                />
              )}
            />
            {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
          </div>

          {/* Contact Input */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Your Contact Number</label>
            <Controller
              name="contact"
              control={control}
              rules={{ required: "Contact number is required" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  placeholder="Enter your phone number"
                  className={`w-full p-3 rounded-lg shadow-sm ${errors.contact ? "border-red-500" : "border-gray-300"} border`}
                />
              )}
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              label="Request Assistance"
              icon="pi pi-check"
              className=" bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300"
            />
          </div>
        </form>

        {/* Emergency Contacts */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 text-center">Emergency Contacts</h2>
          <Card className="p-5 bg-white shadow-md rounded-xl text-left space-y-2">
            <p><strong>🚨 Roadside Helpline</strong> </p>
            <p><strong>👮 Police</strong> </p>
            <p><strong>🚑 Ambulance</strong> </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default HighwayAssistance;
