import React, { useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function CurrencyExchange() {
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
        const result = amount * rate;
        setConvertedAmount(result.toFixed(2));
      } else {
        setError("Unable to fetch conversion rates.");
      }
    } catch (error) {
      setError("Error fetching exchange rates.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full">
        <InputText
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full h-12 p-inputtext-lg border-2 border-purple-400 rounded-lg"
        />
      </div>
      <div className="flex gap-4 w-full">
        <InputText
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
          placeholder="From (e.g., USD)"
          className="w-full h-12 p-inputtext-lg border-2 border-purple-400 rounded-lg"
        />
        <InputText
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
          placeholder="To (e.g., EUR)"
          className="w-full h-12 p-inputtext-lg border-2 border-purple-400 rounded-lg"
        />
      </div>
      <Button
        label="Convert"
        icon="pi pi-refresh"
        className="p-button-primary w-full"
        onClick={convertCurrency}
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      {convertedAmount !== null && !error && (
        <p className="text-green-600 font-semibold">
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
}
