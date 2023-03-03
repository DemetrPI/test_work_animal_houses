import React, { useState } from "react";
import "./App.css";

function AddItemForm({ categories, onAddItem }) {
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    window.location.reload();
    const newItem = {
      id: Math.random(),
      category,
      itemName,
      itemDescription,
      itemPrice,
    };

    onAddItem(newItem);
    setCategory("");
    setItemName("");
    setItemDescription("");
    setItemPrice("");
  };

  const getIsFormValid = () => {
    return category && itemName && itemDescription && itemPrice;
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Add New Item</h2>
          <div className="Field">
            <label htmlFor="category">
              Category:<sup>*</sup>
            </label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="itemName">
            Item Name:<sup>*</sup>
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
          <label htmlFor="itemDescription">
            Item Description:<sup>*</sup>
          </label>
          <textarea
            id="itemDescription"
            value={itemDescription}
            onChange={(event) => setItemDescription(event.target.value)}
          />
          <label htmlFor="itemPrice">Item Price:</label>
          <input
            type="number"
            id="itemPrice"
            value={itemPrice}
            onChange={(event) => setItemPrice(event.target.value)}
          />
          <button type="submit" disabled={!getIsFormValid()}>
            Add new item!
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddItemForm;
