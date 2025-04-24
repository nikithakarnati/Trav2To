import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import jsPDF from "jspdf";

const ItineraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination, fromDate, toDate, travelers, itinerary } = location.state || {};

  useEffect(() => {
    console.log("Received itinerary:", itinerary);
  }, [itinerary]);

  const groupItineraryByDay = (itinerary) => {
    const days = {};
    let currentDay = null;

    itinerary.forEach((item) => {
      if (item.activity.startsWith("--- Day")) {
        currentDay = item.time; // formatted date string like "Tue Apr 09 2025"
        if (!days[currentDay]) days[currentDay] = [];
      } else if (currentDay) {
        days[currentDay].push(item);
      }
    });

    return days;
  };

  const [customItinerary, setCustomItinerary] = useState(groupItineraryByDay(itinerary));
  const [editingDays, setEditingDays] = useState({});

  const handleEditToggle = (day) => {
    setEditingDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleActivityChange = (day, index, value) => {
    setCustomItinerary((prev) => {
      const updated = { ...prev };
      updated[day][index].activity = value;
      return updated;
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Trip Itinerary", 10, 10);
    doc.setFontSize(12);
    doc.text(`Destination: ${destination?.name}`, 10, 20);
    doc.text(`From: ${new Date(fromDate).toDateString()}`, 10, 30);
    doc.text(`To: ${new Date(toDate).toDateString()}`, 10, 40);
    doc.text(`Travelers: ${travelers}`, 10, 50);

    let y = 65;
    Object.entries(customItinerary).forEach(([day, activities], i) => {
      doc.text(`--- Day ${i + 1} - ${day} ---`, 10, y);
      y += 10;
      activities.forEach((item) => {
        doc.text(`${item.time} - ${item.activity}`, 10, y);
        y += 10;
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });
    });

    doc.save("trip-itinerary.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-6 flex flex-col items-center">
      <Card className="w-full max-w-3xl mb-6 shadow-lg bg-white">
        <div className="p-4 text-left space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">Trip Summary</h1>
          <p><strong>Destination:</strong> {destination?.name}</p>
          <p><strong>From:</strong> {new Date(fromDate).toDateString()}</p>
          <p><strong>To:</strong> {new Date(toDate).toDateString()}</p>
          <p><strong>Travelers:</strong> {travelers}</p>
        </div>
      </Card>

      <div className="w-full max-w-4xl space-y-6">
        {Object.entries(customItinerary).map(([dayKey, activities], index) => (
          <Card key={dayKey} className="shadow-md bg-white">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-bold text-purple-700">
                  Day {index + 1} - {dayKey}
                </h2>
                <Button
                  icon={editingDays[dayKey] ? "pi pi-check" : "pi pi-pencil"}
                  label={editingDays[dayKey] ? "Save Day" : "Edit Day"}
                  className={`p-button-sm ${
                    editingDays[dayKey] ? "bg-green-500 text-white" : "text-blue-500"
                  }`}
                  onClick={() => handleEditToggle(dayKey)}
                />
              </div>

              <div className="space-y-3">
                {activities.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                    <div className="sm:w-1/4 font-semibold text-blue-500">{item.time}</div>
                    <div className="flex-1">
                      {editingDays[dayKey] ? (
                        <input
                          type="text"
                          value={item.activity}
                          onChange={(e) =>
                            handleActivityChange(dayKey, i, e.target.value)
                          }
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-700">{item.activity}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <Button
          label="⬇️ Download PDF"
          onClick={downloadPDF}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        />
        <Button
          label="📝 Plan Another Trip"
          onClick={() => navigate("/travel-itinerary")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default ItineraryPage;
