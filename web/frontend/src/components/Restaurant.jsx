import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const RestaurantPage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const restaurants = [
    {
      name: 'Le Gourmet',
      vicinity: '12 Rue de Paris, 75001 Paris, France',
      photos: [
        {
          photo_reference: 'sample_photo_1',
          url: 'https://source.unsplash.com/400x300/?restaurant,paris',
        },
      ],
    },
    {
      name: 'Chez Marie',
      vicinity: '45 Boulevard Haussmann, 75009 Paris, France',
      photos: [
        {
          photo_reference: 'sample_photo_2',
          url: 'https://source.unsplash.com/400x300/?dining,france',
        },
      ],
    },
    {
      name: 'Bistro Bon Appétit',
      vicinity: '99 Avenue des Champs-Élysées, 75008 Paris, France',
      photos: [],
    },
  ];

  const handleReserve = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setVisible(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 transition-transform transform hover:scale-105">
          Discover Restaurants
        </h1>
        <p className="text-lg text-gray-600">Find top places to eat near your destination</p>
      </div>

      {/* Search Bar (showcase only) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by city or area..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <Button
          icon="pi pi-search"
          label="Search"
          className="p-button-sm p-button-primary transition duration-300 transform hover:scale-105"
          onClick={() => console.log('Search showcase clicked')}
        />
      </div>

      {/* Restaurant Cards */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {restaurants.map((rest, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden border transition duration-300 transform hover:-translate-y-2 hover:scale-105"
          >
            {rest.photos?.[0]?.url ? (
              <img
                src={rest.photos[0].url}
                alt={rest.name}
                className="w-full h-56 object-cover rounded-t-xl" // Adjusted card height
              />
            ) : (
              <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-gray-600">
                No Image Available
              </div>
            )}

            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 transition-transform transform hover:scale-105">
                {rest.name}
              </h3>
              <p className="text-sm text-gray-500">{rest.vicinity}</p>

              <div className="flex items-center justify-between mt-4">
                <Button
                  label="Reserve"
                  icon="pi pi-calendar"
                  className="p-button-sm p-button-success transition duration-300 transform hover:scale-105"
                  onClick={() => handleReserve(rest)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reservation Dialog */}
      <Dialog
        header={`Reserve at ${selectedRestaurant?.name}`}
        visible={visible}
        style={{ width: '90%', maxWidth: '500px' }}
        onHide={() => setVisible(false)}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone</label>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Separate Date and Time Inputs */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">Date</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">Time</label>
              <input
                type="time"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="text-right">
            <Button label="Book Now" icon="pi pi-check" className="p-button-sm p-button-primary" />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default RestaurantPage;
