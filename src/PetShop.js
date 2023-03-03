import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import AddItemForm from "./AddItemForm";
import Search from "./Search";
import ItemTable from "./ItemTable";

function PetShop() {
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || [
      { id: 1, name: "petHouse" },
      { id: 2, name: "pet" },
    ]
  );

  const [originalItems, setOriginalItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const [filteredItems, setFilteredItems] = useState(originalItems);

  const handleAddItem = (item) => {
    setOriginalItems((prevItems) => [...prevItems, item]);
  };

  const handleAddCategory = (category) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { id: prevCategories.length + 1, name: category },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("items", JSON.stringify(originalItems));
  }, [categories, originalItems]);

  const handleSearch = (query) => {
    const filteredItems = originalItems.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
      setFilteredItems(filteredItems);
  };
  

  const handleDeleteItem = (id) => {
    const updatedItems = originalItems.filter((item) => item.id !== id);
    setOriginalItems(updatedItems);
    window.location.reload();
  };

  const sortTable = (column, order) => {
    let sortedItems;
    if (order === "asc") {
      sortedItems = filteredItems.sort((a, b) =>
        a[column] > b[column] ? 1 : -1
      );
    } else {
      sortedItems = filteredItems.sort((a, b) =>
        a[column] < b[column] ? 1 : -1
      );
    }
    setFilteredItems([...sortedItems]);
  };

  return (
    <div>
      <div className="header">
        <h1>My Pet Store</h1>
      </div>
      <Categories categories={categories} onAddCategory={handleAddCategory} />
      <AddItemForm categories={categories} onAddItem={handleAddItem} />
      <Search onSearch={handleSearch}/> 
      <ItemTable 
        items={filteredItems}
        onDeleteItem={handleDeleteItem}
        onSort={sortTable}
        onSearch = {handleSearch}
        />
    </div>
  );
}

export default PetShop;
