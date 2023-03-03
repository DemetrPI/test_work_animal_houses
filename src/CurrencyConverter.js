import React, { useState, useEffect } from "react";
import { API_KEY } from "./API";

function CurrencyConverter() {
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("PLN");

  useEffect(() => {
    fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}&base=USD`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrencyOptions(data.rates);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const itemsWithConvertedPrices = originalItems.map((item) => {
      const priceInSelectedCurrency =
        item.itemPrice * currencyOptions[selectedCurrency];
      const formattedPrice = priceInSelectedCurrency.toLocaleString("pl-PL", {
        style: "currency",
        currency: selectedCurrency,
      });
  
      return { ...item, itemPrice: formattedPrice };
    });
  
    setFilteredItems(itemsWithConvertedPrices);
  }, [originalItems, currencyOptions, selectedCurrency]);


  return (
    <div>
      <select
        value={selectedCurrency}
        onChange={(event) => setSelectedCurrency(event.target.value)}
      >
        {Object.keys(currencyOptions).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyConverter;
