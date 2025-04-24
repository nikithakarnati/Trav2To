import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const ItineraryPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { destination, fromDate, toDate, travelers, itinerary } = route.params || {};

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
      if (updated[day] && updated[day][index]) {
        updated[day][index].activity = value;
      }
      return updated;
    });
  };

  const generateHTML = () => {
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Trip Itinerary</title>
        <style>
          body { font-family: sans-serif; }
          h1 { font-size: 20px; text-align: center; margin-bottom: 10px; }
          h2 { font-size: 16px; color: #7e57c2; margin-top: 15px; margin-bottom: 5px; }
          p { font-size: 12px; margin-bottom: 3px; }
          .day-header { font-weight: bold; margin-top: 10px; }
          .activity-time { font-weight: bold; color: #3f51b5; margin-right: 5px; }
          .summary { margin-bottom: 15px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Trip Itinerary</h1>
        <div class="summary">
          <p><strong>Destination:</strong> ${destination?.name}</p>
          <p><strong>From:</strong> ${new Date(fromDate).toDateString()}</p>
          <p><strong>To:</strong> ${new Date(toDate).toDateString()}</p>
          <p><strong>Travelers:</strong> ${travelers}</p>
        </div>
    `;

    Object.entries(customItinerary).forEach(([day, activities], index) => {
      html += `<h2>Day ${index + 1} - ${day}</h2>`;
      activities.forEach((item) => {
        html += `<p><span class="activity-time">${item.time}</span>${item.activity}</p>`;
      });
    });

    html += `
      </body>
      </html>
    `;
    return html;
  };

  const downloadPDF = async () => {
    try {
      const html = generateHTML();
      const { uri } = await Print.printToFileAsync({ html });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
      } else {
        const permission = await Print.requestPrinterPermissionsAsync();
        if (permission.granted) {
          await Sharing.shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
        } else {
          alert("Printing permission not granted!");
        }
      }
    } catch (error) {
      console.error("Error printing:", error);
      alert("Failed to generate PDF.");
    }
  };
  

  return (
    <LinearGradient colors={["#bfdbfe", "#fbcfe8"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text style={styles.title}>Trip Summary</Text>
            <Text>
              <Text style={styles.bold}>Destination:</Text> {destination?.name}
            </Text>
            <Text>
              <Text style={styles.bold}>From:</Text> {new Date(fromDate).toDateString()}
            </Text>
            <Text>
              <Text style={styles.bold}>To:</Text> {new Date(toDate).toDateString()}
            </Text>
            <Text>
              <Text style={styles.bold}>Travelers:</Text> {travelers}
            </Text>
          </Card.Content>
        </Card>

        {Object.entries(customItinerary).map(([dayKey, activities], index) => (
          <Card key={dayKey} style={styles.dayCard}>
            <Card.Content>
              <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>
                  Day {index + 1} - {dayKey}
                </Text>
                <Button
                  icon={editingDays[dayKey] ? "check" : "pencil"}
                  mode="outlined"
                  size={24}
                  onPress={() => handleEditToggle(dayKey)}
                  style={styles.editButton}
                >
                  {editingDays[dayKey] ? "Save Day" : "Edit Day"}
                </Button>
              </View>

              {activities.map((item, i) => (
                <View key={i} style={styles.activityRow}>
                  <Text style={styles.activityTime}>{item.time}</Text>
                  {editingDays[dayKey] ? (
                    <TextInput
                      style={styles.activityInput}
                      value={item.activity}
                      onChangeText={(text) => handleActivityChange(dayKey, i, text)}
                    />
                  ) : (
                    <Text style={styles.activityText}>{item.activity}</Text>
                  )}
                </View>
              ))}
            </Card.Content>
          </Card>
        ))}

        <View style={styles.buttonContainer}>
          <Button
            icon="download"
            mode="contained"
            onPress={downloadPDF}
            style={styles.downloadButton}
          >
            Download PDF
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("TravelPlanner")}
            style={styles.planButton}
          >Plan Another Trip
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: "stretch",
  },
  summaryCard: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3f51b5",
  },
  bold: {
    fontWeight: "bold",
  },
  dayCard: {
    marginBottom: 15,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7e57c2",
  },
  editButton: {
    paddingVertical: 5,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  activityTime: {
    fontWeight: "bold",
    color: "#3f51b5",
    marginRight: 10,
    width: 80,
  },
  activityText: {
    fontSize: 16,
    color: "#555",
    flex: 1,
  },
  activityInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
  },
  downloadButton: {
    backgroundColor: "#7e57c2",
   
  },
  planButton: {
    backgroundColor: "#3b82f6",
  },
};

export default ItineraryPage;