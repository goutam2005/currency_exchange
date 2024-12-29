import React, { useEffect, useState } from "react";
// import { currency } from "../api/Postapi";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [show, setshow] = useState(false);

  // console.log(JSON.parse(toCurrency));
  useEffect(() => {
    const res = fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
      })
      .catch(() => setError("Failed to load currency data."));
  }, [amount]);
  const handleConvert = async () => {
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
      setshow(true);
    } catch (error) {
      setError("Failed to convert currency.");
    }
    setTimeout(() => {
      setshow(false);
    }, 2000);

  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Currency Converter
        </h1>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* From Currency Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            From
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* To Currency Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            To
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Convert Button */}
        <button
          disabled={!amount || !fromCurrency || !toCurrency}
          onClick={handleConvert}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Convert
        </button>

        {/* Conversion Result */}
        {show && convertedAmount !== null && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
            
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
