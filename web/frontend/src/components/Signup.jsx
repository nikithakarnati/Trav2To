import React from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = () => {
    
  };

  const password = watch("password");

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 overflow-hidden p-5">
      {/* Animated Background Circles */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute w-32 h-32 md:w-64 md:h-64 bg-blue-200 rounded-full opacity-30 top-5 left-5 md:top-10 md:left-10 blur-2xl"
      />
      <motion.div
        animate={{ x: [-80, 50, -80], y: [-40, 0, -40], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute w-36 h-36 md:w-72 md:h-72 bg-pink-100 rounded-full opacity-30 bottom-5 right-5 md:bottom-10 md:right-10 blur-2xl"
      />

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
        className="p-6 md:p-8 bg-white shadow-lg rounded-2xl w-full max-w-[400px] lg:max-w-[480px] backdrop-blur-lg bg-opacity-90"
      >
        <h2 className="text-2xl font-bold text-center mb-5 text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <InputText
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
              className={`w-full p-2 border rounded-lg ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">Enter a valid name</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <InputText
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
              className={`w-full p-2 border rounded-lg ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">Enter a valid email</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <InputText
              type="tel"
              maxLength={10}
              {...register("phone", {
                required: true,
                pattern: /^[0-9]{10}$/,
              })}
              onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
              placeholder="Enter your phone number"
              className={`w-full p-2 border rounded-lg ${
                errors.phone ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">Enter a valid phone number</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">New Password</label>
            <InputText
              type="password"
              placeholder="Enter a new password"
              {...register("password", { required: true, minLength: 6 })}
              className={`w-full p-2 border rounded-lg ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">Enter a valid password</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <InputText
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password,
              })}
              className={`w-full p-2 border rounded-lg ${
                errors.confirmPassword ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <Button
              label="Sign Up"
              type="submit"
              className="w-full p-3 text-lg p-button-primary transition-transform transform hover:scale-105 rounded-lg"
            />
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an Account? </span>
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-blue-500 hover:text-blue-700 hover:underline cursor-pointer"
          >
            Login here
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;

