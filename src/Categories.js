import React, { useState } from "react";
import "./App.css";

function Categories(props) {
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    if (
      newCategory !== "" &&
      !props.categories.find((cat) => cat.name === newCategory)
    ) {
      props.onAddCategory(newCategory);
      setNewCategory("");
    }
  };

  return (
    <div className="category">
      <h2>Categories:</h2>
     
      <ol>
        {props.categories.map((category) => (
          <li key={category.id} >{category.name}</li>
        ))}
      </ol>
     
      <form onSubmit={handleAddCategory}>
        <label htmlFor="new-category">Add new category:</label>
        <input
          type="text"
          id="new-category"
          value={newCategory}
          onChange={handleCategoryChange}
        />
        <button type="submit">Add new category</button>
      </form>
    </div>
  );
}

export default Categories;
