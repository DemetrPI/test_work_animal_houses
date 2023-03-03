import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
} from "react-icons/fa";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Center,
} from "@chakra-ui/react";

function ItemTable(props) {
  const { onDeleteItem } = props;
  const [sortOrder, setSortOrder] = useState({
    column: "",
    direction: "",
  });
  const [items, setItems] = useState(props.items);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  const handleSort = (column) => {
    if (sortOrder.column === column) {
      if (sortOrder.direction === "asc") {
        setSortOrder({ column, direction: "desc" });
      } else {
        setSortOrder({ column: "", direction: "" });
      }
    } else {
      setSortOrder({ column, direction: "asc" });
    }
  };

  const sortedItems = items.sort((a, b) => {
    if (sortOrder.column === "itemName") {
      if (sortOrder.direction === "asc") {
        return a.itemName.localeCompare(b.itemName);
      } else {
        return b.itemName.localeCompare(a.itemName);
      }
    } else if (sortOrder.column === "category") {
      if (sortOrder.direction === "asc") {
        return a.category.localeCompare(b.category);
      } else {
        return b.category.localeCompare(a.category);
      }
    } else if (sortOrder.column === "itemDescription") {
      if (sortOrder.direction === "asc") {
        return a.itemDescription.localeCompare(b.itemDescription);
      } else {
        return b.itemDescription.localeCompare(a.itemDescription);
      }
    } else if (sortOrder.column === "itemPrice") {
      if (sortOrder.direction === "asc") {
        return a.itemPrice - b.itemPrice;
      } else {
        return b.itemPrice - a.itemPrice;
      }
    } else {
      return 0;
    }
  });

  return (
    <div className="itemTable">
      <Center bg="teal" h="50px" color="white">
        <h2>Our products</h2>
      </Center>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th onClick={() => handleSort("category")}>
                Category
                {sortOrder.column === "category" ? (
                  sortOrder.direction === "asc" ? (
                    <FaSortAlphaUp />
                  ) : (
                    <FaSortAlphaDown />
                  )
                ) : null}
              </Th>
              <Th onClick={() => handleSort("itemName")}>
                Item Name:
                {sortOrder.column === "itemName" ? (
                  sortOrder.direction === "asc" ? (
                    <FaSortAlphaUp />
                  ) : (
                    <FaSortAlphaDown />
                  )
                ) : null}
              </Th>
              <Th onClick={() => handleSort("itemDescription")}>
                Item Description:
                {sortOrder.column === "itemDescription" ? (
                  sortOrder.direction === "asc" ? (
                    <FaSortAlphaUp />
                  ) : (
                    <FaSortAlphaDown />
                  )
                ) : null}
              </Th>
              <Th onClick={() => handleSort("itemPrice")}>
                Price
                {sortOrder.column === "itemPrice" ? (
                  sortOrder.direction === "asc" ? (
                    <FaSortNumericUp />
                  ) : (
                    <FaSortNumericDown />
                  )
                ) : null}
              </Th>
              <Th>Delete item!</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.itemName}</td>
                <td>{item.itemDescription}</td>
                <td style={{ textAlign: "end" }}>
                {parseFloat(item.itemPrice).toLocaleString("pl-PL", {
                 style: "currency",
                 currency: "PLN",
                 minimumFractionDigits: 2,
                 maximumFractionDigits: 2,
               })}
                </td>
                <td style={{ textAlign: "center" }}>
                  <button onClick={() => onDeleteItem(item.id)}>
                    Delete item!
                  </button>
                </td>{" "}
                {/* delete button cell */}
              </tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ItemTable;
