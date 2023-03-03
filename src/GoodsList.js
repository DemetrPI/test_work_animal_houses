import React from "react";
import Search from "./Search";
import ItemTable from "./ItemTable";

function GoodsList({ items, onSort, onSearch, onDeleteItem}) {
  return (
    <div>
      <Search onSearch={onSearch} />
      <ItemTable items= {items} 
                 onSort ={onSort} 
                 onDeleteItem = {onDeleteItem} 
                  />
    </div>
);
}

export default GoodsList;