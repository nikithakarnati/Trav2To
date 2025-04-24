import React from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  

  const onSubmit = () => {
    // Handle login logic here
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

      {/* Responsive Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }}
        className="p-8 md:p-10 bg-white shadow-lg rounded-2xl w-full max-w-[380px] md:max-w-[450px] lg:max-w-[500px] backdrop-blur-lg bg-opacity-90"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-700">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <label className="block text-sm md:text-base font-medium text-gray-600">Email</label>
            <InputText
              type="email"
              placeholder="Enter your email"
              className={`w-full p-2 md:p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="pt-3"
          >
            <label className="block text-sm md:text-base font-medium text-gray-600">Password</label>
            <InputText
              type="password"
              placeholder="Enter your password"
              className={`w-full p-2 md:p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="pt-5"
          >
            <Button
              label="Submit"
              type="submit"
              className="w-full p-2 md:p-3 text-lg p-button-primary transition-transform transform hover:scale-105 rounded-lg"
            />
          </motion.div>
        </form>

       
      </motion.div>
    </div>
  );
}

export default Login;




