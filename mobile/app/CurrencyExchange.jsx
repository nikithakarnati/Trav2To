import React, { useState } from "react";
import axios from "axios";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Feather'; // For the refresh icon

const CurrencyExchange = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "c396eb382b70c6f33529ac50"; // Replace with your actual API key

  const convertCurrency = async () => {
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setError("");
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
      );
      const rate = response.data.conversion_rates[toCurrency];
      if (rate) {
        const result = parseFloat(amount) * rate;
        setConvertedAmount(result.toFixed(2));
      } else {
        setError("Unable to fetch conversion rates.");
      }
    } catch (error) {
      setError("Error fetching exchange rates.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Currency Exchange</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            placeholder="Enter amount"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.currencyInputContainer}>
          <TextInput
            style={styles.currencyInput}
            value={fromCurrency}
            onChangeText={(text) => setFromCurrency(text.toUpperCase())}
            placeholder="From (e.g., USD)"
            autoCapitalize="characters"
          />
          <TextInput
            style={styles.currencyInput}
            value={toCurrency}
            onChangeText={(text) => setToCurrency(text.toUpperCase())}
            placeholder="To (e.g., EUR)"
            autoCapitalize="characters"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={convertCurrency}>
          <Icon name="refresh" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Convert</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}
        {convertedAmount !== null && !error && (
          <Text style={styles.resultText}>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </Text>
        )}
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
    marginTop:100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6B21A8',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#7e57c2',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  currencyInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  currencyInput: {
    flex: 1,
    height: 50,
    borderColor: '#A855F7',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    textAlign: 'center',
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
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  resultText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CurrencyExchange;