// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
// import { Picker } from '@react-native-picker/picker'; // For the dropdown
// // import Icon from 'react-native-vector-icons/Feather'; // For the camera icon

// const Language = ({ navigation }) => {
//   const [selectedLang, setSelectedLang] = useState("en"); // Default to English
//   const languages = [
//     { label: "English", value: "en" },
//     { label: "Spanish", value: "es" },
//     { label: "French", value: "fr" },
//     { label: "German", value: "de" },
//     { label: "Hindi", value: "hi" },
//     // Add more languages as needed
//   ];

//   const handleTranslator = () => {
//     // Implement your translator functionality here,
//     // potentially navigating to another screen or triggering an action.
//     console.log("Use Translator 📷 clicked for:", selectedLang);
//     // Example navigation:
//     // navigation.navigate("TranslatorScreen", { selectedLanguage: selectedLang });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Language Settings</Text>

//         <View style={styles.dropdownContainer}>
//           <Text style={styles.label}>Select Language:</Text>
//           <Picker
//             selectedValue={selectedLang}
//             style={styles.dropdown}
//             onValueChange={(itemValue) => setSelectedLang(itemValue)}
//           >
//             {languages.map((lang) => (
//               <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
//             ))}
//           </Picker>
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleTranslator}>
//           {/* <Icon name="camera" size={20} color="#fff" style={styles.buttonIcon} /> */}
//           <Text style={styles.buttonText}>Use Translator 📷</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E9D5FF',
//     padding: 16,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     marginTop:150,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#6B21A8',
//     textAlign: 'center',
//   },
//   dropdownContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 8,
//   },
//   dropdown: {
//     height: 50,
//     borderColor: '#7e57c2',
//     borderWidth: 2,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     color: '#555',
//   },
//   button: {
//     backgroundColor: '#7e57c2',
//     borderRadius: 8,
//     paddingVertical: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   buttonIcon: {
//     marginRight: 8,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default Language;
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather'; // For the camera icon

const Language = ({ navigation }) => {
  const [selectedLang, setSelectedLang] = useState("en"); // Default to English
  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Hindi", value: "hi" },
    // Add more languages as needed
  ];

  const handleTranslator = () => {
    // Implement your translator functionality here,
    // potentially navigating to another screen or triggering an action.
    console.log("Use Translator 📷 clicked for:", selectedLang);
    // Example navigation:
    // navigation.navigate("TranslatorScreen", { selectedLanguage: selectedLang });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Language Settings</Text>

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Select Language:</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Select a language...',
              value: null,
              color: '#9EA0A4',
            }}
            items={languages}
            onValueChange={(value) => setSelectedLang(value)}
            value={selectedLang}
            style={pickerSelectStyles}
            Icon={() => {
              return <Icon name="chevron-down" size={24} color="gray" />;
            }}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleTranslator}>
          {/* <Icon name="camera" size={20} color="#fff" style={styles.buttonIcon} /> */}
          <Text style={styles.buttonText}>Use Translator 📷</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D5FF',
    padding: 16,
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
    marginTop: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6B21A8',
    textAlign: 'center',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#7e57c2',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      height: 50,
      borderColor: '#A855F7', // Using a consistent purple
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 12,
      color: '#555',
      fontSize: 16,
      paddingRight: 30,
    },
    inputAndroid: {
      height: 50,
      borderColor: '#A855F7', // Using a consistent purple
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 12,
      color: '#555',
      fontSize: 16,
      paddingRight: 30,
    },
    iconContainer: {
      top: 15,
      right: 12,
    },
  });



export default Language;